import { useStaticQuery, graphql, Link } from "gatsby";
import React from 'react';
import SingleIssue from "../singleIssue/singleIssue.component";



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
            {issuesData.allWpIssue.nodes.map(({uri, title, id, featuredImage, issuePages}: {uri: string, title: string, id: string, featuredImage:any, issuePages:any}) => {
            return (
              <SingleIssue singleData={{uri, title, id, featuredImage, issuePages}}/>                
  

            );
            })}
        </section>
	)
}
 


export default IssuesList;
