import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { useEffect } from "react"


const IndexPage: React.FC<PageProps> = () => {
  useEffect(() => {
    const sectionId = window.location.pathname.split("/")[1];
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView();
    }
  }, []);
  return (
    <>
    <h1>home</h1>
    <section id="contributors">
      <h1>contributors</h1>
    </section>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
