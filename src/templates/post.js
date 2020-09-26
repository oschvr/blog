import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogPost from '../components/BlogPost'
import SEO from '../components/SEO'

const Post = ({ data }) => {
  const { mdx } = data
  const { frontmatter } = mdx

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.title}
        image={frontmatter.image ?? frontmatter.image}
        image="https://oschvr.s3.us-west-2.amazonaws.com/697191910bb741cf8c74c4a3b1dd26da.jpg"
        pathname={`posts/${frontmatter.path}`}
        article
      />
      <BlogPost post={data} />
    </Layout>
  )
}

export default Post

export const postQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        date
        title
        path
        image
        type
        collection
      }
      excerpt
      timeToRead
    }
  }
`
