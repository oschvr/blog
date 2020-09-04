import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogCard from '../components/BlogCard'

const IndexPage = ({ data }) => (
  <Layout>
    {data.allMdx.nodes.map(post => (
      <BlogCard key={post.id} post={post} />
    ))}
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "post" } } }
    ) {
      nodes {
        id
        frontmatter {
          date
          path
          title
          type
          image
          collection
        }
        excerpt
        slug
        timeToRead
      }
    }
  }
`
