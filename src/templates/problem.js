import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogProblem from '../components/BlogProblem'
import SEO from '../components/SEO'

const Problem = ({ data }) => {
  const { mdx } = data
  const { frontmatter } = mdx

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.title}
        image={frontmatter.image ?? frontmatter.image}
        pathname={`problems/${frontmatter.path}`}
        article
      />
      <BlogProblem problem={data} />
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
