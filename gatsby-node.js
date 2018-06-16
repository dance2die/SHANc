/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const axios = require('axios')
const crypto = require('crypto')

const buildContentDigest = content =>
  crypto
    .createHash(`md5`)
    .update(JSON.stringify(content))
    .digest(`hex`)

const topStoriesURL = `https://hacker-news.firebaseio.com/v0/topstories.json`
const newStoriesURL = `https://hacker-news.firebaseio.com/v0/newstories.json`
const bestStoriesURL = `https://hacker-news.firebaseio.com/v0/beststories.json`
const itemURL = storyId =>
  `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`

const createStoriesSource = async ({ createNode }) => {
  const topResults = await axios.get(topStoriesURL)
  const newResults = await axios.get(newStoriesURL)
  const bestResults = await axios.get(bestStoriesURL)

  // Combine all story IDs to get all items in one go for "items" map
  // We need only distinct SET of IDs.
  const storyIds = [
    ...new Set([...topResults.data, ...newResults.data, ...bestResults.data]),
  ]

  const getStories = async storyIds => {
    const stories = storyIds.map(storyId => axios.get(itemURL(storyId)))
    return Promise.all(stories)
  }

  // Build item details map
  // for an O(1) look up for fetched item details
  const items = (await getStories(storyIds))
    .map(res => res.data)
    .filter(item => item !== null)
    .reduce((acc, item) => acc.set(item.id, item), new Map())

  // Expose a hacker new story available for GraphQL query
  const createStoryNodes = (data, type) =>
    data.map((storyId, index) => {
      const id = `${type}-${storyId}`
      const storyNode = {
        id,
        parent: null,
        internal: { type },
        children: [],
        storyId: storyId,
        item: items.get(storyId),
      }

      storyNode.internal.contentDigest = buildContentDigest(storyNode)

      createNode(storyNode)
    })

  createStoryNodes(topResults.data, 'TopStories')
  createStoryNodes(newResults.data, 'NewStories')
  createStoryNodes(bestResults.data, 'BestStories')
}

const createBuildMetadataSource = ({ createNode }) => {
  const buildMetadataNode = {
    // There is only one record
    id: `I am the build metadata source id`,
    parent: null,
    internal: { type: `BuildMetadata` },
    children: [],
    // Unix time format to be consistent with HackerNews API date format
    buildDate: new Date().getTime() / 1000,
  }

  buildMetadataNode.internal.contentDigest = buildContentDigest(
    buildMetadataNode
  )
  createNode(buildMetadataNode)
}

exports.sourceNodes = async ({ boundActionCreators }) => {
  await createBuildMetadataSource(boundActionCreators)
  await createStoriesSource(boundActionCreators)
}
