import React from "react";
import { Link } from "gatsby";
import { v4 as uuidv4 } from 'uuid';
interface SingleIssueProps {
  singleData: {
    id: string;
    featuredImage: {
      node: {
        mediaItemUrl: string;
        altText: string;
        id: string;
      };
    };
    uri: string;
    title: string;
    issuePages: {
      issueDetails: string;
      issueContributors: {
        contributorName: {
          uri: string;
          id: string;
          title: string;
        };
      }[];
      purchasePopUpInformationText: string;
      linkToShop: {
        url: string;
        target: string;
        title: string;
      };
    };
  };
}

const SingleIssue: React.FC<SingleIssueProps> = ({ singleData }) => {
  return (
    <section className="issueContainer" key={uuidv4()}>
      <img
        src={singleData.featuredImage.node.mediaItemUrl}
        alt={singleData.featuredImage.node.altText}
        id={singleData.featuredImage.node.id}
      />
      <section className="issueDetails">
        <Link to={singleData.uri} key={uuidv4()}>{singleData.title}</Link>
        <div
          dangerouslySetInnerHTML={{
            __html: singleData.issuePages.issueDetails,
          }}
        />
        <div className="issueContributors">
          <span>Featuring Works By:</span>
          {singleData.issuePages.issueContributors.map(
            ({
              contributorName: { uri, id, title },
            }: {
              contributorName: {
                uri: string;
                id: string;
                title: string;
              };
            }) => {
              return (
                <Link to={uri} id={id} key={uuidv4()}>
                  {title}
                </Link>
              );
            }
          )}
        </div>
      </section>
      <section className="issuePurchaseDetails">
        <div key={uuidv4()}
          dangerouslySetInnerHTML={{
            __html: singleData.issuePages.purchasePopUpInformationText,
          }}
        />
        <a key={uuidv4()}
          href={singleData.issuePages.linkToShop.url}
          target={singleData.issuePages.linkToShop.target}
        >
          {singleData.issuePages.linkToShop.title}
        </a>
      </section>
    </section>
  );
};

export default SingleIssue;
