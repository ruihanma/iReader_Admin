import React, {Fragment} from "react";
import {Table, Divider, Tag, message, Avatar} from "antd";

// Components
import Modal from "../../../components/Modal";
import UpdateComponent from "./update";


// Utils
import API from "../../../utils/api";
import request from "../../../utils/request";


class BookAuthorListPage extends React.Component {
  static group = "book";
  static keyName = "book.author.list";

  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "头像",
        dataIndex: "avatar",
        key: "avatar",
        render: img => <Avatar size="large" src={"http://localhost:3001" + img}/>
      },
      {
        title: "名字",
        dataIndex: "name",
        key: "name",
        render: (text, record) => {
          return (
            <a href="javascript:;">
              {text}
            </a>
          );
        }
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        render: (text, record) => {
          switch (text) {
            case 0 :
              return <span>女</span>
            case 1 :
              return <span>男</span>
            default :
              return <span>保密</span>
          }
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
      editing: null,
      // 编辑完的数据
      edited: null
    };

    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    this.requestData();
  }

  render() {
    const {data, visible, editing} = this.state;
    return (
      <Fragment>
        <div className="mb-3">
          <button onClick={() => this.setState({visible: true})} className="btn btn-sm btn-primary">添加</button>
        </div>
        <Table columns={this.columns} dataSource={data} rowKey={(record) => record._id}/>
        <Modal source={editing} visible={visible} toggleVisible={this.toggleModal}>
          <UpdateComponent onSubmit={this.toggleModal} source={editing}/>
        </Modal>
      </Fragment>
    )
  }

  // 请求数据
  requestData = () => {
    request(API.base + API.book.author.list)
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
  toggleModal(visible, record, nextRecord) {
    const {data} = this.state;
    this.setState({
      visible,
      editing: record,
    }, () => {
      if (nextRecord && typeof nextRecord === 'object') {
        // console.log('nextRecord', nextRecord);
        this.replaceFilterData(data, nextRecord)
      }

    });
  }

  // 替换被修改的数据
  replaceFilterData(array, data) {
    let _array = array;
    let i = null;
    if (_array && Array.isArray(_array)) {
      i = _array.findIndex(e => {
        return e._id === data._id
      });
      if (i >= 0) {
        _array.splice(i, 1);
        _array.push(data);
        this.setState({data: _array})
      }
      else {
        _array.push(data);
        this.setState({data: _array})
      }
    }
  }
}

export default BookAuthorListPage;
