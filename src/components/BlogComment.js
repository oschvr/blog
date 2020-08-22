import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const BlogCommentStyle = styled.div`
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

  textarea {
    width: 100%;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 300;
    filter: drop-shadow(0 0 0.25rem lightgray);
    border-color: transparent;
    margin: 10px 0 5px 0;
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
`
const BlogComment = () => (
  <BlogCommentStyle>
    <hr />
    <div>
      <h4 style={{ color: 'gray' }}>Comments</h4>
      <form method="post" action="">
        <textarea
          className="comment"
          rows="6"
          cols="50"
          placeholder="Type your comment here."
        />
        <Link to="/#">Send</Link>
      </form>
    </div>
  </BlogCommentStyle>
)

export default BlogComment
