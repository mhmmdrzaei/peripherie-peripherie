import React, { FC } from "react";
import { useSiteMetadata } from "../../hooks/use-site-metadata"

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  seoImage?: string;
  children?: any;
}

export const Seo: FC<SEOProps> = ({ title, description, pathname, children }) => {
  const { title: defaultTitle, description: defaultDescription, image, siteUrl, seoImage } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ""}`,
    
  };

  return (
    <>
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seoImage} />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />
      <title>peripherie-peripherie</title>
      <meta name="title" content="peripherie-peripherie" />
      <meta
        name="description"
        content="peripherie-peripherie is an experimental thematic chapbook project produced by Peripheral Review, released bi-annually in Spring/Summer and Fall/Winter."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://peripherie.peripheralreview.com/" />
      <meta property="og:title" content="peripherie-peripherie" />
      <meta
        property="og:description"
        content="peripherie-peripherie is an experimental thematic chapbook project produced by Peripheral Review, released bi-annually in Spring/Summer and Fall/Winter."
      />
      <meta property="og:image" content={seoImage} />

      {children}
    </>
  );
};
