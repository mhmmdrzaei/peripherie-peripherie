import React from "react"
import {graphql} from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component'
import HomePage from '../components/homepage/homepage.component'

const PagePageTemplate = ({ data }) => {
  const { wpPage } = data;
  const pageLayout =()=> {
   if(wpPage.id ==='cG9zdDo3MA==') {
      return (<HomePage/>)
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
   <h1>test</h1>

    </Layout>
  )
}
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