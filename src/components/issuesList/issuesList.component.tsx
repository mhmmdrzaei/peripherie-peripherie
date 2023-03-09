import { useStaticQuery, graphql, Link } from "gatsby";
import React from 'react';
import SingleIssue from "../singleIssue/singleIssue.component";
import PasswordProtectedIssues from "../passwordProtected/passwordProtected.component";



const IssuesList = () => {
	const issuesData = useStaticQuery(graphql`
    query IssuesQuery {
        allWpIssue {
          nodes {
            id
            slug
            uri
            title
            featuredImage {
              node {
                altText
                id
                mediaItemUrl
              }
            }
            issuePages {
              fieldGroupName
              issueContributors {
                contributorName {
                  ... on WpContributor {
                    id
                    uri
                    title
                  }
                }
              }
              issueDetails
              linkToShop {
                url
                title
                target
              }
              purchasePopUpInformationText
            }
          }
        }
      }
  `)
	return (
<section className="contributors">
  {issuesData.allWpIssue.nodes.map(
    ({ uri, title, id, featuredImage, issuePages }: any) => {
      return (
        <PasswordProtectedIssues
          key={id}
          issuesData={{ uri, title, id, featuredImage, issuePages }}
        />
      );
    }
  )}
</section>

	)
}
 


export default IssuesList;
