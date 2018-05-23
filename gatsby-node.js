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

const createTopStoriesSource = async ({ createNode }) => {
  const res = await axios.get(
    `https://hacker-news.firebaseio.com/v0/topstories.json`
  )

  // Get story details
  const getItems = async storyIds => {
    const itemsPromises = res.data.map(
      async (storyId, index) =>
        await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
        )
    )
    return Promise.all(itemsPromises)
  }

  // Build item details map
  // for an O(1) look up for fetched item details
  const itemsMap = (await getItems(res.data))
    .map(res => res.data)
    .reduce((map, item) => map.set(item.id, item), new Map())

  res.data.map((storyId, index) => {
    const storyIdNode = {
      id: `${index}`,
      parent: null,
      internal: {
        type: `TopStories`,
      },
      children: [],
      storyId: storyId,
      item: itemsMap.get(storyId),
    }

    storyIdNode.internal.contentDigest = buildContentDigest(storyIdNode)

    // Create node with the gatsby createNode() API
    createNode(storyIdNode)
  })
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
  await createTopStoriesSource(boundActionCreators)
}
