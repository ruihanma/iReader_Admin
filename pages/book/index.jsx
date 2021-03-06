import React, {Fragment} from "react";
// Main
import {List, Avatar, Icon, Card, Button} from 'antd';
import {message} from "antd/lib/index";
// Request
import API from "../../utils/api";
import request from "../../utils/request";
// Components
import Modal from "../../components/Modal";
import UpdateComponent from "./update";
// Plugins
import _ from "lodash"


const IconText = ({type, text}) => (
  <span>
    <Icon type={type} style={{marginRight: 8}}/>
    {text}
  </span>
);

class BookListPage extends React.Component {
  static group = "book";

  static keyName = "book.list";

  constructor(props) {
    super(props);
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
    this.requestBooks()
  };

  render() {
    const {data, visible, editing} = this.state;
    return (
      <Fragment>
        <div>
          <button onClick={() => {
            this.toggleModal(true, null)
          }} type="button" className="btn btn-sm btn-primary">添加漫画
          </button>
        </div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={data}
          footer={<div><b>ant design</b> footer part</div>}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[
                <IconText type="star-o" text="156"/>,
                <IconText type="like-o" text="156"/>,
                <IconText type="message" text="2"/>,
                <button className="btn btn-sm btn-primary"
                        onClick={() => this.toggleModal(true, item)}
                >编辑</button>,
                <button className="btn btn-sm btn-info"
                        onClick={() => this.toggleModal(true, item)}
                >添加章节</button>
              ]}
              extra={<img height={200} alt="thumbnail"
                          src={item.thumbnail ? "http://localhost:3001" + item.thumbnail : ''}/>}
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.intro}
              />
              {item.content}
            </List.Item>
          )}
        />

        <Modal source={editing} visible={visible} toggleVisible={this.toggleModal}>
          <UpdateComponent onSubmit={this.toggleModal} source={editing}/>
        </Modal>
      </Fragment>

    )
  }

  // 请求书籍
  requestBooks = () => {
    let data;
    const that = this;
    request(API.base + API.book.list)
      .then(res => {
        console.log("res", res);
        if (res.status === 200) {
          message.success(res.message);

          data = res.content;

          return data

        } else {
          message.error(res.message);
        }
      })
      .then(res => {
        that.handlePopulateData(data, "categories");
        that.handlePopulateData(data, "authors");
        return res
      })
      .then(res => {
        this.setState({
          data: data
        }, () => {
          console.log(this.state)
        });
      })
      .catch(err => {
        message.error(err);
      });
  };

  // 处理populate数据
  handlePopulateData(array, column) {
    _.each(array, (item, ii) => {
      let tmp = [];
      _.each(item[column], (val, vi) => {
        tmp.push(val._id);

        if (vi === item[column].length - 1) {
          item["_" + column] = tmp
        }
      });

      if (ii === array.length - 1) {

      }
    })

  }

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
        data["thumbnail"] = data["thumbnail"] !== "" && data["thumbnail"] + "?" + Math.random();
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

export default BookListPage;
