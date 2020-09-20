import React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogCard from '../components/BlogCard'

const ProblemsPage = ({ data }) => (
  <Layout>
    {data.allMdx.nodes.map(problem => (
      <BlogCard key={problem.id} post={problem} />
    ))}
  </Layout>
)

export default ProblemsPage

export const query = graphql`
  query AllProblemsPageQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "problem" } } }
    ) {
      nodes {
        id
        frontmatter {
          date
          image
          path
          title
          type
          collection
        }
        excerpt
        slug
        timeToRead
      }
    }
  }
`
