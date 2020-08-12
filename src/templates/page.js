import React from 'react'
import styled from '@emotion/styled'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Card from '../components/Card'
import { MDXRenderer } from 'gatsby-plugin-mdx'

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
  date {
    margin: 0;
    font-size: calc(1.85vw + 25px);
    line-height: calc(1.85vw + 35px);
    font-weight: 400;
    color: '#d3d3d3';
  }
  img {
    max-width: 50%;
    border-radius: 10px;
    filter: drop-shadow(0 0 0.25rem lightgray);
  }
`

const Page = ({ data }) => {
  const { mdx } = data
  return (
    <PageStyle>
      <Layout>
        <Card>
          <SEO
            title={mdx.frontmatter.title}
            description={mdx.frontmatter.title}
            image={mdx.frontmatter.image}
            pathname="/about"
            article
          />
          <Link to="/">
            <strong>&larr; Back</strong>
          </Link>
          <br />
          <h1 className="title">{mdx.frontmatter.title}</h1>
          <p className="date">{mdx.frontmatter.date}</p>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Card>
      </Layout>
    </PageStyle>
  )
}

export default Page

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        date
        title
        path
        image
      }
      excerpt
    }
  }
`
