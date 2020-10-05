import React from 'react'
import { Link } from 'gatsby'

import styled from '@emotion/styled'
import { format, distanceInWords } from 'date-fns'
import Card from './Card'
import useDarkMode from 'use-dark-mode'

const BlogCardStyle = styled.div`
  margin: -20px 0;
  h4 {
    margin: 0px;
    text-decoration: none;
    display: inline;
    color: #c0c0c0;
  }
  h5 {
    margin: 0px;
    text-decoration: none;
    display: inline;
    color: #dcdcdc;
  }
  h3 {
    margin: 0;
    transition-property: all;
    transition-delay: 200ms;
  }
`
const now = new Date()

const BlogCard = ({ post }) => {
  const { frontmatter, slug, timeToRead } = post
  const darkMode = useDarkMode()
  return (
    <Card padding={30} dark={darkMode.value}>
      <Link
        to={`${frontmatter.collection === 'posts' ? `posts/${slug}` : slug}`}
      >
        <BlogCardStyle>
          <h3>{frontmatter.title}</h3>
          <h4>
            {timeToRead} min{timeToRead > 1 && 's'} &nbsp;
          </h4>
          <h4>
            {distanceInWords(frontmatter.date, now, {
              includeSeconds: true,
            })}{' '}
            ago
          </h4>
          <h5 style={{ paddingLeft: '8px' }}>
            &nbsp;
            {format(frontmatter.date, 'DD/MM/YYYY')}
          </h5>
          {/* {frontmatter.image && (
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
          )} */}
        </BlogCardStyle>
      </Link>
    </Card>
  )
}

export default BlogCard
