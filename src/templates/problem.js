import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogProblem from '../components/BlogProblem'
import SEO from '../components/SEO'

const Problem = ({ data }) => {
  const problem = data.allProblem.edges[0].node
  
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
    allProblem(
      filter: {
        id: { eq: $id }
      }
    ){
      edges{
        node{
          id
          title
          createdAt
          author{
            username
          }
          slug
          description
          solved
          solution
        }
      }
    }
  }
`
