import { useStaticQuery, graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import React from 'react';


const Header = () => {
	const headerData = useStaticQuery(graphql`
	query HeaderQuery {
	  site {
		siteMetadata {
		  title
		}
	  }
	  wpMenu {
		id
		menuItems {
		  nodes {
			id
			uri
			label
		  }
		}
	  }
	}
  `)
	return (
		<header>
			<Link to="/">
			<StaticImage
              src="../../images/logo.svg"
              alt={headerData.site.siteMetadata.title}
              placeholder="blurred"
              height='150'
            />
			</Link>
		<nav>
			  
			  <a href="https://www.peripheralreview.com/">Peripheral Review
			  <StaticImage
              src="../../images/arrow.svg"
              alt={headerData.site.siteMetadata.title}
              placeholder="blurred"
              height='40'
            />
			  
			  </a>

			  <Link to="/#contributors">Contributors</Link>

			  <Link to="/#issues">Issues</Link>

		</nav>
	  </header>

	)
}
 


export default Header;
