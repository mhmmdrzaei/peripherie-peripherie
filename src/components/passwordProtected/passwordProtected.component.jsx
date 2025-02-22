import React, { useState } from "react";
import SingleIssue from "../singleIssue/singleIssue.component";

const PasswordProtectedIssues = ({ issuesData }) => {
  const [password, setPassword] = useState("");
  const correctPasswords = ["password6", "password4", "password5"]; // array of predetermined passwords

  const handleSubmit = (event) => {
    event.preventDefault();
    if (correctPasswords.includes(password)) {
      setPassword("");
    }
  };

  return (
    <>
      {correctPasswords.includes(password) ? (
        <section className="contributors">
          {issuesData.allWpIssue.nodes.map(
            ({ uri, title, id, featuredImage, issuePages }) => {
              return <SingleIssue singleData={{ uri, title, id, featuredImage, issuePages }} key={id} />;
            }
          )}
        </section>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default PasswordProtectedIssues;