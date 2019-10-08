import React from 'react'
import { graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'

import Stories from '../components/Stories'
import Layout from '../components/layout'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Verdana';
    letter-spacing: 0.05rem;
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <GlobalStyle />
    <Stories stories={data.allTopStories.edges} title="Top Stories" />
  </Layout>
)

export default IndexPage

export const query = graphql`
  query StoriesQuery {
    allTopStories {
      edges {
        node {
          id
          storyId
          item {
            id
            title
            score
            by
            time
            type
            url
          }
        }
      }
    }
  }
`
