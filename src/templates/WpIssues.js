import React, {useState} from "react"
import {graphql, Link} from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component'

const IssuesPageTemplate = ({ data }) => {
  const [showData, setShowData] = useState(false)
  const { wpIssue } = data;
  console.log(wpIssue.issuePages.publicationPdfUpload)
  return (
   <Layout>
    {!showData && (
      <section className="landingPage">
        <img src={wpIssue.featuredImage.node.mediaItemUrl} alt={wpIssue.featuredImage.node.altText} id={wpIssue.featuredImage.node.id}/>
        <div className="landingDetails">
          <h1>{wpIssue.title}</h1>
          <div  dangerouslySetInnerHTML={{__html: wpIssue.issuePages.issueDetails }} />
          <div className="issueContributors">
              <span>Featuring Works By:</span>
              {wpIssue.issuePages.issueContributors.map(({contributorName}) => {
                  return (
                      <Link to={contributorName.uri} id={contributorName.id}>{contributorName.title}</Link>
                  )
              })}
          </div>
          <div>
            <a href={wpIssue.issuePages.publicationPdfUpload.publicUrl} target="_blank" rel="noreferrer"s>Download this Isssue as a PDF</a>
          </div>
        </div>
        <div className="landingIndex">
            {wpIssue.issuePages.linkArticles.map(({listingOfArticles}) => {
                  return (
                    <ul>
                      <li onClick={() => setShowData(!showData)} id={listingOfArticles.id}>{listingOfArticles.title}</li>
                    </ul>
                  )
              })}
        </div>
      </section>
    )}
    {showData && (
      <h1>test</h1>
    )}

    

    

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
    featuredImage {
      node {
        id
        mediaItemUrl
        altText
      }
    }
    issuePages {
      fieldGroupName
      issueContributors {
        contributorName {
          ... on WpContributor {
            id
            uri
            title
          }
        }
      }
      issueDetails
      linkArticles {
        fieldGroupName
        listingOfArticles {
          ... on WpArticle {
            id
            title
            articleFields {
              contributors {
                contributorConnect {
                  ... on WpContributor {
                    id
                    title
                    uri
                    link
                  }
                }
                fieldGroupName
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
                  columnContentLaidOutFromLeftToRight {
                    ... on WpArticle_Articlefields_PageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_Spacer {
                      fieldGroupName
                      spacerHeight
                    }
                    ... on WpArticle_Articlefields_PageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_Image {
                      fieldGroupName
                      imageUpload {
                        altText
                        id
                        uri
                        link
                      }
                    }
                    ... on WpArticle_Articlefields_PageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_Text {
                      fieldGroupName
                      textInput
                    }
                  }
                }
                ... on WpArticle_Articlefields_PageLayoutFields_ImageFullWidth {
                  fieldGroupName
                  imageFullWidthUpload {
                    altText
                    id
                    link
                    uri
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
                    uri
                    title
                  }
                }
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
                    columnContentLaidOutFromLeftToRight {
                      ... on WpArticle_Articlefields_multiPageLayout_MultiPageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_Spacer {
                        fieldGroupName
                        spacerHeight
                      }
                      ... on WpArticle_Articlefields_multiPageLayout_MultiPageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_Image {
                        fieldGroupName
                      }
                      ... on WpArticle_Articlefields_multiPageLayout_MultiPageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_Text {
                        fieldGroupName
                        textInput
                      }
                    }
                  }
                  ... on WpArticle_Articlefields_multiPageLayout_MultiPageLayoutFields_ImageFullWidth {
                    fieldGroupName
                    imageFullWidthUpload {
                      altText
                      mediaItemUrl
                      uri
                      link
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
                      link
                      uri
                      title
                    }
                  }
                }
                pageLabel
              }
            }
          }
        }
      }
      publicationPdfUpload {
        altText
        id
        link
        publicUrl
        title
        uri
      }
    }
  }
}

`