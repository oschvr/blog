import React from 'react'
import styled from '@emotion/styled'
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout'
import SEO from '../components/SEO';
import Card from '../components/Card'

const PageStyle = styled.div`
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
    max-width: 100%
  }
`

const Page = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <PageStyle>
      <Layout>
        <Card>
          <SEO
            title={frontmatter.title}
            description={frontmatter.title}
            image="https:/oschvr.s3.us-west-2.amazonaws.com/4cdc06830825484b9b265a00d0ccfed6.jpg"
            pathname="/about"
            article
          />
          <Link to="/"><strong>&larr; Posts</strong></Link>
          <br />
          <h1 className="title">
            {frontmatter.title}
          </h1>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Card>
      </Layout>
    </PageStyle>
  )
}

export default Page

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`