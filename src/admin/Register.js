import React from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import ApiUtil from "utils/api";
const FormItem = Form.Item;

class Register extends React.Component {
  //注册表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const param = {
          name: values["userName"],
          password: values["password"],
          phone: values["phone"]
        };
        ApiUtil(param, "user/register").then(res => {
          message.success("注册成功,现在登录！");
          const param = {
            phone: values["userName"],
            password: values["password"]
          };
          ApiUtil(param, "user/login").then(res => {
            localStorage.setItem("userId", res.id);
            //权限
            localStorage.setItem("auth", res);
            this.props.history.push("/admin/articleAdd");
            message.success("登录成功");
          });
        });
      }
    });
  };

  //确认密码验证
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("2次输入不一致");
    } else {
      callback();
    }
  };

  //去注册
  goLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 23,
          offset: 1
        }
      }
    };
    return (
      <div className="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <p className="login-title">注册界面</p>
          <FormItem {...formItemLayout} label="姓名：">
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "请输入姓名!" }]
            })(<Input placeholder="请输入姓名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="密码：">
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码!" }]
            })(<Input type="password" placeholder="请输入密码" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="确认密码：">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "请确认你的密码!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input
                type="password"
                onBlur={this.handleConfirmBlur}
                placeholder="请确认密码"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="手机号：">
            {getFieldDecorator("phone")(<Input placeholder="请输入手机号" />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <a className="login-form-register" onClick={this.goLogin}>
              已有账户，去登录
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              注册
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Register);
