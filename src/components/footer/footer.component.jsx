import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

const Footer = ()=>{
	const footerData = useStaticQuery(graphql`
		query footerQuary {
		  site {
		    siteMetadata {
		      title
		    }
		  }
		}


		`)
	return(
		<footer>
		<span>
		© {new Date().getFullYear()} 
          {` `}
          {footerData.site.siteMetadata?.title}</span>
		</footer>
		)
}

export default Footer;