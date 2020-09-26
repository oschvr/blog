import React from 'react'
import { Link } from 'gatsby'

import styled from '@emotion/styled'
import { format, distanceInWords } from 'date-fns'
import Card from './Card'

const BlogCardStyle = styled.div`
  margin: -20px 0;
  h4 {
    margin: 0px;
    text-decoration: none;
    display: inline;
  }
  h2 {
    margin: 0;
  }
  .date {
    display: 'inline-block';
  }
`
const now = new Date()

const BlogCard = ({ post }) => {
  const { frontmatter, slug, timeToRead } = post
  return (
    <Link to={`${frontmatter.collection === 'posts' ? `posts/${slug}` : slug}`}>
      <Card padding={30}>
        <BlogCardStyle>
          <h2>{frontmatter.title}</h2>
          <h4>
            {timeToRead} min{timeToRead > 1 && 's'} &nbsp;
          </h4>
          <h4>
            {distanceInWords(frontmatter.date, now, {
              includeSeconds: true,
            })}{' '}
            ago
          </h4>
          <h4>
            &nbsp;
            {format(frontmatter.date, 'DD/MM/YYYY')}
          </h4>
          {frontmatter.image && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                position: 'absolute',

                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <img
                style={{
                  alignSelf: 'center',
                  objectFit: 'contain',
                  maxWidth: '150px',
                }}
                src={frontmatter.image}
              ></img>
            </div>
          )}
        </BlogCardStyle>
      </Card>
    </Link>
  )
}

export default BlogCard
