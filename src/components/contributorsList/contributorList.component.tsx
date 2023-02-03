import { useStaticQuery, graphql, Link } from "gatsby";

import React from 'react';



const ContributorsList = () => {
	const headerData = useStaticQuery(graphql`
	query MyQuery {
        allWpContributor {
          nodes {
            id
            slug
            uri
            contributors {
              contributorBio
              fieldGroupName
              featuredIn {
                ... on WpIssue {
                  id
                  uri
                  title
                }
              }
            }
          }
        }
      }
  `)
	return (
		<section className="contributors">
            {

            }
        </section>
	)
}
 


export default ContributorsList;
