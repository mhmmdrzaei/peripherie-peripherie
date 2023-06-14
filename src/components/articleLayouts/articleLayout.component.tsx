import React from "react";
import SinglePageArticle from "../singlePageArticle/singlePageArticle.component";
import MultiPageArticle from "../multiPageArticle/multiPageArticle.component";
import ContributorsArticles from "../contributorsArticles/contributorsArticles.component";
import { v4 as uuidv4 } from 'uuid'; 

interface Article {
    id: string;
    title: string;
    articleFields: {
      pageLayout: string;
      pageLayoutFields: any;
      multiPageLayout: any;
    }
  }
  
  interface Props {
    listingOfArticles: Article;
  }
  
  const ArticleLayout: React.FC<Props> = ({listingOfArticles}) => {
    return (
      <article key={listingOfArticles.id} className="singleArticle">
        <h2 dangerouslySetInnerHTML={{ __html: listingOfArticles.title }} />
        <ContributorsArticles listingOfArticles={listingOfArticles} />
        <section className="postContent">
          {
            listingOfArticles.articleFields.pageLayout === "Single Page" ? (
              <SinglePageArticle key={uuidv4()} listingOfArticles={listingOfArticles.articleFields.pageLayoutFields} />
            ) : listingOfArticles.articleFields.pageLayout === "Multi-Page" ? (
              <MultiPageArticle key={uuidv4()} listingOfArticles={listingOfArticles.articleFields.multiPageLayout} />
            ) : null
          }
        </section>
      </article>
    )
  }
  
  export default ArticleLayout;