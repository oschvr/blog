import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import config from '../config'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faStackOverflow,
} from '@fortawesome/free-brands-svg-icons'

import '../style/styles.scss'

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
            <Link className="navLink" to="/about">
              About
            </Link>

            <a
              className="navLink"
              target="_blank"
              rel="noopener noreferrer"
              href={config.siteMetadata.github}
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>

            <a
              className="navLink"
              target="_blank"
              rel="noopener noreferrer"
              href={config.siteMetadata.twitter}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>

            <a
              className="navLink"
              target="_blank"
              rel="noopener noreferrer"
              href={config.siteMetadata.linkedin}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>

            <a
              className="navLink"
              target="_blank"
              rel="noopener noreferrer"
              href={config.siteMetadata.stackoverflow}
            >
              <FontAwesomeIcon icon={faStackOverflow} />
            </a>
          </div>
        </div>
      </Header>
      {children}
    </main>
  </Fragment>
)

export default TemplateWrapper
