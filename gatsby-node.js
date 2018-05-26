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

  // Get story details
  const getItems = async storyIds => {
    const itemsPromises = storyIds.map(
      async (storyId, index) => await axios.get(itemURL(storyId))
    )
    return Promise.all(itemsPromises)
  }

  // Combine all story IDs to get all items in one go for "itemsMap"
  const allStoryIds = [
    ...topResults.data,
    ...newResults.data,
    ...bestResults.data,
  ]

  // Build item details map
  // for an O(1) look up for fetched item details
  const itemsMap = (await getItems(allStoryIds))
    .map(res => res.data)
    .reduce((map, item) => map.set(item.id, item), new Map())

  const createStoryNodes = (data, type) =>
    data.map((storyId, index) => {
      const id = `${type}-${storyId}`
      const storyNode = {
        id,
        parent: null,
        internal: { type },
        children: [],
        storyId: storyId,
        item: itemsMap.get(storyId),
      }

      storyNode.internal.contentDigest = buildContentDigest(storyNode)

      // Create node with the gatsby createNode() API
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
