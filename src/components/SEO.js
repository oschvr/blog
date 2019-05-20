import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import config from '../config'

const seo = {
  title: config.siteMetadata.title,
  titleTemplate: `${config.siteMetadata.title}`,
  description: config.siteMetadata.description,
  image: `${config.siteMetadata.image}`,
  url: `${config.siteMetadata.url}`,
  twitterUsername: config.siteMetadata.twitterUsername
}

const SEO = ({ title, description, image, pathname, article }) => (
  <Helmet title={title || seo.title} titleTemplate={seo.titleTemplate}>
    <meta name="description" content={description || seo.description} />
    <meta name="image" content={image || seo.image} />
    <meta property="og:url" content={pathname ? `${seo.url}/${pathname}` : seo.url} />
    {(article ? true : null) && (
    <meta property="og:type" content="article" />
      )}
    {seo.title && <meta property="og:title" content={title || seo.title} />}
    {seo.description && (
    <meta property="og:description" content={description || seo.description} />
      )}
    <meta property="og:image" content={image || seo.image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content={seo.twitterUsername} />
    <meta name="twitter:title" content={title || seo.title} />
    <meta name="twitter:description" content={description || seo.description} />
    <meta name="twitter:image" content={seo.image} />
  </Helmet>
)

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false,
}
