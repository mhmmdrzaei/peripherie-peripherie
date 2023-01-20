import React from "react"
import {graphql} from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component'
import HomePage from '../components/homePage/homePage.component'
import Seo from '../components/seo/seo.component'

const PagePageTemplate = ({ data }) => {
  const { wpPage } = data;
  const pageLayout =()=> {
   if(wpPage.id ==='cG9zdDoxMTA=') {
      return (<HomePage />)
    } else return (
      <>
      <h1>{wpPage.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: wpPage.content }} />

      </>


      )
  }
  return (
   <Layout>
   
   {pageLayout()}

    </Layout>
  )
}
export const Head = () => <Seo title="Visual Artist" />
export default PagePageTemplate;

export const pageQuery = graphql`

query PagePageByType($id: String) {
   wpPage(id: {eq: $id}) {
      id
      link
      title
      content
    
  }
}

`