import { useStaticQuery, graphql, Link } from "gatsby";
import React from 'react';

interface Contributor {
  id: string;
  slug: string;
  uri: string;
  title: string;
}

interface ContributorsData {
  allWpContributor: {
    nodes: Contributor[];
  };
}

const ContributorsList: React.FC = () => {
  const contributorsData: ContributorsData = useStaticQuery(graphql`
    query ContQuery {
      allWpContributor {
        nodes {
          id
          slug
          uri
          title
        }
      }
    }
  `);
  return (
    <section className="contributors">
      {contributorsData.allWpContributor.nodes.map(({ uri, title, id }) => {
        return (
          <Link to={uri} key={id}>
            {title}
          </Link>
        );
      })}
    </section>
  );
};

export default ContributorsList;
