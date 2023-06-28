import React from "react"

import {graphql, Link } from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component'
import { Seo } from "../components/seo/seo.component"



const ContribotorPageTemplate = ({ data }) => {
  const { wpContributor } = data;
  return (
   <Layout>
    <section className="contributorPage container">
    <h2>{wpContributor.title}</h2>
    <div className="contBio" dangerouslySetInnerHTML={{__html: wpContributor.contributors.contributorBio }} />
    <section className="featuredIn">
      <h2>Featured In</h2>
      {wpContributor.contributors.featuredIn && wpContributor.contributors.featuredIn.length > 0 ? (
        wpContributor.contributors.featuredIn.map((contributor) => {
          return (
            <Link to={contributor.uri} key={contributor.id}>
              {contributor.title}
            </Link> 
          );
        })
      ) : null}

      
    </section>

    </section>

    </Layout>
  )
}


export default ContribotorPageTemplate;

export const pageQuery = graphql`

query PostById($id: String) {
  wpContributor(id: {eq: $id}) {
    title
    id
    uri
    contributors {
      contributorBio
      featuredIn {
        
        ... on WpIssue {
          
          id
          title
          uri
        }
      }
      fieldGroupName
    }
    databaseId
  }
}

`
export const Head = () => (
  <Seo />
)