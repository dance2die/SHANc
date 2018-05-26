import React from 'react'
import Stories from '../components/Stories'

const NewPage = ({ data }) => (
  <Stories stories={data.allNewStories.edges} title="New Stories" />
)

export default NewPage

export const query = graphql`
  query NewStoriesQuery {
    allNewStories {
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
