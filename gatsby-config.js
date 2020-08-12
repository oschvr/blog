module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: `https://oschvr.com`,
        contentApiKey: `05cc69464e603b29480b0349a2`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // In your gatsby-transformer-remark plugin array
        plugins: [`gatsby-remark-mathjax`],
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
