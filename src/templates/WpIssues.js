import React from "react"
import {graphql} from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component'
import HomePage from '../components/homePage/homePage.component'

const PagePageTemplate = ({ data }) => {
  const { wpIssue } = data;
  return (
   <Layout>

   <h1>test</h1>

    </Layout>
  )
}
export default PagePageTemplate;

export const pageQuery = graphql`

query PagePageByType($id: String) {
   wpIssue(id: {eq: $id}) {
      id
      link
      title
    
  }
}

`