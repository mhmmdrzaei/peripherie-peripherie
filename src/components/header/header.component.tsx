import { useStaticQuery, graphql, Link } from "gatsby";

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
		<nav>
			  <Link to="/"> <h1>{headerData.site.siteMetadata.title}</h1></Link>
			  <a href="https://www.peripheralreview.com/">Peripheral Review</a>

			  <Link to="/#contributors">Contributors</Link>

			  <Link to="/#issues">Issues</Link>

		</nav>
	  </header>

	)
}
 


export default Header;
