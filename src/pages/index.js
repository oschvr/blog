import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogCard from '../components/BlogCard'

const IndexPage = ({ data }) => (
  <Layout>
    {data.allPost.edges.map((node, key) => (
      <BlogCard
        key={key}
        post={{...node.node}}
      />
    ))}
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    allPost(
      sort: {
        fields: [createdAt],
        order: DESC
      }
    ) {
      edges {
        node {
          id,
          title,
          lang,
          createdAt,
          author {
            username
            email
          },
          slug,
          body,
        }
      }
    }
  }
`
