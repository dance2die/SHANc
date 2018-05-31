import React, { Component } from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import styled from 'styled-components'
import { Switch } from 'smooth-ui'
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
const localStorageKey = 'Shanc_Stories_StoriesRead'

class Stories extends Component {
  state = {
    stories: this.props.stories,
    hideReadStories: false,
  }

  buildStoriesComponents = stories => {
    const readStories = new Set(this.getReadStories())
    const filterReadStories = ({ node }) =>
      this.state.hideReadStories ? !readStories.has(node.storyId) : true

    return stories
      .filter(({ node }) => node.item !== null)
      .filter(filterReadStories)
      .map(({ node }, index) => {
        const { title, score, by, time, type, url } = node.item
        const host = parser.parse(url || '').host
        const commentLink = `//news.ycombinator.com/item?id=${node.storyId}`
        // Some stories (Jobs, ASK, etc) don't have URLs then use comment URL
        const titleUrl = url || commentLink
        const date = new Date(time * 1000)

        return (
          <Story key={node.id}>
            <Rank>{index + 1}</Rank>
            <Content>
              <Body>
                <TitleLink
                  onClick={() => this.onTitleLinkClicked(node.storyId)}
                  href={titleUrl}
                >
                  {title}
                </TitleLink>
                <HostLink href={`//${host}`}>({host})</HostLink>
              </Body>
              <Meta>
                {score} points by {by} [<Time date={date} />]
                <HostLink href={`${commentLink}`}>[comments]</HostLink>
              </Meta>
            </Content>
          </Story>
        )
      })
  }

  getReadStories = () => {
    const stories = localStorage.getItem(localStorageKey)
    if (!stories) return []

    return JSON.parse(stories)
  }

  // Save clicked stories in local storage as JavaScript cannot check for :visited property
  onTitleLinkClicked = storyId => {
    const storedStories = this.getReadStories()
    storedStories.push(storyId)
    localStorage.setItem(localStorageKey, JSON.stringify(storedStories))
  }

  onHideReadStoriesOptionClick = () => {
    this.setState((prevState, props) => {
      return { hideReadStories: !prevState.hideReadStories }
    })
  }

  render() {
    const { stories } = this.state
    const storiesComponents = this.buildStoriesComponents(stories)

    return (
      <div>
        {/* <Navigation /> */}
        <HideReadStoriesOption onClick={this.onHideReadStoriesOptionClick} />
        {storiesComponents}
      </div>
    )
  }
}

const HideReadStoriesOptionContainer = styled.div`
  display: flex;
  margin: 10px 0;
`

const HideReadStoriesOption = ({ onClick }) => {
  return (
    <HideReadStoriesOptionContainer>
      <span>Hide Read Stories: </span>
      <Switch defaultChecked={false} onClick={_ => onClick()} />
    </HideReadStoriesOptionContainer>
  )
}

export default Stories
