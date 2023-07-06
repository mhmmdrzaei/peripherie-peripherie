import React from "react";

interface ContributorConnect {
  id: string;
  title: string;
}

interface Contributor {
  contributorConnect: ContributorConnect[];
}

interface ContributorsList {
  articleFields: {
    contributors: Contributor[];
  };
}

const ContributorsArticles: React.FC<{ listingOfArticles: ContributorsList }> = ({listingOfArticles}) => {
  return (
    <div className="contributors">
      {listingOfArticles.articleFields.contributors.map((contributor) => {
        if (listingOfArticles.articleFields.contributors.length === 1) {
          return <p key={contributor.contributorConnect[0].id}>{contributor.contributorConnect[0].title}</p>
        } else {
          return (
            contributor.contributorConnect.map((each) => {
              return <p key={each.id}>{each.title}</p>
            })
          )
        }
      })}
    </div>
  )
}

export default ContributorsArticles;
