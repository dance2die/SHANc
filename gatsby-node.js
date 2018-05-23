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

  const getItems = async storyIds => {
    const itemsPromises = res.data.map(
      async (storyId, index) =>
        await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
        )
    )
    return Promise.all(itemsPromises)
  }

  const items = (await getItems(res.data)).map(res => res.data)
  const findItemById = storyId => {
    const result = items.find(item => item.id === storyId)
    // console.log(`findItemById(${storyId}) => ${result}`)
    return result
  }

  //   console.log(`items`, items)

  res.data.map((storyId, index) => {
    const storyIdNode = {
      id: `${index}`,
      parent: null,
      internal: {
        type: `TopStories`,
      },
      children: [],
      storyId: storyId,
      item: findItemById(storyId),
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
