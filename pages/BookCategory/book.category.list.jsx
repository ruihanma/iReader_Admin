import React from "react";
import { Table, Divider, Tag, message, Avatar } from "antd";

// Utils
import API from "../../utils/api";
import request from "../../utils/request";

const columns = [
  {
    title: "图标",
    dataIndex: "icon",
    key: "icon",
    render: img => <Avatar size="large" src={"http://localhost:3001" + img} />
  },
  {
    title: "背景图片",
    dataIndex: "background",
    key: "background",
    render: img => (
      <Avatar shape="square" size="large" src={"http://localhost:3001" + img} />
    )
  },
  {
    title: "分类名称",
    dataIndex: "title",
    key: "title",
    render: (text, record) => {
      const title_en = record.title_en;
      return (
        <a href="javascript:;">
          {text}
          {title_en ? " / " + title_en : ""}
        </a>
      );
    }
  },
  {
    title: "排序",
    dataIndex: "sort",
    key: "sort"
  },
  {
    title: "开放",
    dataIndex: "open",
    key: "open",
    render: (text, record) => {
      let open = record.open;
      return <span>{open ? "开放" : "未开放"}</span>;
    }
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a href="javascript:;">编辑</a>
        <Divider type="vertical" />
        <a href="javascript:;">删除</a>
      </span>
    )
  }
];

class BookCategoryListPage extends React.Component {
  static group = "book";

  static keyName = "book.category.list";

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.requestData();
  }

  render() {
    const { data } = this.state;
    return <Table columns={columns} dataSource={data} />;
  }

  requestData = () => {
    request(API.base + API.book.category.list)
      .then(res => {
        console.log("res", res);
        if (res.status === 200) {
          message.success(res.message);

          this.setState({
            data: res.content
          });
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        message.error(err);
      });
  };
}

export default BookCategoryListPage;
