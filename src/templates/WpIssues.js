import React, {useState} from "react"
import {graphql, Link} from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component'

const IssuesPageTemplate = ({ data }) => {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const { wpIssue } = data;

  const handleArticleClick = articleId => {
    setSelectedArticle(articleId)
  }

  let pageId = 1111;

  const [currentPage, setCurrentPage] = useState(0);


  return (
    <Layout>
      <h1>{wpIssue.title}</h1>
      <div className="pdfDownload">
        <a href={wpIssue.issuePages.publicationPdfUpload.publicUrl} target="_blank" rel="noreferrer">Download this Issue as a PDF</a>
      </div>
      <div className="landingIndex">
            {wpIssue.issuePages.linkArticles.map(({ listingOfArticles }) => {
              return (
                <ul >
                  <li onClick={() => handleArticleClick(listingOfArticles.id)} key={listingOfArticles.id}>
                    {listingOfArticles.title}
                  </li>
                </ul>
              )
            })}
          </div>
      {!selectedArticle ? (
        <section className="landingPage">
           <img src={wpIssue.featuredImage.node.mediaItemUrl} alt={wpIssue.featuredImage.node.altText} id={wpIssue.featuredImage.node.id}/>
           <div className="issueContributors">
              <span>Featuring Works By:</span>
              {wpIssue.issuePages.issueContributors.map(({contributorName}) => {
                  return (
                      <Link to={contributorName.uri} id={contributorName.id}>{contributorName.title}</Link>
                  )
              })}
          </div>

          
          {/* ... */}

        </section>
      ) : (
        <section className="issueMenu">
          {/* ... */}
          <div className="landingIndex">
            <ul key={selectedArticle}>
              <li onClick={() => setSelectedArticle(null)}>Back</li>
            </ul>
            {wpIssue.issuePages.linkArticles.map(({ listingOfArticles }) => {
              console.log({listingOfArticles})
              if (listingOfArticles.id === selectedArticle) {
                
                return (
                  <article key={listingOfArticles.id}>
                    <h2>{listingOfArticles.title}</h2>
                    <div className="contributors">
                    {
                      listingOfArticles.articleFields.contributors.map((contributor)=> {
                        if (listingOfArticles.articleFields.contributors.length === 1) {
                          return <p key={contributor.contributorConnect[0].id}>Only one contributor: {contributor.contributorConnect[0].title}</p>
                        } else {
                          return(
                            contributor.contributorConnect.map((each)=> {
                              return <p key={each.id}>{each.title}</p>
                             
                            })
                          )

                        }
                      })
                    }
                    </div>
                    <section className="postContent">
                    {
                      listingOfArticles.articleFields.pageLayout === "Single Page" ? (
                        <div>
                          {

                          listingOfArticles.articleFields.pageLayoutFields.map(({fieldGroupName})=> {
                                
                                  if(fieldGroupName === "Article_Articlefields_PageLayoutFields_AudioFile") {
                                      return (
                                        <p>Audio</p>

                                        )
                                  }
                                  if(fieldGroupName === "Article_Articlefields_PageLayoutFields_VideoAudioEmbedding") {

                                      return (
                                        <p>embedded</p>

                                        )
                                        

                                  }
                                  if(fieldGroupName === "Article_Articlefields_PageLayoutFields_ImageFullWidth") {

                                    return (
                                      <p>full width img</p>

                                      )
                                      

                                }
                                if(fieldGroupName === "Article_Articlefields_PageLayoutFields_TwoColumnLayout") {

                                  return (
                                    <p>columns</p>

                                    )
                                    

                              }
                              if(fieldGroupName === "Article_Articlefields_PageLayoutFields_FullWidthTextEditor") {

                                return (
                                  <p>full width</p>

                                  )
                                  

                            }
                                  else return [];

                                
                              })
                              }
                        </div>
                      ) : listingOfArticles.articleFields.pageLayout === "Multi-Page" ? (
                        <div>
                        {listingOfArticles.articleFields.multiPageLayout.map(({pageLabel,multiPageLayoutFields}, index) => (
        <div className="MultiPage" key={index}>
          <section
            className="multiPageTitle"
            onClick={() => setCurrentPage(index)}
            style={{ cursor: 'pointer' }}
          >
            {pageLabel}
          </section>
          {currentPage === index && (
            <section className="pageContent">
              {multiPageLayoutFields.map((mplFields, mplIndex) => {
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_ImageFullWidth') {
                  return <p key={mplIndex}>img</p>;
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_FullWidthTextEditor') {
                  return <p key={mplIndex}>paragraph</p>;
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_TwoColumnLayout') {
                  return <p key={mplIndex}>column</p>;
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_VideoAudioEmbedding') {
                  return <p key={mplIndex}>iframe</p>;
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_AudioFile') {
                  return <p key={mplIndex}>audio</p>;
                }
                return null;
              })}
            </section>
          )}
        </div>
      ))}
                      </div>
                      ) : null
                      }
                    </section>

                  </article>
                )
              }
            })}
          </div>
        </section>
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