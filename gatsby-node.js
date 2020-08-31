const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  // Posts
  await graphql(`
    query AllPostsQuery {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { type: { eq: "post" } } }
      ) {
        nodes {
          id
          slug
        }
      }
    }
  `).then(result => {
    const allPosts = result.data.allMdx.nodes
    const postTemplate = path.resolve(`./src/templates/post.js`)

    // Iterate over the array of posts
    allPosts.forEach(post => {
      // Create the Gatsby page
      createPage({
        path: `/posts/${post.slug}/`,
        component: postTemplate,
        context: {
          id: post.id,
        },
      })
    })
  })

  // Problems
  await graphql(`
    query AllProblemsQuery {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { type: { eq: "problems" } } }
      ) {
        nodes {
          id
          slug
        }
      }
    }
  `).then(result => {
    const allProblems = result.data.allMdx.nodes
    const problemTemplate = path.resolve(`./src/templates/problem.js`)
    // Iterate over the array of problems
    allProblems.forEach(problem => {
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

  // Pages
  await graphql(`
    query {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { type: { eq: "page" } } }
      ) {
        nodes {
          id
          slug
        }
      }
    }
  `).then(result => {
    const allPages = result.data.allMdx.nodes
    const pageTemplate = path.resolve(`./src/templates/page.js`)
    // Iterate over the array of problems
    allPages.forEach(page => {
      // Create the Gatsby page
      createPage({
        path: `/${page.slug}/`,
        component: pageTemplate,
        context: {
          id: page.id,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(gltf)$/,
          use: [
            {
              loader: 'gltf-webpack-loader',
            },
          ],
        },
        {
          test: /\.(bin)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        },
      ],
    },
  })
}
