/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const axios = require('axios');
const crypto = require('crypto');

const API_URI =
  'http://admin.oschvr.com/comments?_limit=10000';

exports.sourceNodes = async ({ actions }) => {
  const {createNode} = actions;
  const result = await axios.get(API_URI);
  for (const comment of result.data) {
    await createNode({
      id: comment.id,
      name: comment.name,
      comment: comment.comment,
      internal: {
        type: 'Comment',
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(comment))
          .digest(`hex`),
      },
    });
  }
};