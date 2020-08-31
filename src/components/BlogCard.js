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
  .image  {
    display: 'flex';
    align-items: 'flex-end';
    justify-content: 'flex-end';
    img  {
      width: '100%';
    }
  }
`

const Grid = styled.div``

const Row = styled.div`
  display: 'flex';
`

const Col = styled.div`
  flex: ${props => props.size};
`

const Image = styled.img`
  width: '150px';
`

const now = new Date()

const BlogCard = node => {
  const { frontmatter, slug, timeToRead } = node.post
  return (
    <Card padding={30}>
      <Link to={`${node.type}/${slug}`}>
        <BlogCardStyle>
          <Row>
            <Col size={1}>
              <Link to={`${node.type}/${slug}`}>
                <h3>{frontmatter.title}</h3>
              </Link>

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
            <Col size={1}>
              <Image src={frontmatter.image} />
            </Col>
          </Row>
        </BlogCardStyle>
      </Link>
    </Card>
  )
}

export default BlogCard
