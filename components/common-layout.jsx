import React from "react";
import Link from "next/link";
import {Layout, Icon} from "antd";
import CommonMenu from "./common-menu";

const {Header, Sider, Content, Footer} = Layout;

class CommonLayout extends React.Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout style={{minHeight: "100vh"}} id={'components-layout'}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo">
                        <Link as="/analysis" href="/">
                            <a style={{textDecoration: "none"}}>
                                <h1>iReader</h1>
                            </a>
                        </Link>
                    </div>
                    <CommonMenu
                        openKey={this.props.authComponent.keyName}
                        openGroup={this.props.authComponent.group}
                    />
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{margin: "24px 24px", minHeight: 280}}>
                        {this.props.children}
                    </Content>
                    <Footer style={{textAlign: 'center', backgroundColor: '#f5f5f5'}}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default CommonLayout;
