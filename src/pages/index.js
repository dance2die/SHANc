import React from 'react'
import { graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'

import Stories from '../components/Stories'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Verdana';
    letter-spacing: 0.05rem;
  }
`

const IndexPage = ({ data }) => (
  <>
    <GlobalStyle />
    <Stories stories={data.allTopStories.edges} title="Top Stories" />
  </>
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
