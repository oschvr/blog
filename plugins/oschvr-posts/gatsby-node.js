/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const axios = require('axios');
const crypto = require('crypto');

const API_URI =
  'http://admin.oschvr.com/posts?_limit=10000';

exports.sourceNodes = async ({ actions }) => {
  const {createNode} = actions;
  const result = await axios.get(API_URI);
  for (const post of result.data) {
    await createNode({
      id: post.id,
      lang: post.lang,
      title: post.title,
      cover: post.cover,
      slug: post.slug,
      body: post.body,
      createdAt: post.createdAt,
      author: post.author,
      internal: {
        type: 'Post',
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(post))
          .digest(`hex`),
      },
    });
  }
};