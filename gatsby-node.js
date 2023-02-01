

exports.createPages = async({actions, graphql, reporter}) => {

    const result = await graphql(`
        {
          allWpContributor {
            nodes {
              id
              databaseId
              uri
              __typename
            }
          }
          allWpArticle {
            nodes {
              id
              uri
              databaseId
              __typename
            }
          }
          allWpPage {
            nodes {
              __typename
              id
              uri
              databaseId
            }
          }
        }
        allWpIssue {
          nodes {
            databaseId
            uri
            __typename
          }
        }
    `)

    if (result.errors) {
        reporter.error("There was an error fetching posts", result.errors)
    }

    const { allWpContributor, allWpArticle, allWpPage } = result.data;
    // const { allWpArticle } =  result.data;
    // const {allWpPage} = result.data;




    let template = require.resolve(`./src/templates/WpArticle.js`);
    let contTemplate = require.resolve(`./src/templates/WpContributor.js`);
    let pageTemplate = require.resolve(`./src/templates/WpPage.js`);
    let issuesTemplate = require.resolve(`./src/templates.WpIssues.js`)

    allWpArticle.nodes.map( post => {
        actions.createPage({
            path: post.uri,
            component: template,
            context: post
        })
    })

    allWpContributor.nodes.map( cont => {
        actions.createPage({
            path: cont.uri,
            component: contTemplate,
            context: cont
        })
    })
    allWpPage.nodes.map( page => {
        actions.createPage({
            path: page.uri,
            component: pageTemplate,
            context: page
        })
    })
    allWpIssue.nodes.map( issue => {
      actions.createPage({
          path: issue.uri,
          component: issuesTemplate,
          context: issue
      })
  })

}
