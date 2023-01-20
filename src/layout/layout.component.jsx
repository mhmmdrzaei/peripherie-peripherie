import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "../header/header.component.jsx"
import Footer from "../footer/footer.component.jsx"
const Layout = ({ children }) => {

  return (
    <>
        <Header />
        <main>{children}</main>
        <Footer /> 
    </>
  )
}

export default Layout