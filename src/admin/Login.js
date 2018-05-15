import React from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import ApiUtil from "utils/api";
const FormItem = Form.Item;

class Login extends React.Component {
  componentDidMount() {
    localStorage.removeItem("userId");
    this.props.form.setFieldsValue({
      remember: true,
      userName: localStorage.getItem("userName"),
      password: localStorage.getItem("password")
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const param = {
          phone: values["userName"],
          password: values["password"]
        };
        ApiUtil(param, "user/login")
          .then(res => {
            //如果选择记住密码，则存到localstorage中
            if (values["remember"]) {
              localStorage.setItem("userName", values["userName"]);
              localStorage.setItem("password", values["password"]);
            } else {
              localStorage.removeItem("userName");
              localStorage.removeItem("password");
            }
            localStorage.setItem("userId", res.id);
            //权限
            localStorage.setItem("auth", res);
            this.props.history.push("/admin/articleAdd");
            message.success("登录成功");
          })
          .catch(err => {
            message.error("用户名或者密码错误");
          });
      }
    });
  };

  //去注册
  goRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <p className="login-title">登录界面</p>
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "请输入姓名!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入姓名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="请输入密码"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>自动登录</Checkbox>)}
            <a className="login-form-register" onClick={this.goRegister}>
              注册
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Login);
