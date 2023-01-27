import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";



const Header = ()=> {


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
	     <h1>{headerData.site.siteMetadata.title}</h1>
	  </Link>
	  <Link to="address/contributors">Contributors</Link>
	
	   
	  </header>
)
}

export default Header;
