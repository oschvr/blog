import React from 'react'

import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Card from '../components/Card'

const NotFoundPage = () => (
  <Layout>
    <Card>
      <Link to="/">
        <strong>&larr; Back</strong>
      </Link>
      <center>
        <h1>404</h1>
        <h3>NOT FOUND</h3>
        <img
          src="https://oschvr.s3.us-west-2.amazonaws.com/697191910bb741cf8c74c4a3b1dd26da.jpg"
          alt="Not Found"
        />
      </center>
    </Card>
  </Layout>
)

export default NotFoundPage
