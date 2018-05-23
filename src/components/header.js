import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

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

const Header = ({ siteTitle, description }) => (
  <HeaderContainer data-value="headerContainer">
    <TitleContainer data-value="titleContainer">
      <Title>
        <Link to="/" style={linkStyle}>
          {siteTitle}
        </Link>
      </Title>
      <DescriptionContainer>{description}</DescriptionContainer>
    </TitleContainer>
  </HeaderContainer>
)

export default Header
