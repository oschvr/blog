import React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogPost from '../components/BlogPost'
import SEO from '../components/SEO'

const PostStyle = styled.div`
  h1.title {
    margin: 0;
    font-size: calc(1.85vw + 25px);
    line-height: calc(1.85vw + 35px);
    font-weight: 500;
    a {
      text-decoration: none;
      color: black;
    }
  }
  img {
    max-width: 100%;
    border-radius: 3px;
    filter: drop-shadow(0 0 0.25rem lightgray);
  }
`

const Post = ({ data }) => {
  const { mdx } = data
  const { frontmatter } = mdx
  return (
    <PostStyle>
      <Layout>
        <SEO
          title={frontmatter.title}
          description={frontmatter.title}
          image={frontmatter.image ?? frontmatter.image}
          image="https://oschvr.s3.us-west-2.amazonaws.com/697191910bb741cf8c74c4a3b1dd26da.jpg"
          pathname={`posts/${frontmatter.slug}`}
          article
        />
        <BlogPost post={data} />
      </Layout>
    </PostStyle>
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
