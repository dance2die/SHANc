import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import moment from 'moment'

import Time from './Time'
import { getLocaleDateString } from '../util/Format'

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

const DescriptionContainer = styled.div`
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

const BuildInfo = ({ metadata }) => {
  const { buildDate } = metadata
  const builtOn = new Date(buildDate * 1000)
  return (
    <BuildInfoContainer>
      <span>
        Generated <Time date={builtOn} />
      </span>
      <span>({getLocaleDateString(builtOn)})</span>
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
