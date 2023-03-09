import React from "react";

interface Image {
  imageFullWidthUpload: {
    id: string;
    mediaItemUrl: string;
    altText: string;
  };
}

const ImageFrame: React.FC<{ imageData: Image }> = ({ imageData }) => {
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