import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import moment from 'moment'

const HeaderContainer = styled.div`
  background: #ffc600;
  margin-bottom: 1.45rem;
`

const TitleContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Title = styled.h1`
  margin: 0;
`

const DescriptionContainer = styled.p`
  margin: 0;
  font-size: 1.1rem;
`

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
}

const Container = styled.div`
  margin: 0 auto;
  padding: 15px 0 0 0;
  width: 100%;
  font-size: 0.75rem;
  color: #ffe;
`

const BuildTime = styled.span`
  color: black;
`

const BuildInfo = ({ metadata }) => {
  const { buildDate } = metadata
  const builtOn = new Date(buildDate * 1000)
  return (
    <Container>
      Generated {moment(builtOn).fromNow()}{' '}
      <BuildTime>({builtOn.toUTCString()})</BuildTime>
    </Container>
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
      <DescriptionContainer>{description}</DescriptionContainer>
      <BuildInfo metadata={metadata} />
    </TitleContainer>
  </HeaderContainer>
)

export default Header
