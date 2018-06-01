import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import styled from 'styled-components'
import parser from 'url'

import Time from '../components/Time'
import Navigation from '../components/Navigation'

const Main = styled.div`
  margin: 0;
`

const Story = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 0;
  line-height: 18px;
  /* Give each story more room */
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #ffc6001a;
  }
`
const Rank = styled.span`
  color: #ccc;
  font-size: 1.2rem;
  width: 35px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-start;
  margin-right: 2rem;
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
  &:visited {
    color: #ddd;
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

const Stories = ({ stories }) => {
  const storiesComponents = stories
    .filter(({ node }, index) => node.item !== null)
    .map(({ node }, index) => {
      const { title, score, by, time, type, url } = node.item

      const commentLink = `//news.ycombinator.com/item?id=${node.storyId}`
      const host = parser.parse(url || '').host
      // Some stories (Jobs, ASK, etc) don't have URLs then use comment URL
      const titleUrl = url || commentLink

      const date = new Date(time * 1000)
      const rank = (index + 1).toString().padStart(3, '0')

      return (
        <Story key={node.id}>
          <Rank>{rank}</Rank>
          <Content>
            <Body>
              <TitleLink href={titleUrl}>{title}</TitleLink>
              {host ? <HostLink href={`//${host}`}>({host})</HostLink> : null}
            </Body>
            <Meta>
              {score} points by {by} [<Time date={date} />]
              <HostLink href={`${commentLink}`}>[comments]</HostLink>
            </Meta>
          </Content>
        </Story>
      )
    })
  return (
    <div>
      {/* <Navigation /> */}
      {storiesComponents}
    </div>
  )
}

export default Stories
