import React from "react"

import {graphql } from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component'


const ContribotorPageTemplate = ({ data }) => {
  const { wpContributor } = data;
  return (
   <Layout>
    <h2>{wpContributor.title}</h2>
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