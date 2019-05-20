/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const axios = require('axios');
const crypto = require('crypto');

const API_URI =
  'http://admin.oschvr.com/problems?_limit=10000';

exports.sourceNodes = async ({ actions }) => {
  const {createNode} = actions;
  const result = await axios.get(API_URI);
  for (const post of result.data) {
    await createNode({
      id: post.id,
      title: post.title,
      solved: post.solved,
      slug: post.slug,
      description: post.description,
      solution: post.solution,
      createdAt: post.createdAt,
      author: post.author,
      internal: {
        type: 'Problem',
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(post))
          .digest(`hex`),
      },
    });
  }
};