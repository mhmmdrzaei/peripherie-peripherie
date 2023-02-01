import { graphql,useStaticQuery } from "gatsby"
import React from "react"

const HomePage: React.FC = () => {
  const homePage = useStaticQuery(graphql`
  query PagePageByType {
    wpPage(id: {eq: "cG9zdDo3MA=="}) {
      id
      link
      title
      databaseId
      slug
      uri
      content
    }
  }
  
  `)
  return (
    <>
      <section id="home">
        <h1>{homePage.data.wpPage.title}</h1>
        <p>Welcome to the Home page.</p>
      </section>
      <section id="contributors">
        <h1>Contributors</h1>
        <p>Meet our contributors.</p>
      </section>
      <section id="issues">
        <h1>Issues</h1>
        <p>Check out our issues.</p>
      </section>
    </>
  )
}

export default HomePage