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
		  <ul>
			<li>
			  <Link to="/">Home</Link>
			</li>
			<li>
			  <Link to="/#contributors">Contributors</Link>
			</li>
			<li>
			  <Link to="/#issues">Issues</Link>
			</li>
		  </ul>
		</nav>
	  </header>

	)
}
 


export default Header;
