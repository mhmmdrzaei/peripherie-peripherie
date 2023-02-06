import { useStaticQuery, graphql, Link } from "gatsby";

import React from 'react';



const ContributorsList = () => {
	const contributorsData = useStaticQuery(graphql`
	query MyQuery {
        allWpContributor {
          nodes {
            id
            slug
            uri
            title
          }
        }
      }
  `)
	return (
		<section className="contributors">
      {contributorsData.allWpContributor.nodes.map(({uri, title, id}: {uri: string, title: string, id: string}) => {
        return (
          <Link to={uri} key={id}>
            {title}
          </Link>
        );
      })}
        </section>
	)
}
 


export default ContributorsList;
