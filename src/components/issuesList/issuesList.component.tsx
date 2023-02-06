import { useStaticQuery, graphql, Link } from "gatsby";
import React from 'react';



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
  console.log(issuesData)
	return (
		<section className="contributors">
            {issuesData.allWpIssue.nodes.map(({uri, title, id, featuredImage, issuePages}: {uri: string, title: string, id: string, featuredImage:any, issuePages:any}) => {
            return (
                <section className="issueContainer" key={id}>
                    <img src={featuredImage.node.mediaItemUrl} alt={featuredImage.node.altText} id={featuredImage.node.id}/>
                    <section className="issueDetails">
                        <Link to={uri} >
                            {title}
                            </Link> 
                        <div  dangerouslySetInnerHTML={{__html: issuePages.issueDetails }} />
                        <div className="issueContributors">
                            <span>Featuring Works By:</span>
                            {issuePages.issueContributors.map(({contributorName}: {contributorName:any}) => {
                                return (
                                    <Link to={contributorName.uri} id={contributorName.id}>{contributorName.title}</Link>
                                )
                            })}
                        </div>
                    </section>
                    <section className="issuePurchaseDetails">
                    <div  dangerouslySetInnerHTML={{__html: issuePages.purchasePopUpInformationText }} />
                    <a href={issuePages.linkToShop.url} target={issuePages.linkToShop.target}>{issuePages.linkToShop.title}</a>
                    </section>
                </section>
                     
  

            );
            })}
        </section>
	)
}
 


export default IssuesList;
