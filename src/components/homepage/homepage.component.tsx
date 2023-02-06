import { graphql,useStaticQuery } from "gatsby"
import React from "react"
import ContributorsList from "../contributorsList/contributorList.component"
import IssuesList from "../issuesList/issuesList.component"

const HomePage: React.FC = () => {
  const homePageData = useStaticQuery(graphql`
  query hpd {
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
        <h1>{homePageData.wpPage.title}</h1>
        <div  dangerouslySetInnerHTML={{__html: homePageData.wpPage.content }} />
      </section>
      <section id="contributors">
        <h1>Contributors</h1>
        <p>Meet our contributors.</p>
        <ContributorsList />
      </section>
      <section id="issues">
        <h1>Issues</h1>
        <p>Check out our issues.</p>
        <IssuesList />
      </section>
    </>
  )
}

export default HomePage