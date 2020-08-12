import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  .navLink {
    padding-left: 10px;
    padding-right: 10px;
  }
  .nav {
    display: 'inline';
    padding-top: 10px;
  }
`

const TemplateWrapper = ({ children }) => (
  <Fragment>
    <Helmet title={config.siteMetadata.title} />
    <main>
      <Header>
        <div style={{ display: 'inline' }}>
          <Link to="/">
            <h2>{config.siteMetadata.title}</h2>
          </Link>
          <h3>{config.siteMetadata.header}</h3>
          <div className="nav">
            <Link className="navLink" to="/">
              Posts
            </Link>

            <Link className="navLink" to="/problems">
              Problems
            </Link>

            <a
              className="navLink"
              target="_blank"
              rel="noopener noreferrer"
              href={config.siteMetadata.github}
            >
              <FontAwesomeIcon icon="github" /> Github
            </a>

            <a
              className="navLink"
              target="_blank"
              rel="noopener noreferrer"
              href={config.siteMetadata.twitter}
            >
              <FontAwesomeIcon icon="twitter" /> Twitter
            </a>

            <a
              className="navLink"
              target="_blank"
              rel="noopener noreferrer"
              href={config.siteMetadata.stackoverflow}
            >
              <FontAwesomeIcon icon="stack-overflow" /> Stackoverflow
            </a>
          </div>
        </div>
      </Header>
      {children}
    </main>
  </Fragment>
)

export default TemplateWrapper
