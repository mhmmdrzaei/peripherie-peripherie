import { graphql, useStaticQuery } from "gatsby";

interface SiteMetadata {
  title: string;
  description: string;
  image: string;
  siteUrl: string;
  seoImage: any;
}

export const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          image
          siteUrl
          seoImage
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
