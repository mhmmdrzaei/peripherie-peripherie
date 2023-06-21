import React from "react";
import { v4 as uuidv4 } from 'uuid';

import AudioPlayer from "../audioPlayer/audioPlayer.component";
import ImageFrame from "../image/image.component";
import Columns from "../columns/columns.component";
const SinglePageArticle = ({listingOfArticles})=>{
    return (
        <div key={uuidv4()}>
        {

        listingOfArticles.map((singlePageFields)=> {
            
                if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_AudioFile") {
                return ( <AudioPlayer key={uuidv4()} audioData={singlePageFields} /> )
                }
                if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_VideoAudioEmbedding") {

                    return (
                    <div className="resonsiveVidParent">
                        <div  key={uuidv4()} className="responsiveVideo" dangerouslySetInnerHTML={{ __html: singlePageFields.contentEmbedding }} />


                    </div>

                    )
                    

                }
                if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_ImageFullWidth") {
                return ( <ImageFrame key={uuidv4()} imageData={singlePageFields} /> )
            }
            if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_TwoColumnLayout") {

                return (
                <Columns key={uuidv4()} columnData={singlePageFields} />
                )
                

            }
            if(singlePageFields.fieldGroupName === "Article_Articlefields_PageLayoutFields_FullWidthTextEditor") {

            return (
                <div key={uuidv4()} className="fullWidthMultiParagraph" dangerouslySetInnerHTML={{__html: singlePageFields.fullWidthTextBox }} />

                )
                

            }
         else return [];

            
            })
            }
    </div>
    )
}
export default SinglePageArticle;