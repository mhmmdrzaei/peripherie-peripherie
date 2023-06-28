import React, { useState } from "react"
import Layout from "../components/layout/layout.component"
import HomePage from '../components/homepage/homepage.component'
import './styles.scss'
import { Seo } from "../components/seo/seo.component"

const IndexPage = () => (
  <Layout>
    <HomePage />
  </Layout> 
)

export default IndexPage

export const Head = () => (
  <Seo />
)