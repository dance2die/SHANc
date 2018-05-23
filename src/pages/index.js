import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Main = styled.div`
  margin: 0;
`

const Story = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 3px 0;
`

const Rank = styled.span`
  font-size: 1.2rem;
  width: 35px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
`

const TitleLink = ({ url, children }) => <a href={url}>{children}</a>

const Meta = styled.div`
  font-size: 0.7rem;
`

const IndexPage = ({ data }) => {
  const stories = data.allTopStories.edges.map(({ node }, index) => {
    const { title, score, by, time, type, url } = node.item
    return (
      <Story key={node.id}>
        <Rank>{index + 1}</Rank>
        <TitleLink url={url}>{title}</TitleLink> -{' '}
        <Meta>
          {score} points by {by}
        </Meta>
      </Story>
    )
  })

  return <Main>{stories}</Main>
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
