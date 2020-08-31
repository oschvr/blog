import React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogCard from '../components/BlogCard'

const ProblemStyle = styled.div`
  h1.title {
    margin: 0;
    font-size: calc(1.85vw + 25px);
    line-height: calc(1.85vw + 35px);
    font-weight: 500;
    a {
      text-decoration: none;
      color: black;
    }
  }
  img {
    max-width: 100%;
    border-radius: 3px;
    filter: drop-shadow(0 0 0.25rem lightgray);
  }
`
const ProblemsPage = ({ data }) => (
  <ProblemStyle>
    <Layout>
      {/* {data.allGhostPost.edges.map((node, key) => (
        <BlogCard key={key} post={{ ...node.node }} type="problems" />
      ))} */}
    </Layout>
  </ProblemStyle>
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
