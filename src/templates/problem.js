import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogProblem from '../components/BlogProblem'

const Problem = ({ data }) => {
  const problem = data.allProblem.edges[0].node
  
  return (
    <Layout>
      <Helmet title={`${problem.title} | Blog`} />
      <BlogProblem problem={problem} />
    </Layout>
  )
}

export default Problem

export const pageQuery = graphql`
  query PageQuery($id: String!) {
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
