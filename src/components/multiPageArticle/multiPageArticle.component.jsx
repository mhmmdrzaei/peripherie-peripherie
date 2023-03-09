import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';

import AudioPlayer from "../audioPlayer/audioPlayer.component";
import ImageFrame from "../image/image.component";
import Columns from "../columns/columns.component";
const MultiPageArticle = ({listingOfArticles}) => {
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <div key={uuidv4()}>
            {listingOfArticles.map(({pageLabel,multiPageLayoutFields}, index) => (
            <div className="MultiPage" key={index}>
            <button
            className="multiPageTitle"
            key={uuidv4()}
            onClick={() => setCurrentPage(index)}
            onKeyDown={() => setCurrentPage(index)}
            style={{ cursor: 'pointer' }}
            > 
            {pageLabel}
            </button>
            {currentPage === index && (
            <section className="pageContent">
                {multiPageLayoutFields.map((mplFields, mplIndex) => {
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_ImageFullWidth') {
                    return (  <ImageFrame imageData={mplFields} key={uuidv4()}/> )
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_FullWidthTextEditor') {
                    return (
                    <div className="fullWidthMultiParagraph" key={mplIndex} dangerouslySetInnerHTML={{__html: mplFields.fullWidthTextBox }} />
                    )
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_TwoColumnLayout') {
                    return (
                        <Columns key={uuidv4()} columnData={mplFields} />
                    )
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_VideoAudioEmbedding') {
                    return (
                    <div  key={mplIndex} className="responsiveVideo" dangerouslySetInnerHTML={{ __html: mplFields.contentEmbedding }} />
                    )
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_AudioFile') {
                    return ( <AudioPlayer key={uuidv4()} audioData={mplFields} /> )
                }
                return null;
                })}
            </section>
            )}
            </div>
            ))}
        </div>

    )
}
export default MultiPageArticle;