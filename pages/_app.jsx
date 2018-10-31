import React from "react";
import App, { Container } from "next/app";
import CommonLayout from "../components/common-layout";
import "../styles/main.scss";

class MangaApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    };
  }

  componentDidMount() {
    console.log("app component mount");
  }

  render() {
    const { Component, pageProps } = this.props;
    if (["SigninPage"].includes(Component.displayName)) {
      return (
        <Container>
          <Component {...pageProps} />
        </Container>
      );
    }
    return (
      <Container>
        <CommonLayout authComponent={Component}>
          <Component {...pageProps} />
        </CommonLayout>
      </Container>
    );
  }
}

export default MangaApp;
