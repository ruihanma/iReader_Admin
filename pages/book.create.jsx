import React from "react";
import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Rate,Input, Divider
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class BookCreatePage extends React.Component {
    static group = "book";

    static keyName = "book.create";

    constructor(props){
        super(props);


    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                {/*标题*/}
                <FormItem
                    {...formItemLayout}
                    label="标题"
                    hasFeedback
                    validateStatus="validating"
                    help="The information is being validated..."
                >
                    <Input placeholder="I'm the content is being validated" id="validating" />
                </FormItem>

                <Divider dashed />

                {/*分类*/}
                <FormItem
                    {...formItemLayout}
                    label="分类"
                >
                    {getFieldDecorator('select-multiple', {
                        rules: [
                            { required: true, message: 'Please select your favourite colors!', type: 'array' },
                        ],
                    })(
                        <Select mode="multiple" placeholder="Please select favourite colors">
                            <Option value="red">Red</Option>
                            <Option value="green">Green</Option>
                            <Option value="blue">Blue</Option>
                        </Select>
                    )}
                </FormItem>

                <Divider dashed />

                {/*是否开放*/}
                <FormItem
                    {...formItemLayout}
                    label="开放"
                >
                    {getFieldDecorator('open', { valuePropName: 'checked' })(
                        <Switch />
                    )}
                </FormItem>

                <Divider dashed />

                {/*成人*/}
                <FormItem
                    {...formItemLayout}
                    label="R-18"
                >
                    {getFieldDecorator('r18', { valuePropName: 'checked' })(
                        <Switch />
                    )}
                </FormItem>

                <Divider dashed />

                {/*封面*/}
                <FormItem
                    {...formItemLayout}
                    label="封面"
                    extra="longgggggggggggggggggggggggggggggggggg"
                >
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button>
                                <Icon type="upload" /> Click to upload
                            </Button>
                        </Upload>
                    )}
                </FormItem>

                <Divider dashed />

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
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        )}
                    </div>
                </FormItem>

                <FormItem
                    wrapperCol={{ span: 12, offset: 6 }}
                >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>

            </Form>
        )
    }
}
const WrappedBookCreatePage = Form.create()(BookCreatePage);

export default WrappedBookCreatePage;
