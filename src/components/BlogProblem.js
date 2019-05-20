import React from 'react'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown'
import { Link } from 'gatsby';
import { format, distanceInWords } from 'date-fns'
import CodeBlock from './CodeBlock'
import Card from './Card'


const BlogPostStyle = styled.div`
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

  div.body {
    h1 {
      font-size: 1.85em;
      line-height: 1.14em;
      font-weight: 400;
    }
    div.highlight pre {
      padding: 5% 5% 5% 85px;
      margin: 20px -85px;
      overflow-wrap: normal;
      overflow-x: auto;
    }
    img {
      max-width: 100%;
    }
    iframe {
      margin: 0 auto;
      display: block;
    }
  }

  @media only screen and (max-width: 420px) {
    div.body {
      div.highlight pre {
        padding: 5% 5% 5% 20px;
        margin: 20px -20px;
      }
      iframe {
        width: 100%;
      }
    }
  }
`
const now = new Date;

const BlogProblem = ({ problem }) => (
  <Card>
    <BlogPostStyle>
      <Link to="/problems"><strong>&larr; Problems</strong></Link>
      <br />
      <br />
      <h1 className="title">
        {problem.title}
      </h1>
      <div>
        <h4 style={{ color: "gray", display: "inline" }}>
          {distanceInWords(problem.createdAt, now, {includeSeconds: true})}
          {' '}
        ago
        </h4>
        <h6 style={{ color: "lightgray", display: "inline" }}>
        &nbsp;
          {format(problem.createdAt, "DD/MM/YYYY")}
        </h6>
      </div>
      <div className="body">
        <br />
        <br />
        <div><strong>{problem.description}</strong></div>
        <hr />
        <ReactMarkdown source={problem.solution} renderers={{ code: CodeBlock }} />
      </div>
    </BlogPostStyle>
  </Card>
  )

export default BlogProblem
