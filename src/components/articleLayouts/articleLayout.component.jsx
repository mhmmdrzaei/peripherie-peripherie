import React from "react";
import SinglePageArticle from "../singlePageArticle/singlePageArticle.component";
import MultiPageArticle from "../multiPageArticle/multiPageArticle.component";
import ContributorsArticles from "../contributorsArticles/contributorsArticles.component";
import { v4 as uuidv4 } from 'uuid';

const ArticleLayout = ({listingOfArticles})=> {

    return (

<article key={listingOfArticles.id}>
        <h2>{listingOfArticles.title}</h2>
        <ContributorsArticles listingOfArticles={listingOfArticles}/>
        <section className="postContent">
        {
            listingOfArticles.articleFields.pageLayout === "Single Page" ? (

                <SinglePageArticle key={uuidv4()} listingOfArticles={listingOfArticles.articleFields.pageLayoutFields}/>
                
            ) : listingOfArticles.articleFields.pageLayout === "Multi-Page" ? (
                <MultiPageArticle key={uuidv4()} listingOfArticles={listingOfArticles.articleFields.multiPageLayout} />
            
            ) : null
        }
         </section>
</article>
                    
    )
}

export default ArticleLayout;