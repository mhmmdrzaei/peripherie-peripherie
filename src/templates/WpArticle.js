import React from "react"
import {graphql} from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component'



const WpPost = ({ data }) => {
    const { wpArticle } = data;
    return(
        <Layout key={wpArticle.contentType.node.id} >
          <h1>Test</h1>
        </Layout>

    )
}


export default WpPost;



export const query = graphql`
query PostById($id: String) {
  wpArticle(id: {eq: $id}) {
    title
    contentType {
      node {
        id
      }
    }
    id
    uri
  }
}
`;
