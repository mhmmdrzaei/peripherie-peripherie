import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {

  siteMetadata: {
    title: `Peripherie-Peripherie`,
    siteUrl: `https://peripherie.peripheralreview.com`,
    description: `peripherie-peripherie is an experimental thematic chapbook project produced by Peripheral Review, released bi-annually in Spring/Summer and Fall/Winter.`,
    image: `images/icon.png`,
    seoImage: `images/meta.png`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      "url": "https://peripherie.peripheralreview.com/back-end/graphql"
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

export default config;
