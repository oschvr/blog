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
