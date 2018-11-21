import React, {Component} from "react";
import {
  Form,
  InputNumber,
  Switch,
  Button,
  Upload,
  Icon,
  Input,
  Divider,
  message
} from "antd";
// 工具
import {GET_BASE64} from "../../utils";
// 配置信息
import {ALLOW_IMAGE_FORMAT_LIST, ALLOW_IMAGE_SIZE} from "../../utils/config";
import API from "../../utils/api";
import request from "../../utils/request";

// 插件
import _ from "lodash";

// 定义组件
const FormItem = Form.Item;
const {TextArea} = Input;

class BookCategoryUpdatePage extends React.Component {
  static group = "book";
  static keyName = "book.category.update";

  constructor(props) {
    super(props);

    this.state = {
      // 背景预览图url
      backgroundUrl: this.props.source && this.props.source.background ? "http://localhost:3001" + this.props.source.background : null,
      backgroundList: [],
      // 图标预览url
      iconUrl: this.props.source && this.props.source.icon ? "http://localhost:3001" + this.props.source.icon : null,
      iconList: [],

      loading: false,
      uploading: false,

      // 用户编辑的元数据
      source: this.props.source ? this.props.source : null
    };

    console.log('update.props', this.props)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('update.nextProps', nextProps);
    if (nextProps.source !== this.props.source) {
      this.setState({source: nextProps.source})
    }
  }

  render() {
    // 获取元数据
    const {source} = this.state;
    // 获取属性
    const {getFieldDecorator} = this.props.form;
    const {backgroundUrl, backgroundList, iconUrl, iconList} = this.state;
    // 表单公用格式
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    };
    // 头像图片的属性
    const iconProps = {
      initialValue: iconUrl,
      action: "",
      name: "icon",
      listType: "picture-card",
      className: "avatar-uploader",
      showUploadList: false,
      onRemove: file => {
        this.handleOnRemove(file, iconList, iconUrl, "iconList", "iconUrl");
      },
      beforeUpload: file => {
        this.handleBeforeUpload(file, "iconList");
        // !!! 阻止自动上传 !!!
        return false;
      },
      onChange: info => {
        this.handleOnChange(info, "iconUrl");
      },
      fileList: this.state.iconList
    };
    // 背景图片的属性
    const backgroundProps = {
      initialValue: backgroundUrl,
      name: "background",
      onRemove: file => {
        this.handleOnRemove(
          file,
          backgroundList,
          backgroundUrl,
          "backgroundList",
          "backgroundUrl"
        );
      },
      beforeUpload: file => {
        this.handleBeforeUpload(file, "backgroundList");
        // !!! 阻止自动上传 !!!
        return false;
      },
      onChange: info => {
        this.handleOnChange(info, "backgroundUrl");
      },
      fileList: this.state.backgroundList
    };

    // 渲染Dom
    return (
      <Form onSubmit={this.handleSubmit}>
        {/*分类名称*/}
        <FormItem {...formItemLayout} label="分类名称">
          {getFieldDecorator("title", {
            validateFirst: true,
            initialValue: source && source.title ? source.title : null,
            rules: [
              {
                required: true,
                message: "必需填写分类名称"
              },
              {
                max: 10,
                message: "名称最长为10位"
              }
            ]
          })(<Input placeholder="请输入分类名称" id="title"/>)}
        </FormItem>

        <Divider dashed/>

        {/*分类名称 英文*/}
        <FormItem {...formItemLayout} label="分类英文名称">
          {getFieldDecorator("title_en", {
            validateFirst: true,
            initialValue: source && source.title_en ? source.title_en : null,
            rules: [
              {
                required: true,
                message: "必需填写分类名称"
              },
              {
                max: 50,
                message: "名称最长为50位"
              }
            ]
          })(<Input placeholder="请输入分类的英文名称" id="title_en"/>)}
        </FormItem>

        <Divider dashed/>

        {/*图标*/}
        <FormItem {...formItemLayout} label="图标">
          {getFieldDecorator("icon", {})(
            <Upload {...iconProps}>
              {iconUrl ? <img src={iconUrl} alt="icon"/> : this.ButtonUpload()}
            </Upload>
          )}
        </FormItem>

        <Divider dashed/>

        {/*背景图片*/}
        <FormItem {...formItemLayout} label="背景图片">
          {getFieldDecorator("background", {})(
            <Upload {...backgroundProps}>
              {backgroundUrl ? (
                <img className={"img-thumbnail"} src={backgroundUrl} alt="background"/>
              ) : (
                this.ButtonAdd()
              )}
            </Upload>
          )}
        </FormItem>

        <Divider dashed/>

        {/*是否开放*/}
        <FormItem {...formItemLayout} label="开放">
          {getFieldDecorator("open", {
            valuePropName: "checked",
            initialValue: source && source.open ? source.open : false,
          })(<Switch/>)}
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

        {/*简介*/}
        <FormItem {...formItemLayout} label="英文简介">
          {getFieldDecorator("intro_en", {
            initialValue: source && source.intro_en ? source.intro_en : null,
            initialRows: 4
          })(
            <TextArea
              rows={2}
              autosize={{minRows: 2, maxRows: 4}}
              placeholder="请输入英文简介"
            />
          )}
        </FormItem>

        <FormItem wrapperCol={{span: 12, offset: 6}}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }

  // 页面方法 //////////////////////////////////////////////////////////
  // - 处理提交
  handleSubmit = e => {
    e.preventDefault();
    const {source} = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        if (this.state.source._id) {
          Object.assign(values, {id: source._id})
        }

        // 处理图片
        if (values.icon && values.icon.fileList) {
          values.icon = values.icon.fileList[0].originFileObj;
        }
        else {
          values.icon = source.icon
        }
        if (values.background && values.background.fileList) {
          values.background = values.background.fileList[0].originFileObj;
        }
        else{
          values.background = source.background
        }
        // 设置图片的存储路径
        values.iconPath = "/book/category/icon";
        values.backgroundPath = "/book/category/background";

        console.log("Received values of form: ", values);
        request(API.base + API.book.category.update, {
          method: "POST",
          body: values
        })
          .then(res => {
            console.log("res", res);
            if (res.status === 200) {
              message.success(res.message);
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
  // 页面方法 End //////////////////////////////////////////////////////////

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
  // - 背景的按钮
  ButtonAdd = () => {
    return (
      <Button>
        <Icon type="upload"/> Select File
      </Button>
    );
  };
  // Dom组件 End //////////////////////////////////////////////////////////
}

const WrappedBookCategoryUpdatePage = Form.create()(BookCategoryUpdatePage);

export default WrappedBookCategoryUpdatePage;
