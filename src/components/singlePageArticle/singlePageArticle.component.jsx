import React from "react";
import { COLUMN_ORDER, COLUMN_ALIGNMENT_STYLES, COLUMN_SIZING_STYLES } from "../stylingComponent/stylingComponent.component";
import AudioPlayer from "../audioPlayer/audioPlayer.component";
import ImageFrame from "../image/image.component";
import Columns from "../columns/columns.component";
const SinglePageArticle = ({listingOfArticles})=>{
    return (
        <div>
        {

        listingOfArticles.map((singlePageFields)=> {
            
                if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_AudioFile") {
                return ( <AudioPlayer audioData={singlePageFields} /> )
                }
                if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_VideoAudioEmbedding") {

                    return (
                    <div  className="responsiveVideo" dangerouslySetInnerHTML={{ __html: singlePageFields.contentEmbedding }} />

                    )
                    

                }
                if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_ImageFullWidth") {
                return ( <ImageFrame imageData={singlePageFields} /> )
            }
            if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_TwoColumnLayout") {

                return (
                <Columns columnData={singlePageFields} />
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