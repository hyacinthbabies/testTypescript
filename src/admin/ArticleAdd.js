import React from "react";
import WangEditor from "./wangEditor";
import axios from "axios";
import ApiUtil from "utils/api";
import { Form, Icon, Input, Button, message, Select, Upload } from "antd";
import { withRouter } from "react-router";
import { Auth } from "component/Authority";
import Permission from "utils/permission";
import Constant from "utils/constant";
const FormItem = Form.Item;
const Option = Select.Option;

/**
 * 新增文章
 */
class ArticleAdd extends React.Component {
  state = {
    loading: false,
    imageUrl: "", //
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
      // author: values.addUserName,
      editor: values.content,
      summary: values.summary
    });
    this.setState({
      file: values.picId
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
          addUserId: localStorage.getItem("userId"),
          picId: this.state.imageUrl
        };
        const userId = localStorage.getItem("userId");
        if (this.state.isEdit) {
          const { state } = this.props.location;
          params.id = state.id;
          ApiUtil(params, `/news/edit?userId=${userId}`, "POST").then(res => {
            this.setState({ loading: false });
            message.success("修改成功");
          });
        } else {
          params.addTime = new Date();
          ApiUtil(params, `/news/edit?userId=${userId}`, "POST").then(res => {
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

  beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isLt2M;
  };

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const resUrl = info.file.response.data;
      this.setState({
        imageUrl: resUrl
      });
    }
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
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
            <FormItem {...formItemLayout} label="图片">
              {getFieldDecorator("file")(
                <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader article"
                  showUploadList={false}
                  action={`${Constant.API_ROOT}/file/upload`}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? (
                    <img src={Constant.IMG_ROOT + "/" + imageUrl} alt="" />
                  ) : (
                    uploadButton
                  )}
                </Upload>
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
