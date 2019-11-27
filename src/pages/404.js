import React from 'react'

import styled from '@emotion/styled'
import { Link } from 'gatsby';
import Layout from '../components/Layout'
import Card from '../components/Card'

const PageStyle = styled.div`
    h1 {
      font-size: 2em;
      font-weight: 700;
    }
    h3 {
      font-weight: 400;
      padding-bottom: 15px;
    }
    img {
      object-fit: contain;
      max-width: 100%;
      border-radius: 10px;
      box-shadow: 3px 3px 0px #bababa;
    }
`

const NotFoundPage = () => (
  <Layout>
    <PageStyle>
      <Card>
        <Link to="/"><strong>&larr; Back</strong></Link>  
        <center>
          <h1>404</h1>
          <h3>NOT FOUND</h3>
          <img src="https://oschvr.s3.us-west-2.amazonaws.com/697191910bb741cf8c74c4a3b1dd26da.jpg" alt="Not Found" />
        </center>
      </Card>
    </PageStyle>
  </Layout>
)

export default NotFoundPage
