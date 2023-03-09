import React from "react";

const ImageFrame = ({imageData})=>{
    return (

        <figure key={imageData}>
        <img loading="lazy" src={imageData.imageFullWidthUpload.mediaItemUrl} alt={imageData.imageFullWidthUpload.altText} />
        
    </figure>

    )
}
export default ImageFrame;