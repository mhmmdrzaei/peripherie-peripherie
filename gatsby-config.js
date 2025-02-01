/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Peripherie-Peripherie`,
    siteUrl: `https://peripherie.peripheralreview.com`,
    description: `peripherie-peripherie is an experimental thematic chapbook project produced by Peripheral Review, released bi-annually in Spring/Summer and Fall/Winter.`,
    image: `images/icon.png`,
    seoImage: `images/meta.png`,
  },
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      "url": "https://www.peripheralreview.com/peripherie-back-end/graphql"
    }
  }, `gatsby-plugin-catch-links`, "gatsby-plugin-image",`gatsby-plugin-sass`, "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-sass", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};