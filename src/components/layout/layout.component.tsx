import React from "react"
import Header from "../header/header.component"
import Footer from "../footer/footer.component"
import { Seo } from "../seo/seo.component"


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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