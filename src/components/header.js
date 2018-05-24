import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import moment from 'moment'

import Time from './Time'

const HeaderContainer = styled.div`
  background: #ffc600;
  font-size: 1.5rem;
  margin-bottom: 15px;
`

const TitleContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Title = styled.h1`
  margin-bottom: 10px;
`

const DescriptionContainer = styled.p`
  margin: 0;
  font-size: 1.1rem;
`

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
}

const BuildInfoContainer = styled.div`
  margin: 10px auto -10px;
  width: 100%;
  font-size: 0.75rem;
  color: #ffe;
  display: flex;
  flex-wrap: wrap;
`

const GenerateTime = styled.span`
  margin-right: 5px;
`
const BuildTime = styled.span`
  color: black;
`

const BuildInfo = ({ metadata }) => {
  const { buildDate } = metadata
  const builtOn = new Date(buildDate * 1000)
  // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  // const localeOptions = {
  //   weekday: 'long',
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric',
  //   timeZoneName: 'short',
  // }

  return (
    <BuildInfoContainer>
      <Time date={builtOn} />
      {/* <GenerateTime>Generated {moment(builtOn).fromNow()} </GenerateTime>
      <BuildTime>
        ({builtOn.toLocaleDateString('en-US', localeOptions)})
      </BuildTime> */}
    </BuildInfoContainer>
  )
}

const Header = ({ siteTitle, description, metadata }) => (
  <HeaderContainer>
    <TitleContainer>
      <Title>
        <Link to="/" style={linkStyle}>
          {siteTitle}
        </Link>
      </Title>
      <DescriptionContainer>
        {description}
        <BuildInfo metadata={metadata} />
      </DescriptionContainer>
    </TitleContainer>
  </HeaderContainer>
)

export default Header
