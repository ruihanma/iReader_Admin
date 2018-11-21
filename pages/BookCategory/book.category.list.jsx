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
          <div>
            <span className="btn btn-primary btn-sm" onClick={() => {
              this.toggleModal(true, record)
            }}>编辑</span>
            <Divider type="vertical"/>
            <span className="btn btn-danger btn-sm">删除</span>
          </div>
        )
      }
    ];

    this.state = {
      data: [],
      // 编辑模态窗的状态
      visible: false,
      // 被编辑的数据
      editing: null
    };

    // this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    this.requestData();
  }

  render() {
    const {data, visible, editing} = this.state;
    return (
      <Fragment>
        <Table columns={this.columns} dataSource={data} rowKey={(record) => record._id}/>
        <Modal source={editing} visible={visible} toggleVisible={() => this.toggleModal()}/>
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
  toggleModal(visible, record) {
    this.setState({
      visible,
      editing: record
    });
  }
}

export default BookCategoryListPage;
