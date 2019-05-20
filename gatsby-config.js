module.exports = {
  plugins: [
    'oschvr-posts',
    'oschvr-problems',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // In your gatsby-transformer-remark plugin array
        plugins: [
          `gatsby-remark-mathjax`,
        ],
      }
    },
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ],
}
