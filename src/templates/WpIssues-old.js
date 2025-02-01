import React, {useState, useEffect, useMemo} from "react"
import {graphql, Link} from "gatsby";
// import { Helmet } from "react-helmet/es/Helmet";
import Layout from '../components/layout/layout.component';
import ArticleLayout from "../components/articleLayouts/articleLayout.component";
import { v4 as uuidv4 } from 'uuid';
import { StaticImage } from "gatsby-plugin-image";
import { Seo } from "../components/seo/seo.component"



const IssuesPageTemplate = ({ data }) => {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const { wpIssue } = data;
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const allowedPasswords = useMemo(() => [
    'N2KP-RNJV-258J-TEX4',
'8YMF-MNWG-M8ND-AFP5',
'PZJ3-EX9P-R9LT-ND6H',
'ZHDA-JK3A-CTUF-AY8K',
'B566-7KB2-RZAM-WQC3',
'6BZN-SFHY-6FLC-476F',
'QCAH-5G2L-HQGF-448Y',
'PQSC-TXSK-D3AL-FDVF',
'88R7-JG89-RTTW-F9MU',
'TH9B-D5RT-RY5W-AHP2',
'P3LB-238Z-YWUX-N26L',
'XYRD-XBL7-GFB6-J5E2',
'AQAD-BCF8-KDQE-NNXS',
'V5JS-WNNS-HJ5D-PTQE',
'XZNU-T7TF-6YBM-ZXYA',
'SXRQ-Q5F6-Q54P-RK5W',
'K2RA-UCK6-VJX5-HXJW',
'AE85-LS4N-H59V-WS4Z',
'9TKB-YXZ3-4CEF-KCKP',
'7MWC-N2SR-EBNC-74CV',
'GNMT-EC8T-JAWD-EB87',
'V8NB-FPD8-JR4M-8NV5',
'LP6Y-FSNW-FDT6-RM7G',
'QWX6-PG2N-UDVK-WE6M',
'CQSY-7W49-LX8F-6G3E',
'REE4-QA7F-NJED-JSCW',
'G3YL-LW29-NGAR-NBPP',
'NQHP-76U4-9LST-6CNQ',
'A72U-NQRB-3GB2-N3NJ',
'XMBW-ECSC-G394-NSQP',
'ZVWQ-FDCV-L2EA-4CRL',
'WHDE-332A-657X-LPUJ',
'U4KQ-HN8L-283E-NKK2',
'7WU8-GSQV-YV98-38Y5',
'7ZAT-8X5V-743M-78S9',
'PN8J-9A8Z-7ZEJ-MWYF',
'4MU4-D8KM-ELPA-3PA5',
'JC4Z-K26W-V6AQ-V625',
'DKSP-FYN8-AC9Y-SQMP',
'4FVT-QSY8-ME9B-ZS35',
'TXLH-TKGE-8LZY-9QJD',
'TBSG-ZDKW-DL8Z-ELN2',
'S7Z8-2CFK-XHTM-VZGZ',
'YLTQ-NKJQ-MXFV-BUPA',
'TB5F-KJCE-ERZ8-JZ9F',
'PZPZ-JJ7V-8QD8-A5XD',
'37QE-P56U-67TA-N7UU',
'F73Y-EXSS-566C-F772',
'8ZUG-79KD-ACRC-QFBQ',
'UDWE-MQWV-NRJY-UXVC',
'2LMG-QTFP-KHYP-QPW7',
'DNPL-ZFVH-YAZB-PEPH',
'QBWP-M69F-YD4V-JRCF',
'FNYK-WTKV-594H-Q6SK',
'J8ED-6EBQ-37AG-MWYX',
'HZUY-N54D-UQA4-PWCB',
'JE7F-JY77-Y2FF-FBE3',
'GXH6-WRSD-TYN3-WETT',
'ANHR-PE82-3ETU-VNDX',
'5XK8-FVPY-F8YW-SYXD',
'9WKU-3BA9-X8LN-34R9',
'X42P-54H9-2LFT-NEMC',
'HST5-XNVB-KQM9-R9SX',
'L49E-JG6G-46UQ-5U86',
'VUBQ-SKSG-83G5-ZPJ3',
'NRY7-NM53-CXE2-DT38',
'EJFQ-4SDF-5GFQ-J3J3',
'58JQ-GU74-RU2S-QSJW',
'4F39-PP5U-5FCK-2X4E',
'NDJD-BRHB-MJCB-UJPU',
'87XG-N3GW-CNGL-P4DE',
'4JVR-E3MR-DSB9-EV5C',
'MHL6-CQ73-56SJ-PZ3Y',
'6TTL-R5AH-AZW7-GGB8',
'FQG7-FUL6-WURL-8FQW',
'QRSP-BZAD-5X6E-J32E',
'7S4H-KM8J-KKLC-4WKR',
'DB95-L7TV-3E42-Q3ZE',
'5V4G-7FNE-45RA-4PKY',
'BBDJ-EBGG-LNAU-9G3G',
'D87Q-VSYD-P7VD-LWTP',
'FW7A-JCPY-QT6S-XKBD',
'6U3R-KCJD-AUY9-KQGZ',
'S5ZB-VGXG-ADHP-NCMG',
'U76G-5V4Z-AUXQ-YTWR',
'QZVE-JXTC-57MS-P7NS',
'VMM6-7QXS-UUV3-9H33',
'GB9E-8ENM-AC96-PSQZ',
'EZ8M-W23K-T4JY-PDGU',
'VD2G-2XGZ-Q8SV-65G8',
'WH4M-UZLR-X243-ZCP6',
'S94D-RUQB-WM4N-PZZL',
'AK3T-JLPN-3C3U-77FX',
'4ZS4-CFAA-88YM-KL83',
'LC7B-GXJZ-F635-CY86',
'VC2R-GBMU-397B-7C8L',
'ZXJQ-4TBF-TWHU-WZQS',
'LPXX-S5CA-6L3K-ECE8',
'GH7X-Q7CH-FJ9U-D74X',
'GNPL-TYY5-RPY6-HH4K',
  ], []);

  const requiresAuth = useMemo(() => {
    if (!wpIssue?.link) return false;
    return wpIssue.link.trim().toLowerCase().replace(/\/$/, "") === "/issues/peripherie-peripherie-1";
  }, [wpIssue]);
  console.log("Page ID:", data?.wpIssue?.id);

  
  useEffect(() => {
    console.log("Checking authentication...");
    console.log("requiresAuth:", requiresAuth);
  
    if (requiresAuth) {
      const storedPassword = window.localStorage.getItem('password');
      console.log("Stored Password:", storedPassword);
      if (allowedPasswords.includes(storedPassword)) {
        console.log("User authenticated!");
        setAuthenticated(true);
      }
    } else {
      console.log("No authentication required");
      setAuthenticated(true);
    }
  }, [requiresAuth, allowedPasswords]);
  
  const handleSubmit = (e) => { 
    e.preventDefault();
    if (allowedPasswords.includes(password)) {
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
          <section className="issuePurchaseDetails">
            <div dangerouslySetInnerHTML={{__html: wpIssue.issuePages.purchasePopUpInformationText }} />
            {
              wpIssue.issuePages.linkToShop ? 
              <a href={wpIssue.issuePages.linkToShop.url} target={wpIssue.issuePages.linkToShop.target}>{wpIssue.issuePages.linkToShop.title}</a>
              : null
            }

          </section>
          <form onSubmit={handleSubmit}>
            <label htmlFor="passcode"> 
              <h3>Passcode:</h3>
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
        {
          wpIssue.issuePages.publicationPdfUpload ?

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
        : null
        }

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
      purchasePopUpInformationText
      linkToShop {
        url
        title
        target
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

export const Head = () => (
  <Seo />
)