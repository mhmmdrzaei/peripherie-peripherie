import React from "react";

const ContributorsArticles = ({listingOfArticles}) => {
    return (
        <div className="contributors">
        {
            listingOfArticles.articleFields.contributors.map((contributor)=> {
            if (listingOfArticles.articleFields.contributors.length === 1) {
                return <p key={contributor.contributorConnect[0].id}>Only one contributor: {contributor.contributorConnect[0].title}</p>
            } else {
                return(
                contributor.contributorConnect.map((each)=> {
                    return <p key={each.id}>{each.title}</p>
                    
                })
                )

            }
            })
        }
        </div>
    )
}
export default ContributorsArticles;