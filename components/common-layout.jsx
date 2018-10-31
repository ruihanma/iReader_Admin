import React from "react";
import Link from "next/link";
import { Layout } from "antd";
import CommonMenu from "./common-menu";

const { Header, Sider, Content } = Layout;

class CommonLayout extends React.Component {
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider width={256} style={{ boxShadow: "2px 0 6px rgba(0,21,41,.35)" }}>
          <div className="logo">
            <Link as="/analysis" href="/">
              <a style={{ textDecoration: "none" }}>
                <h1>Manga</h1>
              </a>
            </Link>
          </div>
          <CommonMenu
            openKey={this.props.authComponent.keyName}
            openGroup={this.props.authComponent.group}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 24px", minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
        <style jsx>{`
          .logo {
            height: 64px;
            position: relative;
            line-height: 64px;
            transition: all 0.3s;
            background: #002140;
            overflow: hidden;
            text-align: center;
            h1 {
              color: #fff;
              font-size: 20px;
              font-family: Myriad Pro, Helvetica Neue, Arial, Helvetica,
                sans-serif;
              font-weight: 600;
            }
          }
          .right {
            float: right;
          }
        `}</style>
      </Layout>
    );
  }
}

export default CommonLayout;
