import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Card from '../components/Card'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const Page = ({ data }) => {
  const { mdx } = data

  return (
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
        type
        collection
      }
      excerpt
    }
  }
`
