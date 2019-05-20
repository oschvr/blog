import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogCard from '../components/BlogCard'

const ProblemsPage = ({ data }) => (
  <Layout>
    {data.allProblem.edges.map((node, key) => (
      <BlogCard
        key={key}
        post={{...node.node}}
        type="problems"
      />
    ))}
  </Layout>
)

export default ProblemsPage

export const query = graphql`
  query ProblemsPageQuery {
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
  }
`
