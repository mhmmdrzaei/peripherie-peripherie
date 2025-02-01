import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/layout.component"
import { Seo } from "../components/seo/seo.component"



const NotFoundPage = () => {
  return (
    <Layout>
      <div className="errorPage">
      <h1 >Page Not found! try harder! </h1>
      </div>
      
    </Layout>

  )
}

export default NotFoundPage


export const Head = () => (
  <Seo />
)
