import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { format, distanceInWords } from 'date-fns'
import Card from './Card'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const BlogPostStyle = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 45px auto;
  h1 {
    margin: 0;
    font-size: calc(1.85vw + 25px);
    line-height: calc(1.85vw + 35px);
    font-weight: 500;
  }
  img {
    width: 100%;
  }
  a {
    text-decoration: underline;
  }
`
const now = new Date()

const BlogProblem = ({ problem }) => {
  const { mdx } = problem
  return (
    <BlogPostStyle>
      <Link to={`/problems`}>
        <strong>&larr; Problems</strong>
      </Link>
      <br />
      <br />
      <h1 className="title">{mdx.frontmatter.title}</h1>
      <div>
        <h4 style={{ color: 'black', display: 'inline' }}>
          {mdx.timeToRead} min{mdx.timeToRead > 1 && 's'} &nbsp;
        </h4>
        <h4 style={{ color: 'gray', display: 'inline' }}>
          {distanceInWords(mdx.frontmatter.date, now, {
            includeSeconds: true,
          })}{' '}
          ago
        </h4>
        <h6 style={{ color: 'lightgray', display: 'inline' }}>
          &nbsp;
          {format(mdx.frontmatter.date, 'DD/MM/YYYY')}
          &nbsp;
        </h6>
      </div>
      <div className="body">
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </div>
    </BlogPostStyle>
  )
}

export default BlogProblem
