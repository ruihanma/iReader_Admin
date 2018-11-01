import React from "react";
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Input,
  Divider,
  message
} from "antd";

import { getBase64 } from "../../static/utils";

const FormItem = Form.Item;
const { TextArea } = Input;

function beforeUpload(file) {
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJPG && isLt2M;
}

class BookCategoryUpdatePage extends React.Component {
  static group = "book";
  static keyName = "book.category.update";

  constructor(props) {
    super(props);

    this.state = {
      // 背景预览图url
      backgroundUrl: null,
      backgroundList: [],
      // 图标预览url
      iconUrl: null,

      fileList: [],

      imageUrl: null,

      loading: false,
      uploading: false
    };
  }

  // 处理提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  // 处理 file 变化
  handleOnChange = (info, url) => {
    if (info.file && info.fileList.length > 0) {
      // 过滤新的file
      let target = info.fileList.filter(e => {
        return e.uid === info.file.uid;
      });
      // 获取base64用于页面显示图片
      getBase64(target[0].originFileObj, imageUrl => {
        this.state[url] = imageUrl;
        this.setState({
          loading: false
        });
      });
    }
  };

  // 处理 图片上传前
  handleBeforeUpload = (fileList, file) => {
    this.state[fileList] = [file];
    return false;
  };

  handleChange = info => {
    console.log("info", info);
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    const { uploading, backgroundUrl } = this.state;
    const props = {
      action: "",
      onRemove: file => {
        // 移除现有的file
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            backgroundUrl: null,
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        // 设置新的fileList(单个file)
        this.setState({ fileList: [file] });
        return false;
      },
      onChange: info => {
        this.handleOnChange(info, "backgroundUrl");
        // if (info.file && info.fileList.length > 0) {
        //   // 过滤新的file
        //   let target = info.fileList.filter(e => {
        //     return e.uid === info.file.uid;
        //   });
        //   // 获取base64用于页面显示图片
        //   getBase64(target[0].originFileObj, imageUrl =>
        //     this.setState({
        //       backgroundUrl: imageUrl,
        //       loading: false
        //     })
        //   );
        // }
      },
      fileList: this.state.fileList
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        {/*分类名称*/}
        <FormItem {...formItemLayout} label="分类名称">
          {getFieldDecorator("title", {
            validateFirst: true,
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
          })(<Input placeholder="请输入分类名称" id="title" />)}
        </FormItem>

        <Divider dashed />

        {/*图标*/}
        <FormItem {...formItemLayout} label="图标">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="//jsonplaceholder.typicode.com/posts/"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
          </Upload>
        </FormItem>

        <Divider dashed />

        {/*背景图片*/}
        <FormItem {...formItemLayout} label="背景图片">
          {getFieldDecorator("background", {})(
            <Upload {...props}>
              {backgroundUrl ? (
                <img src={backgroundUrl} alt="avatar" />
              ) : (
                <Button>
                  <Icon type="upload" /> Select File
                </Button>
              )}
            </Upload>
          )}
        </FormItem>

        <Divider dashed />

        {/*是否开放*/}
        <FormItem {...formItemLayout} label="开放">
          {getFieldDecorator("open", {
            valuePropName: "checked",
            initialValue: true
          })(<Switch />)}
        </FormItem>

        <Divider dashed />

        {/*排序*/}
        <FormItem
          {...formItemLayout}
          label="排序"
          help="默认100 数值越大越靠后"
        >
          {getFieldDecorator("sort", {
            initialValue: 100
          })(<InputNumber min={1} max={10000} />)}
        </FormItem>

        <Divider dashed />

        {/*简介*/}
        <FormItem {...formItemLayout} label="简介">
          {getFieldDecorator("intro", { initialRows: 4 })(
            <TextArea
              rows={2}
              autosize={{ minRows: 2, maxRows: 4 }}
              placeholder="Autosize height with minimum and maximum number of lines"
            />
          )}
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedBookCategoryUpdatePage = Form.create()(BookCategoryUpdatePage);

export default WrappedBookCategoryUpdatePage;
