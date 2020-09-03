import React from 'react'
import { Link } from 'gatsby'

import styled from '@emotion/styled'
import { format, distanceInWords } from 'date-fns'
import Card from './Card'

const BlogCardStyle = styled.div`
  margin: -20px 0;
  h3 {
    margin: 0px;
    font-size: 27px;
    line-height: 32px;
  }
  h4 {
    margin: 0;
    font-size: 17px;
  }
  .tags {
    font-size: 16px;
    a {
      margin-right: 8px;
    }
    text-overflow: ellipsis;
    color: #0366d6;
    overflow: hidden;
    white-space: nowrap;
  }
  .date {
    display: 'inline-block';
  }
`

const Grid = styled.div``

const Row = styled.div`
  display: 'flex';
`
const Col = styled.div`
  flex: ${props => props.size};
`

const now = new Date()

const BlogCard = ({ post }) => {
  const { frontmatter, slug, timeToRead, type } = post
  return (
    <Card padding={30}>
      <Link to={`${type}/${slug}`}>
        <BlogCardStyle>
          <Row>
            <Col size={1}>
              <h3>{frontmatter.title}</h3>

              <h4 style={{ color: 'black', display: 'inline' }}>
                {timeToRead} min{timeToRead > 1 && 's'} &nbsp;
              </h4>
              <h4 style={{ color: 'gray', display: 'inline' }}>
                {distanceInWords(frontmatter.date, now, {
                  includeSeconds: true,
                })}{' '}
                ago
              </h4>
              <h6 style={{ color: 'lightgray', display: 'inline' }}>
                &nbsp;
                {format(frontmatter.date, 'DD/MM/YYYY')}
              </h6>
            </Col>
          </Row>
        </BlogCardStyle>
      </Link>
    </Card>
  )
}

export default BlogCard
