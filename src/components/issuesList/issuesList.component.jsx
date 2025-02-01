import { useStaticQuery, graphql, Link } from "gatsby";
import React from "react";

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
  `);
  return (
    <section className="container">
      {issuesData.allWpIssue.nodes.map(
        ({ uri, title, id, featuredImage, issuePages }) => {
          return (
            <section className="issueContainer" key={id}>
              <article className="media-container">
                <div className="book-wrapper">
                  <div className="book">
                    <div className="book__front">
                      <Link to={uri}>
                        <img
                          src={featuredImage.node.mediaItemUrl}
                          alt={featuredImage.node.altText}
                          id={featuredImage.node.id}
                        />
                      </Link>
                    </div>
                    <div className="book__paper"></div>
                    <div className="book__back"></div>
                  </div>
                  <div className="book-shadow"></div>
                </div>
              </article>

              <section className="issueDetails">
                <h2>
                  <Link to={uri}>{title}</Link>{" "}
                </h2>

                <div
                  dangerouslySetInnerHTML={{ __html: issuePages.issueDetails }}
                />
                <div className="issueContributors">
                  <h3>Featuring Works By:</h3>
                  {issuePages.issueContributors.map(({ contributorName }) => {
                    return (
                      <Link to={contributorName.uri} id={contributorName.id}>
                        {contributorName.title}
                      </Link>
                    );
                  })}
                </div>

              </section>
            </section>
          );
        }
      )}
    </section>
  );
};

export default IssuesList;
