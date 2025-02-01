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
		<p>
		© {new Date().getFullYear()} 
          {` `}
          {footerData.site.siteMetadata?.title}, a Peripheral Review Project.</p>
		</footer>
		)
}

export default Footer;