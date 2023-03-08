import React from "react";
import { COLUMN_ORDER, COLUMN_ALIGNMENT_STYLES, COLUMN_SIZING_STYLES } from "../stylingComponent/stylingComponent.component";

const SinglePageArticle = ({listingOfArticles})=>{
    return (
        <div>
        {

        listingOfArticles.map((singlePageFields)=> {
            
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
    )
}
export default SinglePageArticle;