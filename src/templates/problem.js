import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogProblem from '../components/BlogProblem'
import SEO from '../components/SEO'

const Problem = ({ data }) => {
  const problem = data

  return (
    <Layout>
      <SEO
        title={problem.title}
        description={problem.description}
        pathname={`problems/${problem.slug}`}
        article
      />
      <BlogProblem problem={problem} />
    </Layout>
  )
}

export default Problem

export const problemQuery = graphql`
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
