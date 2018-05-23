import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => {
  console.log(data)
  const stories = data.allTopStories.edges.map(({ node }, index) => {
    const { title, score, by, time, type, url } = node.item
    return (
      <div key={node.id}>
        <h6>
          {type} story {by}
        </h6>
        <a href={url}>{title}</a>
      </div>
    )
  })

  return (
    <div>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Link to="/page-2/">Go to page 2</Link>

      {stories}
    </div>
  )
}

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
