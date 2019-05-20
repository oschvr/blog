import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'
import { Link } from 'gatsby';

import config from '../config'
import './styles.scss'

const Header = styled.div`
  max-width: 825px;
  margin: 10px auto;
  padding: 20px;
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin: 0;
    color: #0a0a0a;
  }
`

const TemplateWrapper = ({ children }) => (
  <Fragment>
    <Helmet title={config.siteMetadata.title} />
    <main>
      <Header>
        <div style={{display: 'inline'}}>
          <Link to="/">
            <h2>
              {config.siteMetadata.title}
            </h2>
          </Link>
          <h3>
            {config.siteMetadata.header}
          </h3>
          <div style={{display: 'inline'}}>
            <Link to="/problems">Problems</Link>
          </div>
        </div>
      </Header>
      {children}
    </main>
  </Fragment>
)

export default TemplateWrapper
