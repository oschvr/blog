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
  .article-engagement-count {
    font-family: 'HelveticaNeue-CondensedBold', 'HelveticaNeueBoldCondensed',
      'HelveticaNeue-Bold-Condensed', 'Helvetica Neue Bold Condensed',
      'HelveticaNeueBold', 'HelveticaNeue-Bold', 'Helvetica Neue Bold',
      'HelveticaNeue', 'Helvetica Neue', 'TeXGyreHerosCnBold', 'Helvetica',
      'Tahoma', 'Geneva', 'Arial Narrow', 'Arial', sans-serif;
    display: inline-block;
    margin-right: 20px;
    margin-top: 10px;
    color: #666;
    img {
      height: 20px;
      min-width: 26px;
      vertical-align: -5px;
      margin-right: 7px;
    }
    .engagement-count-number {
      font-size: 15px;
      font-weight: 400;
    }
  }
`

const now = new Date()

const BlogCard = ({ post, type }) => (
  <Card padding={30}>
    <BlogCardStyle>
      {/* <img style={{ maxWidth: '100px' }} src={post.feature_image} /> */}

      <div className="content">
        <Link to={`/${type}/${post.slug}`}>
          <h3>{post.title}</h3>
        </Link>
      </div>
      <div>
        <h4 style={{ color: 'black', display: 'inline' }}>
          {post.reading_time} mins &nbsp;
        </h4>
        <h4 style={{ color: 'gray', display: 'inline' }}>
          {distanceInWords(post.created_at, now, { includeSeconds: true })} ago
        </h4>
        <h6 style={{ color: 'lightgray', display: 'inline' }}>
          &nbsp;
          {format(post.created_at, 'DD/MM/YYYY')}
        </h6>
      </div>
    </BlogCardStyle>
  </Card>
)

export default BlogCard
