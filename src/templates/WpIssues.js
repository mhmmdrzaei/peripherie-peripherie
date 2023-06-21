import React, {useState, useEffect} from "react"
import {graphql, Link} from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component';
import ArticleLayout from "../components/articleLayouts/articleLayout.component";
import { v4 as uuidv4 } from 'uuid';
import { StaticImage } from "gatsby-plugin-image";


const IssuesPageTemplate = ({ data }) => {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const { wpIssue } = data;
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const allowedPasswords = [ 'password5', 'password3']; // array of allowed passwords
  useEffect(() => {
    const storedPassword = window.localStorage.getItem('password');
    if (allowedPasswords.includes(storedPassword)) {
      setAuthenticated(true);
    }
  }, []);
 const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the password is correct
    if (allowedPasswords.includes(password)) {
      // Store the password in local storage
      window.localStorage.setItem('password', password);
      setAuthenticated(true);
    } else {
      alert('Invalid password!');
    }
  };
  
  const handleArticleClick = articleId => {
    setSelectedArticle(articleId)
  }
  if (!authenticated) {
    return (
      <Layout>
        <div className="passwordPage"> 
        <h1>Password Protected Page</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
        
        </div>

      </Layout>
    );
  }
  else {

  return (
    <Layout>
             <section className="upperPageNav">
        <h1>{wpIssue.title}</h1>
        <div className="pdfDownload">
          <a href={wpIssue.issuePages.publicationPdfUpload.publicUrl} target="_blank" rel="noreferrer">
            <StaticImage
              src="../images/download.svg"
              alt="download symbol"
              placeholder="blurred"
              height='25'
            />
            Download this Issue as a PDF
          </a>
        </div>
        <div className="landingIndex">
          <h2>Featured Works:</h2>
          {wpIssue.issuePages.linkArticles.map(({ listingOfArticles }) => (
            <button
              onClick={() => handleArticleClick(listingOfArticles.id)}
              onKeyDown={() => handleArticleClick(listingOfArticles.id)}
              key={uuidv4()}
              className={listingOfArticles.id === selectedArticle ? "activeButton" : ""}
              dangerouslySetInnerHTML={{ __html: listingOfArticles.title }}
            />
          ))}
        </div>
      </section>
      {!selectedArticle ? (
        <section className="landingPage">
                          <article className="media-container">
                <div className="book-wrapper">
                <div className="book">
                <div className="book__front">
                <img src={wpIssue.featuredImage.node.mediaItemUrl} alt={wpIssue.featuredImage.node.altText} id={wpIssue.featuredImage.node.id}/>
                </div>
                <div className="book__paper"></div>
                <div className="book__back"></div>
                </div>
                <div className="book-shadow"></div>
                </div>
                </article>
           <div className="issueContributors">
              <h3>Featuring Works By:</h3>
              {wpIssue.issuePages.issueContributors.map(({contributorName}) => {
                  return (
                      <Link to={contributorName.uri} key={contributorName.id} id={contributorName.id}>{contributorName.title}</Link>
                  )
              })}
          </div>

        </section>
      ) : (
        <section className="issueMenu">
          <div className="landingIndex">
            <ul key={selectedArticle}>
              <button
              key={uuidv4()}
              onClick={() => setSelectedArticle(null)}
              onKeyDown={() => setSelectedArticle(null)}
              >Back
              </button>
            </ul>
            {wpIssue.issuePages.linkArticles.map(({ listingOfArticles }) => {
              
              if (listingOfArticles.id === selectedArticle) {
                
                return (
                  <ArticleLayout key={uuidv4()} listingOfArticles={listingOfArticles} />
                 
                )
              }
              return null; 
             
            })
            
            
            }

          </div>
        </section>
      )}
    </Layout>
  )
          }
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