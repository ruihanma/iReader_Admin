import React, {Fragment} from "react";
import {Table, Divider, Tag, message, Avatar} from "antd";

// Components
import Modal from "./book.category.modal"

// Utils
import API from "../../utils/api";
import request from "../../utils/request";


class BookCategoryListPage extends React.Component {
  static group = "book";
  static keyName = "book.category.list";

  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "图标",
        dataIndex: "icon",
        key: "icon",
        render: img => <Avatar size="large" src={"http://localhost:3001" + img}/>
      },
      {
        title: "背景图片",
        dataIndex: "background",
        key: "background",
        render: img => (
          <Avatar shape="square" size="large" src={"http://localhost:3001" + img}/>
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
          <a onClick={() => {
            this.toggleModal(true)
          }}>编辑</a>
          <Divider type="vertical"/>
          <a href="javascript:">删除</a>
      </span>
        )
      }
    ];

    this.state = {
      data: [],
      // 编辑模态窗的状态
      visible: false
    };

    // this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    this.requestData();
  }

  render() {
    const {data, visible} = this.state;
    return (
      <Fragment>
        <Table columns={this.columns} dataSource={data}/>
        <Modal visible={visible} toggleVisible={() => this.toggleModal(visible)}/>
      </Fragment>
    )
  }

  // 请求数据
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

  // 打开模态窗
  toggleModal(visible) {
    this.setState({
      visible
    });
  }
}

export default BookCategoryListPage;
