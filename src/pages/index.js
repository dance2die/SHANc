import React from 'react'
import Link from 'gatsby-link'
import styled, { injectGlobal } from 'styled-components'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import parser from 'url'

import Time from '../components/Time'

injectGlobal`
  body {
    margin: 0;
    font-family: 'Verdana';
    letter-spacing: 0.05rem;
  }
`

const Main = styled.div`
  margin: 0;
`

const Story = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 0;
  line-height: 18px;
`

const Rank = styled.span`
  font-size: 1.2rem;
  width: 35px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-start;
`

const Content = styled.div``
const Header = styled.div``
const Body = styled.div``

const Meta = styled.div`
  font-size: 0.7rem;
  color: #828282;
`

const Host = Meta.extend``

// Use gatsby-plugin-google-analytics plugin to track outbound clicks
// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-analytics#outboundlink-component
const BaseLink = styled(OutboundLink).attrs({
  target: '_blank',
})`
  &:link {
    text-decoration: none;
  }
  &:hover {
    text-decoration: underline;
  }
`
const TitleLink = BaseLink.extend`
  color: #464134;
  cursor: pointer;
`

const HostLink = BaseLink.extend`
  font-size: 0.7rem;
  color: #828282;
  margin-left: 5px;
`

const CommentLink = HostLink.extend`
  margin: 0;
`

const IndexPage = ({ data }) => {
  const stories = data.allTopStories.edges.map(({ node }, index) => {
    const { title, score, by, time, type, url } = node.item
    const host = parser.parse(url || '').host
    const commentLink = `//news.ycombinator.com/item?id=${node.storyId}`

    return (
      <Story key={node.id}>
        <Rank>{index + 1}</Rank>
        <Content>
          <Body>
            <TitleLink href={url}>{title}</TitleLink>
            <HostLink href={`//${host}`}>({host})</HostLink>
          </Body>
          <Meta>
            {score} points by {by} <Time date={new Date(time * 1000)} />
            <HostLink href={`${commentLink}`}>[comments]</HostLink>
          </Meta>
        </Content>
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
