import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = ()=> {
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
