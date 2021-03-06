module.exports = {
  siteMetadata: {
    title: `Sancho UI`,
    description: `Sancho is a responsive and accessible design system for the web. It's built with React, Typescript and Emotion.`,
    author: `@benmcmahen`
  },

  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve("./src/components/Layout.tsx")
      }
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/ComponentLayout.tsx")
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sancho`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#228be6`,
        include_favicon: true,
        theme_color: `#228be6`,
        display: `minimal-ui`,
        icon: `src/images/sancho-new.svg` // This path is relative to the root of the site.
      }
    },

    `gatsby-plugin-emotion`

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
};
