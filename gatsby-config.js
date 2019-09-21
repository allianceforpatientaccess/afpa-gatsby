/* eslint-disable no-undef */
module.exports = {
  siteMetadata: {
    title: `Alliance for Patient Access`,
    description: `Alliance for Patient Access is a national network of physicians dedicated to ensuring patient access to approved therapies and appropriate clinical care.`,
    author: `@avinerenberg`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `afpa-wordpress`,
        short_name: `afpa`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-stylus-resources`,
    //   options: {
    //     resources: ['./src/global.styl'],
    //     postCssPlugins: [require('tailwindcss')],
    //   },
    // },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`),
          require(`precss`),
          require(`postcss-easing-gradients`),
          require(`postcss-preset-env`),
        ],
      },
    },
    // `gatsby-plugin-purgecss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: process.env.WP_ENV,
        protocol: 'http',
        hostingWPCOM: false,
        useACF: true, // TODO(?)
        // searchAndReplaceContentUrls: {
        //   sourceUrl: "",
        //   replacementUrl: "",
        // },
        includedRoutes: [
          // Home Page CPTs
          '**/sliders',
          '**/working-groups',
          '**/coalitions',
          '**/home-resources',
          // About Page CPTs
          '**/annual-reports',
          '**/guiding-principles',
          '**/leadership',
          // Resources Page CPTs
          '**/videos',
          '**/infographics',
          // Events Page (+ Home Page) CPT
          '**/events',
          // Surveys Page CPT
          '**/surveys',
          // Advocacy Page CPT
          '**/legislative-advocacy',
          '**/regulatory-advocacy',
          // WP Core
          '**/pages',
          '**/media',
          '**/tags',
          '**/categories',
        ],
      },
    },
    {
      /**
       * getNode is OK (vs getNodeAndSavePathDependency) b/c
       * the data is external and only updated only on build
       * https://www.gatsbyjs.org/packages/@tsimons/gatsby-plugin-elasticlunr-search/
       * https://www.gatsbyjs.org/docs/node-api-helpers/#getNode
       */
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [`title`, `link`, `tags`],
        resolvers: {
          // Site-wide
          wordpress__wp_annual_reports: {
            title: node => node.title,
            link: node => node.acf.link,
          },
          wordpress__wp_events: {
            title: node => node.title,
            link: node => node.acf.link,
            tags: (node, getNode) =>
              node.tags___NODE // ignore empty tag arrays
                ? node.tags___NODE.map(id => getNode(id).name)
                : null,
          },
          wordpress__wp_legislative_advocacy: {
            title: node => node.title,
          },
          wordpress__wp_regulatory_advocacy: {
            title: node => node.title,
          },
          // Resources
          wordpress__wp_infographics: {
            title: node => node.title,
          },
          wordpress__wp_videos: {
            title: node => node.title,
          },
        },
        // Optional filter to limit indexed nodes
        // filter: (node, getNode) => node.frontmatter.tags !== 'exempt',
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-offline`,
  ],
}
