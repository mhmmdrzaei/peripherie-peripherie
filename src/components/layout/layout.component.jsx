import React from "react"
import Header from "../header/header.component"
import Footer from "../footer/footer.component"
import { Seo } from "../seo/seo.component"


const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
export const Head = () => (
  <Seo />
)