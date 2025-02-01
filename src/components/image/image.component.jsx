import React from "react";



const ImageFrame = ({ imageData }) => {
  if (!imageData.imageFullWidthUpload) {
    // Render a placeholder or return null if there is no image data
    return null;
  }

  return (
    <figure key={imageData.imageFullWidthUpload.id}>
      <img
        loading="lazy"
        src={imageData.imageFullWidthUpload.mediaItemUrl}
        alt={imageData.imageFullWidthUpload.altText}
      />
    </figure>
  );
};

export default ImageFrame;