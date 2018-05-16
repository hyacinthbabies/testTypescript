import React from "react";
import WangEditor from "./wangEditor";
import axios from "axios";
import ApiUtil from "utils/api";
import { Form, Icon, Input, Button, message, Select } from "antd";
import { withRouter } from "react-router";
import { Auth } from "component/Authority";
import Permission from "utils/permission";
const FormItem = Form.Item;
const Option = Select.Option;

/**
 * 新增文章
 */
class ArticleAdd extends React.Component {
  state = {
    loading: false,
    isEdit: false //是否处于编辑状态
  };

  componentDidMount() {
    this.props.form.setFieldsValue({
      type: "0"
    });
    const { state } = this.props.location;
    if (state && state.id) {
      this.getArticleDetail(state.id);
      this.setState({ isEdit: true });
    }
  }

  //编辑页填充数据
  onEditValue = values => {
    this.props.form.setFieldsValue({
      type: values.typeId.toString(),
      title: values.title,
      author: values.addUserName,
      editor: values.content,
      summary: values.summary
    });
    this.handle(values.content);
  };

  //查询详情
  getArticleDetail = id => {
    this.setState({ loading: true });
    ApiUtil({ newsId: id }, `/news/detail`, "GET").then(res => {
      this.onEditValue(res.data);
      this.setState({ loading: false });
    });
  };

  //提交文章
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          title: values["title"],
          summary: values["summary"],
          content: values["editor"],
          typeId: values["type"],
          addUserId: parseInt(localStorage.getItem("userId"))
        };
        if (this.state.isEdit) {
          const { state } = this.props.location;
          params.id = state.id;
          const userId = parseInt(localStorage.getItem("userId"));
          ApiUtil(params, `/news/edit?userId=${userId}`, "POST").then(res => {
            this.setState({ loading: false });
            message.success("修改成功");
          });
        } else {
          params.addTime = new Date();
          ApiUtil(params, `/news/edit`, "POST").then(res => {
            message.success("保存成功");
          });
        }
      }
    });
  };

  onChangeEditor = val => {};

  //改变富文本编辑器内容
  changeTxt = handle => {
    this.handle = handle;
  };

  render() {
    const { isEdit } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 1 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    return (
      <Auth authId={Permission.MODIFY_NEWS}>
        <div style={{ padding: 20, width: "100%" }}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem {...formItemLayout} label="标题">
              {getFieldDecorator("title")(<Input placeholder="请输入标题" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="概要">
              {getFieldDecorator("summary")(
                <Input.TextArea placeholder="请输入新闻概要" rows={4} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="内容">
              {getFieldDecorator("editor")(
                <WangEditor
                  id="wangeditor"
                  onChange={this.onChangeEditor}
                  changeTxt={this.changeTxt}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="类型">
              {getFieldDecorator("type")(
                <Select style={{ width: 200 }} onChange={this.handleChange}>
                  <Option value="0">要闻</Option>
                  <Option value="1">社会</Option>
                  <Option value="2">娱乐</Option>
                  <Option value="3">体育</Option>
                  <Option value="4">军事</Option>
                  <Option value="5">明星</Option>
                </Select>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                {isEdit ? "修改" : "添加"}
              </Button>
            </FormItem>
          </Form>
        </div>
      </Auth>
    );
  }
}

export default Form.create()(withRouter(ArticleAdd));
