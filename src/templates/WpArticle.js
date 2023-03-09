import React from "react"
import {graphql} from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component'



const WpPost = ({ data }) => {
    const { wpArticle } = data;
    return(
        <Layout key={wpArticle.contentType.node.id} >
          <h1>{wpArticle.title}</h1>
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
    articleFields {
      contributors {
        contributorConnect {
          ... on WpContributor {
            id
            title
            uri
          }
        }
        fieldGroupName
      }
      fieldGroupName
      multiPageLayout {
        fieldGroupName
        multiPageLayoutFields {
          ... on WpArticle_Articlefields_multiPageLayout_MultiPageLayoutFields_FullWidthTextEditor {
            fieldGroupName
            fullWidthTextBox
          }
          ... on WpArticle_Articlefields_multiPageLayout_MultiPageLayoutFields_TwoColumnLayout {
            columnWidths
            fieldGroupName
          }
          ... on WpArticle_Articlefields_multiPageLayout_MultiPageLayoutFields_ImageFullWidth {
            fieldGroupName
            imageFullWidthUpload {
              altText
              link
              sizes
              title
              uri
              caption
            }
          }
          ... on WpArticle_Articlefields_multiPageLayout_MultiPageLayoutFields_VideoAudioEmbedding {
            contentEmbedding
            fieldGroupName
          }
          ... on WpArticle_Articlefields_multiPageLayout_MultiPageLayoutFields_AudioFile {
            fieldGroupName
            fileTypeLowecase
            audioFileUpload {
              altText
              id
              sizes
              uri
              caption
            }
          }
        }
        pageLabel
      }
      pageLayout
      pageLayoutFields {
        ... on WpArticle_Articlefields_PageLayoutFields_FullWidthTextEditor {
          fieldGroupName
          fullWidthTextBox
        }
        ... on WpArticle_Articlefields_PageLayoutFields_TwoColumnLayout {
          columnWidths
          fieldGroupName
        
        }
        ... on WpArticle_Articlefields_PageLayoutFields_ImageFullWidth {
          fieldGroupName
          imageFullWidthUpload {
            altText
            link
            caption
            id
          }
        }
        ... on WpArticle_Articlefields_PageLayoutFields_VideoAudioEmbedding {
          contentEmbedding
          fieldGroupName
        }
        ... on WpArticle_Articlefields_PageLayoutFields_AudioFile {
          fieldGroupName
          fileTypeLowecase
          audioFileUpload {
            altText
            id
            link
          }
        }
      }
    }
  }
}
`;
