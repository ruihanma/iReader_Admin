import React from "react";
import Link from "next/link";
import {Menu, Icon} from "antd";

const {SubMenu} = Menu;

class CommonMenu extends React.Component {
  render() {
    const {openKey, openGroup} = this.props;
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={[openGroup]}
        defaultSelectedKeys={[openKey]}
      >
        <SubMenu
          key="dashboard"
          title={
            <span>
              <Icon type="dashboard"/>
                <span>Dashboard</span>
            </span>
          }
        >
          <Menu.Item key="analysis">
            <Link prefetch as="/analysis" href="/">
              <a>分析页</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="book"
          title={
            <span>
              <Icon type="book"/>
                <span>漫画</span>
            </span>
          }
        >
          <Menu.Item key="book.list">
            <Link prefetch as={"/books"} href="/book">
              <a>漫画列表</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="book.update">
            <Link prefetch as={"/book/update"} href="/book/update">
              <a>漫画添加</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="book.author.list">
            <Link prefetch as={"/book/authors"} href="/book/author">
              <a>作者列表</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="book.category.list">
            <Link prefetch as={"/book/categories"} href="/book/category">
              <a>分类列表</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="user"
          title={
            <span>
              <Icon type="user"/>
                <span>用户</span>
            </span>
          }
        >
          <Menu.Item key="users">
            <Link prefetch href="/users">
              <a>全部用户</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="admin"
          title={
            <span>
              <Icon type="robot"/>
                <span>管理员</span>
            </span>
          }
        >
          <Menu.Item key="admins">
            <Link prefetch href="/admins">
              <a>管理员列表</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="invite-admin">
            <Link prefetch href="/invite-admin">
              <a>邀请</a>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default CommonMenu;
