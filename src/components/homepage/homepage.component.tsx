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
        <div className=" homepageInfo container">
        
        <div  className="" dangerouslySetInnerHTML={{__html: homePageData.wpPage.content }} /> 
        <a  className="button" href="#issues">More &#x2193;</a>
        </div>
      </section>
      <section id="issues">
        <IssuesList />
      </section>
      <section id="contributors">
        <h1>Contributors</h1>
        <ContributorsList />
      </section>
    </>
  )
}

export default HomePage