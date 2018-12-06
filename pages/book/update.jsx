import React from "react";
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Input, Divider
} from 'antd';

// Utils
import API from "../../utils/api";
import request from "../../utils/request";
import {message} from "antd/lib/index";

// Data
import Countries from "../../static/assets/countries"
import {ALLOW_IMAGE_FORMAT_LIST, ALLOW_IMAGE_SIZE} from "../../utils/config";
import {GET_BASE64} from "../../utils";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {TextArea} = Input;

class BookCreatePage extends React.Component {
  static group = "book";

  static keyName = "book.update";

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      authors: [],

      // 图标预览url
      thumbnailUrl: this.props.source && this.props.source.thumbnail ? "http://localhost:3001" + this.props.source.thumbnail : null,
      thumbnailList: [],

      // 用户编辑的元数据
      source: this.props.source ? this.props.source : null
    }

    console.log("book.update.props", this.props);

  }

  componentDidMount() {
    this.requestAuthor();
    this.requestCategory();
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    // 获取元数据
    const {source} = this.state;
    const {getFieldDecorator} = this.props.form;
    const {thumbnailUrl, thumbnailList} = this.state;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    // 头像图片的属性
    const thumbnailProps = {
      initialValue: thumbnailUrl,
      action: "",
      name: "thumbnail",
      listType: "picture-card",
      className: "thumbnail-uploader",
      showUploadList: false,
      onRemove: file => {
        this.handleOnRemove(file, thumbnailList, thumbnailUrl, "thumbnailList", "thumbnailUrl");
      },
      beforeUpload: file => {
        this.handleBeforeUpload(file, "thumbnailList");
        // !!! 阻止自动上传 !!!
        return false;
      },
      onChange: info => {
        this.handleOnChange(info, "thumbnailUrl");
      },
      fileList: this.state.thumbnailList
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        {/*标题*/}
        <FormItem {...formItemLayout} label="作品名称">
          {getFieldDecorator("title", {
            validateFirst: true,
            initialValue: source && source.title ? source.title : null,
            rules: [
              {
                required: true,
                message: "必需填写作品名称"
              },
              {
                max: 50,
                message: "名称最长为50位"
              }
            ]
          })(<Input placeholder="请输入作品名称" id="title"/>)}
        </FormItem>

        <Divider dashed/>

        {/*作者*/}
        <FormItem
          {...formItemLayout}
          label="作者"
        >
          {getFieldDecorator('authors', {
            initialValue: source && source.authors ? source.authors : [],
            rules: [
              {required: true, message: '必选一个作者', type: 'array'},
            ],
          })(
            <Select mode="multiple"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="请选择作者">
              {
                this.state.authors && this.state.authors.length &&
                this.state.authors.map((item, i) => {
                  return <Option key={i} value={item._id}>{item.name}</Option>
                })
              }
            </Select>
          )}
        </FormItem>

        <Divider dashed/>

        {/*分类*/}
        <FormItem
          {...formItemLayout}
          label="分类"
        >
          {getFieldDecorator('categories', {
            initialValue: source && source.categories ? source.categories : [],
            rules: [
              {required: true, message: '分类必选', type: 'array'},
            ],
          })(
            <Select mode="multiple"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="请选择分类">
              {
                this.state.categories && this.state.categories.length &&
                this.state.categories.map((item, i) => {
                  return <Option key={i} value={item._id}>{item.title}</Option>
                })
              }
            </Select>
          )}
        </FormItem>

        <Divider dashed/>

        {/*地区*/}
        <FormItem
          {...formItemLayout}
          label="地区"
        >
          {getFieldDecorator('origins', {
            initialValue: source && source.origins ? source.origins : [],
            rules: [
              {required: true, message: 'Please select your favourite colors!', type: 'array'},
            ],
          })(
            <Select mode="multiple"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="Please select favourite colors">
              {
                Countries && Countries.length &&
                Countries.map((item, i) => {
                  return <Option key={i} value={item.code}>{item.name}</Option>
                })
              }
            </Select>
          )}
        </FormItem>

        <Divider dashed/>

        {/*是否开放*/}
        <FormItem
          {...formItemLayout}
          label="开放"
        >
          {getFieldDecorator('open', {
            valuePropName: 'checked',
            initialValue: source && source.open ? source.open : true
          })(
            <Switch/>
          )}
        </FormItem>

        <Divider dashed/>

        {/*成人*/}
        <FormItem
          {...formItemLayout}
          label="R-18"
        >
          {getFieldDecorator('r18', {
            valuePropName: 'checked',
            initialValue: source && source.open ? source.open : true
          })(
            <Switch/>
          )}
        </FormItem>

        <Divider dashed/>

        {/*封面*/}
        <FormItem {...formItemLayout} label="封面">
          {getFieldDecorator("thumbnail", {})(
            <Upload {...thumbnailProps}>
              {thumbnailUrl ? <img src={thumbnailUrl} alt="thumbnail"/> : this.ButtonUpload()}
            </Upload>
          )}
        </FormItem>

        <Divider dashed/>

        {/*排序*/}
        <FormItem
          {...formItemLayout}
          label="排序"
          help="默认100 数值越大越靠后"
        >
          {getFieldDecorator("sort", {
            initialValue: source && source.sort ? source.sort : 100,
          })(<InputNumber min={1} max={10000}/>)}
        </FormItem>

        <Divider dashed/>

        {/*简介*/}
        <FormItem {...formItemLayout} label="简介">
          {getFieldDecorator("intro", {
            initialValue: source && source.intro ? source.intro : null,
            initialRows: 4
          })(
            <TextArea
              rows={2}
              autosize={{minRows: 2, maxRows: 4}}
              placeholder="请输入简介"
            />
          )}
        </FormItem>

        <Divider dashed/>

        {/*图片组*/}
        <FormItem
          {...formItemLayout}
          label="内容"
        >
          <div className="dropbox">
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox"/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            )}
          </div>
        </FormItem>

        <FormItem
          wrapperCol={{span: 12, offset: 6}}
        >
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>

      </Form>
    )
  }

  // 页面方法 //////////////////////////////////////////////////////////
  // - 处理提交
  handleSubmit = e => {
    e.preventDefault();
    const {source} = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        if (this.state.source && this.state.source._id) {
          Object.assign(values, {id: source._id})
        }

        // 处理作者
        // values.authors = this.arrayIdToValue(values.authors, this.state.authors);
        // values.authors = this.arrayIdToObjectId(values.authors, this.state.authors);
        // 处理分类
        // values.categories = this.arrayIdToObjectId(values.categories, this.state.categories);
        // values.categories = this.arrayIdToObjectId(values.categories, this.state.categories);

        // 处理图片
        if (values.thumbnail && values.thumbnail.fileList) {
          values.thumbnail = values.thumbnail.fileList[0].originFileObj;
        }
        else {
          values.thumbnail = source && source.thumbnail ? source.thumbnail : ''
        }

        // 设置图片的存储路径
        values.thumbnailPath = "/book/thumbnail";
        console.log("Received values of form: ", values);
        // return
        request(API.base + API.book.update, {
          method: "POST",
          body: values
        })
          .then(res => {
            console.log("res", res);
            if (res.status === 200) {
              message.success(res.message);
              this.props.onSubmit(false, null, res.content)
              // setTimeout(() => {
              //   window.location.reload()
              // }, 1500)
            } else {
              message.error(res.message);
            }
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  // - 处理 file 变化
  handleOnChange = (info, url) => {
    if (info.file && info.fileList.length > 0) {
      if (this.testFile(info.file)) {
        // 过滤新的file
        let target = info.fileList.filter(e => {
          return e.uid === info.file.uid;
        });
        // 获取base64用于页面显示图片
        GET_BASE64(target[0].originFileObj, imageUrl => {
          this.state[url] = imageUrl;
          this.setState(
            {
              loading: false
            },
            () => {
              console.log(this.state);
            }
          );
        });
      }
    }
  };

  // - 处理 file 上传前
  handleBeforeUpload = (file, fileList) => {
    // 设置新的fileList(单个file)
    if (this.testFile(file, true)) {
      this.state[fileList] = [file];
    }
  };

  // 处理 file 移除
  handleOnRemove = (file,
                    targetList,
                    target,
                    targetListVariate,
                    targetVariate) => {
    // 移除现有的file
    const index = targetList.indexOf(file);
    const newFileList = targetList.slice();
    newFileList.splice(index, 1);
    this.state[targetListVariate] = newFileList;
    this.state[targetVariate] = null;
  };

  // 检测图片是否符合要求
  testFile = (file, silence) => {
    const isFormated = ALLOW_IMAGE_FORMAT_LIST.includes(file.type);
    if (!isFormated) {
      if (silence) {
        message.error(
          "图片格式错误!允许的格式为：" + ALLOW_IMAGE_FORMAT_LIST.join(",")
        );
      }
      return false;
    }
    const isLt = file.size < ALLOW_IMAGE_SIZE;
    if (!isLt) {
      if (silence) {
        message.error(
          "Image must smaller than " + ALLOW_IMAGE_SIZE / 1024 / 1024 + "MB!"
        );
      }
      return false;
    }
    return true;
  };

  // 请求分类
  requestCategory = () => {
    request(API.base + API.book.category.list)
      .then(res => {
        console.log("res", res);
        if (res.status === 200) {
          message.success(res.message);

          this.setState({
            categories: res.content
          });
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        message.error(err);
      });
  };

  // 通过id置换对象
  arrayIdToValue = (array, target) => {
    if (array && array.length && target && target.length) {
      let _array = [];
      _.each(array, (id, i) => {
        let tmp = target.filter(e => e._id === id)[0];
        _array.push(tmp);
      });

      return _array
    }
  };

  arrayIdToObjectId = (array, target) => {
    if (array && array.length && target && target.length) {
      let _array = [];
      _.each(array, (id, i) => {
        let tmp = target.filter(e => e._id === id)[0];
        // let obj = {"id": tmp._id};
        let obj = [tmp._id];
        _array.push(obj);
      });
      return _array
    }
  };

  // 请求作者
  requestAuthor = () => {
    request(API.base + API.book.author.list)
      .then(res => {
        console.log("res", res);
        if (res.status === 200) {
          message.success(res.message);

          this.setState({
            authors: res.content
          });
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        message.error(err);
      });
  };

  // Dom组件 //////////////////////////////////////////////////////////
  // - 头像的按钮
  ButtonUpload = () => {
    return (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"}/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
  };
}

const WrappedBookCreatePage = Form.create()(BookCreatePage);

export default WrappedBookCreatePage;
