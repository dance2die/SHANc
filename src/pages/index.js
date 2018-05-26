import React from 'react'
import Link from 'gatsby-link'
import styled, { injectGlobal } from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Stories from '../components/Stories'

injectGlobal`
  body {
    margin: 0;
    font-family: 'Verdana';
    letter-spacing: 0.05rem;
  }
`

const IndexPage = ({ data }) => (
  <Stories stories={data.allTopStories.edges} title="Top Stories" />
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
