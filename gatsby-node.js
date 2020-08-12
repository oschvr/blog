const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  return graphql(`
    query AllPostsQuery {
      allGhostPost(
        sort: { order: DESC, fields: [published_at] }
        filter: { tags: { elemMatch: { slug: { eq: "post" } } } }
      ) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `).then(result => {
    const allPosts = result.data.allGhostPost.edges
    const postTemplate = path.resolve(`./src/templates/post.js`)

    // Iterate over the array of posts
    allPosts.forEach(({ node }) => {
      const post = node
      // Create the Gatsby page
      createPage({
        path: `/posts/${post.slug}/`,
        component: postTemplate,
        context: {
          id: post.id,
        },
      })
    })

    graphql(`
      query AllProblemsQuery {
        allGhostPost(
          sort: { order: DESC, fields: [published_at] }
          filter: { tags: { elemMatch: { slug: { eq: "problem" } } } }
        ) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `).then(result => {
      const allProblems = result.data.allGhostPost.edges
      const problemTemplate = path.resolve(`./src/templates/problem.js`)
      // Iterate over the array of problems
      allProblems.forEach(({ node }) => {
        const problem = node
        // Create the Gatsby page
        createPage({
          path: `/problems/${problem.slug}/`,
          component: problemTemplate,
          context: {
            id: problem.id,
          },
        })
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
