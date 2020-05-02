import React from 'react'
import {Helmet} from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import Header from '../components/header'
import GithubCorner from '../components/GithubCorner'

const Body = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
        }
      }
      buildMetadata {
        buildDate
      }
    }
  `)

  return (
    <div>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: 'Static Hacker News clone' },
          {
            name: 'keywords',
            content: 'hacker news, static site, gatsby, hackernews, clone',
          },
        ]}
      />
      <Header
        siteTitle={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        metadata={data.buildMetadata}
      />
      <GithubCorner />
      <Body>{children}</Body>
    </div>
  )
}

export default Layout
