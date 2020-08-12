import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogProblem from '../components/BlogProblem'
import SEO from '../components/SEO'

const Problem = ({ data }) => {
  const problem = data.ghostPost

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
  query ProblemQuery($id: String!) {
    ghostPost(id: { eq: $id }) {
      id
      title
      slug
      url
      canonical_url
      html
      plaintext
      feature_image
      excerpt
      reading_time
      created_at
    }
  }
`
