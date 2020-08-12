import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogCard from '../components/BlogCard'

const IndexPage = ({ data }) => (
  <Layout>
    {data.allGhostPost.edges.map((node, key) => (
      <BlogCard key={key} post={{ ...node.node }} type="posts" />
    ))}
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { tags: { elemMatch: { slug: { eq: "post" } } } }
    ) {
      edges {
        node {
          id
          slug
          title
          feature_image
          html
          page
          created_at
          excerpt
          reading_time
        }
      }
    }
  }
`
