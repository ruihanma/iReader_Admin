import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

class SigninForm extends React.Component {
  render() {
    return (
      <Form>
        <Form.Item>
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="邮箱"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            发送邮件
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default SigninForm;
