import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { format, distanceInWords } from 'date-fns'
import { MDXRenderer } from 'gatsby-plugin-mdx'
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

    img {
      max-width: 100%;
    }
    iframe {
      margin: 0 auto;
      display: block;
    }
  }
`
const now = new Date()

const BlogPost = ({ post }) => {
  const { mdx } = post
  return (
    <Card>
      <BlogPostStyle>
        <Link to="/">
          <strong>&larr; Posts</strong>
        </Link>
        <br />
        <br />
        {mdx.frontmatter.image && (
          <img src={mdx.frontmatter.image} alt={mdx.frontmatter.title} />
        )}
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
    </Card>
  )
}

export default BlogPost
