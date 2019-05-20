import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogPost from '../components/BlogPost'

const Post = ({ data }) => {
  const post = data.allPost.edges[0].node
  
  return (
    <Layout>
      <Helmet title={`${post.title} | Blog`} />
      <BlogPost post={post} />
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query PageQuery($id: String!) {
    allPost(
      filter: {
        id: { eq: $id }
      }
    ) {
      edges {
        node {
          title,
          slug,
          cover {
            url
          },
          body,
          createdAt
          author {
            username,
            email
          }
        }
      }
    }
  }
`
