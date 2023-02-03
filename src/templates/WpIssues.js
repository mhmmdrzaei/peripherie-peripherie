import React from "react"
import {graphql} from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component'

const IssuesPageTemplate = ({ data }) => {
  const { wpIssue } = data;
  return (
   <Layout>

   <h1>{wpIssue.title}</h1>

    </Layout>
  )
}
export default IssuesPageTemplate;

export const pageQuery = graphql`

query IssuesPageTemplate($id: String) {
   wpIssue(id: {eq: $id}) {
      id
      link
      title
    
  }
}

`