const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  return graphql(`
    {
      allPost(
        sort: {
          fields: [createdAt],
          order:DESC
        }
      ){
        edges{
          node{
            id,
            title,
            lang,
            cover {
              url
            },
            createdAt,
            author {
              username
            },
            slug,
            body
          }
        }
      }
      allComment {
        edges {
          node {
            id
            name
            comment
          }
        }
      }
      allProblem(
        sort: {
          fields: [createdAt],
          order:DESC
        }
      ){
        edges{
          node{
            id,
            title,
            createdAt,
            author {
              username
            },
            slug,
            description,
            solved,
            solution,
          }
        }
      }
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {

    const allPosts = result.data.allPost.edges
    const postTemplate = path.resolve(`./src/templates/post.js`)

    // Iterate over the array of posts
    allPosts.forEach(({ node }) => {
      
      const post = node
      // Create the Gatsby page for this Dev.to post
      createPage({
        path: `/posts/${post.slug}/`,
        component: postTemplate,
        context: {
          id: post.id,
        },
      })
    });


    const allProblems = result.data.allProblem.edges
    const problemTemplate = path.resolve(`./src/templates/problem.js`)
    // Iterate over the array of problems
    allProblems.forEach(({ node }) => {
      
      const problem = node
      // Create the Gatsby page for this Dev.to post
      createPage({
        path: `/problems/${problem.slug}/`,
        component: problemTemplate,
        context: {
          id: problem.id,
        },
      })
    });

    const allComment = result.data.allComment.edges
    // console.log(allComment);
    
    const pageTemplate = path.resolve(`./src/templates/page.js`);
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: pageTemplate,
        context: {}, // additional data can be passed via context
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
