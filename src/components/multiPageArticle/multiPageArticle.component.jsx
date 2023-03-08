import React, {useState} from "react";
import { COLUMN_ORDER, COLUMN_ALIGNMENT_STYLES, COLUMN_SIZING_STYLES } from "../stylingComponent/stylingComponent.component";

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
                    
                    
                    </>
                    )
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