/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const axios = require('axios')
const crypto = require('crypto')

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators

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

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(storyIdNode))
      .digest(`hex`)
    // add it to userNode
    storyIdNode.internal.contentDigest = contentDigest

    // Create node with the gatsby createNode() API
    createNode(storyIdNode)
  })
}
