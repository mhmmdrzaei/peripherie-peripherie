import React, {useState} from "react";
import { COLUMN_ORDER, COLUMN_ALIGNMENT_STYLES, COLUMN_SIZING_STYLES } from "../stylingComponent/stylingComponent.component";
import AudioPlayer from "../audioPlayer/audioPlayer.component";
import ImageFrame from "../image/image.component";
import Columns from "../columns/columns.component";
const MultiPageArticle = ({listingOfArticles}) => {
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <div>
            {listingOfArticles.map(({pageLabel,multiPageLayoutFields}, index) => (
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
                    return ( <ImageFrame imageData={mplFields} /> )
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_FullWidthTextEditor') {
                    return (
                    <div className="fullWidthMultiParagraph" key={mplIndex} dangerouslySetInnerHTML={{__html: mplFields.fullWidthTextBox }} />
                    )
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_TwoColumnLayout') {
                    return (
                        <Columns columnData={mplFields} />
                    )
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_VideoAudioEmbedding') {
                    return (
                    <div  key={mplIndex} className="responsiveVideo" dangerouslySetInnerHTML={{ __html: mplFields.contentEmbedding }} />
                    )
                }
                if (mplFields.fieldGroupName === 'Article_Articlefields_multiPageLayout_MultiPageLayoutFields_AudioFile') {
                    return ( <AudioPlayer audioData={mplFields} /> )
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