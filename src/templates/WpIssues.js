import React, {useState} from "react"
import {graphql, Link} from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component'

export const COLUMN_SIZING_STYLES = {
  "50% / 50%": "fiftyWidth",
  "60% / 40%": "sixtyWiidth",
  "40% / 60%": "fourtyWiidth",
  "undefined": ''
};
export const COLUMN_ALIGNMENT_STYLES = {
  "Top": "topAligned",
  "Center": "centerAligned",
  "Bottom": "bottomAligned",
  "undefined": ''
};
export const COLUMN_ORDER = {
  "Image / Text": "imageFirst",
  "Text / Image": "textFirst",
  "undefined": ''
};


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

                          listingOfArticles.articleFields.pageLayoutFields.map((singlePageFields)=> {
                                
                                  if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_AudioFile") {
                                    return (<>
                                      <audio controls>
                                       <source src={singlePageFields.audioFileUpload.mediaItemUrl} type={`audio/${singlePageFields.fileTypeLowecase}`}/>
                                        Your browser does not support the audio element.
                                      </audio>
                                    
                                    
                                    </>)
                                  }
                                  if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_VideoAudioEmbedding") {

                                      return (
                                        <div  className="responsiveVideo" dangerouslySetInnerHTML={{ __html: singlePageFields.contentEmbedding }} />

                                        )
                                        

                                  }
                                  if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_ImageFullWidth") {

                                    return (
                                      <figure >
                                      <img loading="lazy" src={singlePageFields.imageFullWidthUpload.mediaItemUrl} alt={singlePageFields.imageFullWidthUpload.altText} />
                                      
                                    </figure>

                                      )
                                      

                                }
                                if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_TwoColumnLayout") {

                                  return (

                                    <div className={`columnLayout ${COLUMN_SIZING_STYLES[singlePageFields.columnWidths]}`}>
                                      {
                                        singlePageFields.columnContentLaidOutFromLeftToRight.map((columns)=> {
                                          if(columns.fieldGroupName==="Article_Articlefields_PageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_TextText"){
                                            return(
                                              <>
                            
                                              <div  className={`leftColumn ${COLUMN_ALIGNMENT_STYLES[columns.textText.leftTextBox.alignBoxTo]}`} dangerouslySetInnerHTML={{ __html: columns.textText.leftTextBox.leftTextBoxContent }} />
                                              <div  className={`rightColumn ${COLUMN_ALIGNMENT_STYLES[columns.textText.rightTextBox.alignBoxTo]}`} dangerouslySetInnerHTML={{ __html: columns.textText.rightTextBox.rightTextBoxContent }} />
                                          
                                              
                                              </>
                                            )
                                          }
                                          if(columns.fieldGroupName==="Article_Articlefields_PageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_Image"){
                                            return(
                                              <div className={`imageTextColumn ${COLUMN_ORDER[columns.columnOrder]}`}>
                                                <figure className={`imageColumn ${COLUMN_ALIGNMENT_STYLES[columns.imageColumn.alignImageTo]}`}>
                                                  <img loading="lazy" src={columns.imageColumn.imageUpload.mediaItemUrl} alt= {columns.imageColumn.imageUpload.altText} />
                                                </figure>
                            
                                              <div  className={`textColumn ${COLUMN_ALIGNMENT_STYLES[columns.textColumn.alignTextColumnTo]}`} dangerouslySetInnerHTML={{ __html: columns.textColumn.textColumnContent }} />
                                          
                                              
                                              </div>
                                            )
                                          }
                                          else return [];
                
                                        })
                                      }
                
                                    </div>
                                  )
                                    

                              }
                              if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_FullWidthTextEditor") {

                                return (
                                  <div className="fullWidthMultiParagraph" dangerouslySetInnerHTML={{__html: singlePageFields.fullWidthTextBox }} />

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
                  return (
                    <figure key={mplIndex}>
                      <img loading="lazy" src={mplFields.imageFullWidthUpload.mediaItemUrl} alt={mplFields.imageFullWidthUpload.altText} />
                      
                    </figure>
                   
                  )
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_FullWidthTextEditor') {
                  return (
                    <div className="fullWidthMultiParagraph" key={mplIndex} dangerouslySetInnerHTML={{__html: mplFields.fullWidthTextBox }} />
                  )
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_TwoColumnLayout') {
                  return (

                    <div className={`columnLayout ${COLUMN_SIZING_STYLES[mplFields.columnWidths]}`}>
                      {
                        mplFields.columnContentLaidOutFromLeftToRight.map((columns)=> {
                          if(columns.fieldGroupName==="Article_Articlefields_multiPageLayout_MultiPageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_TextText"){
                            return(
                              <>
            
                              <div  className={`leftColumn ${COLUMN_ALIGNMENT_STYLES[columns.textText.leftTextBox.alignBoxTo]}`} dangerouslySetInnerHTML={{ __html: columns.textText.leftTextBox.leftTextBoxContent }} />
                              <div  className={`rightColumn ${COLUMN_ALIGNMENT_STYLES[columns.textText.rightTextBox.alignBoxTo]}`} dangerouslySetInnerHTML={{ __html: columns.textText.rightTextBox.rightTextBoxContent }} />
                          
                              
                              </>
                            )
                          }
                          if(columns.fieldGroupName==="Article_Articlefields_multiPageLayout_MultiPageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_Image"){
                            return(
                              <div className={`imageTextColumn ${COLUMN_ORDER[columns.columnOrder]}`}>
                                <figure className={`imageColumn ${COLUMN_ALIGNMENT_STYLES[columns.imageColumn.alignImageTo]}`}>
                                  <img loading="lazy" src={columns.imageColumn.imageUpload.mediaItemUrl} alt= {columns.imageColumn.imageUpload.altText} />
                                </figure>
            
                              <div  className={`textColumn ${COLUMN_ALIGNMENT_STYLES[columns.textColumn.alignTextColumnTo]}`} dangerouslySetInnerHTML={{ __html: columns.textColumn.textColumnContent }} />
                          
                              
                              </div>
                            )
                          }
                          else return [];

                        })
                      }

                    </div>
                  )
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_VideoAudioEmbedding') {
                  return (
                    <div  key={mplIndex} className="responsiveVideo" dangerouslySetInnerHTML={{ __html: mplFields.contentEmbedding }} />
                  )
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_AudioFile') {
                  return (<>
                    <audio controls>
                     <source src={mplFields.audioFileUpload.mediaItemUrl} type={`audio/${mplFields.fileTypeLowecase}`}/>
                      Your browser does not support the audio element.
                    </audio>
                  
                  
                  </>)
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
                    ... on WpArticle_Articlefields_PageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_TextText {
                      fieldGroupName
                      textText {
                        fieldGroupName
                        leftTextBox {
                          alignBoxTo
                          fieldGroupName
                          leftTextBoxContent
                        }
                        rightTextBox {
                          alignBoxTo
                          fieldGroupName
                          rightTextBoxContent
                        }
                      }
                    }
                    ... on WpArticle_Articlefields_PageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_Image {
                      columnOrder
                      fieldGroupName
                      imageColumn {
                        alignImageTo
                        fieldGroupName
                        imageUpload {
                          altText
                          id
                          mediaItemUrl
                        }
                      }
                      textColumn {
                        alignTextColumnTo
                        fieldGroupName
                        textColumnContent
                      }
                    }
                  }
                }
                ... on WpArticle_Articlefields_PageLayoutFields_ImageFullWidth {
                  fieldGroupName
                  imageFullWidthUpload {
                    altText
                    id
                    link
                    mediaItemUrl
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
                    mediaItemUrl
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
                      ... on WpArticle_Articlefields_multiPageLayout_MultiPageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_Image {
                        fieldGroupName
                        columnOrder
                        imageColumn {
                          alignImageTo
                          fieldGroupName
                          imageUpload {
                            altText
                            id
                            mediaItemUrl
                          }
                        }
                        textColumn {
                          alignTextColumnTo
                          fieldGroupName
                          textColumnContent
                        }
                      }
                      ... on WpArticle_Articlefields_multiPageLayout_MultiPageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_TextText {
                        fieldGroupName
                        textText {
                          fieldGroupName
                          leftTextBox {
                            alignBoxTo
                            fieldGroupName
                            leftTextBoxContent
                          }
                          rightTextBox {
                            alignBoxTo
                            fieldGroupName
                            rightTextBoxContent
                          }
                        }
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
                      mediaItemUrl
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