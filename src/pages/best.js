import React from 'react'
import { graphql } from 'gatsby'

import Stories from '../components/Stories'

const BestPage = ({ data }) => (
  <Stories stories={data.allBestStories.edges} title="New Stories" />
)

export default BestPage

export const query = graphql`
  query BestStoriesQuery {
    allBestStories {
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
