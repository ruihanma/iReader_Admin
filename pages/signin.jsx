import React from "react";
import SigninForm from "../components/signin-form";

class SigninPage extends React.Component {
  static displayName = "SigninPage";

  render() {
    return (
      <div className="page-wrapper">
        <h1>MangaBread</h1>
        <div className="signin-form">
          <SigninForm />
        </div>
        <style jsx>
          {`
            .page-wrapper {
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background: #f0f2f5;
            }
            .signin-form {
              width: 300px;
              margin-top: 50px;
              margin-bottom: 100px;
            }
          `}
        </style>
        <style global jsx>{`
          body {
            margin: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default SigninPage;
