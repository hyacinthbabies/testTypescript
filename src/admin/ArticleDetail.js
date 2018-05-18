import React from "react";
import { Input, List, Avatar, Spin, Form, Button, Icon } from "antd";
import ApiUtil from "utils/api";
import { formatMsgTime } from "utils/util";
const Search = Input.Search;
const FormItem = Form.Item;
class ArticleDetail extends React.Component {
  state = {
    newsDetail: {}, //新闻详情
    commentList: [], //评论
    currentId: "",
    loading: false
  };

  componentDidMount() {
    const { params: { id } } = this.props.match;
    if (id) {
      this.getArticleDetail(id);
    }
  }

  //查询详情
  getArticleDetail = id => {
    this.setState({ currentId: id, loading: true });
    ApiUtil({ newsId: id }, `/news/detail`, "GET").then(res => {
      //查询评论
      this.getArticleComment(id);
      this.setState({ newsDetail: res.data, loading: false });
      $("#content").html(res.data.content);
    });
  };

  //查询评论
  getArticleComment = id => {
    this.setState({ currentId: id, loading: true });
    ApiUtil({ newsId: id }, `/news/review/list`, "GET").then(res => {
      this.setState({ commentList: res.data, loading: false });
    });
  };

  //查询新闻列表
  getData = callback => {
    ApiUtil({}, "/news/list", "GET").then(res => {
      this.setState({
        loading: false,
        commentList: res.data
      });
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values["comment"] && values["comment"].trim() !== "") {
          this.setState({ loading: true });
          const { params: { id } } = this.props.match;
          let params = {
            newsId: id,
            content: values["comment"],
            addUserId: localStorage.getItem("userId")
          };
          ApiUtil(params, `/news/review/edit`).then(res => {
            //查询评论
            this.getArticleComment(id);
            this.setState({ loading: false });
          });
        } else {
          console.log("不能为空");
        }
      }
    });
  };

  //检查是否登录
  onFocus = () => {
    if (localStorage.getItem("userId") == "undefined") {
      this.props.history.push("/login");
    }
  };

  render() {
    const { newsDetail, commentList, currentId, Comment, loading } = this.state;
    const { getFieldDecorator } = this.props.form;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <div className="content-container" style={{ width: "100%" }}>
        <div className="publish-detail">
          <Spin spinning={loading}>
            {/* 新闻详情 */}
            <h1 className="news-title">{newsDetail.title}</h1>
            <div className="article-sub">
              <span>{newsDetail.addUserName}</span>
              <span>
                {formatMsgTime(
                  newsDetail.addTime ? newsDetail.addTime : new Date()
                )}
              </span>
            </div>
            <div id="content" />
            {/* 评论 */}
            <div className="comment-box">
              <div className="comment-title">评论</div>
              <div className="comment-form">
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator("comment")(
                      <Input.TextArea
                        rows={4}
                        placeholder="说说你的看法"
                        onFocus={this.onFocus}
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ float: "right" }}
                    >
                      评论
                    </Button>
                  </FormItem>
                </Form>
              </div>
              <div className="comment-content">
                <List
                  itemLayout="horizantal"
                  dataSource={commentList}
                  renderItem={item => (
                    <List.Item
                      key={item.title}
                      // title={"管理员"}
                      actions={
                        [
                          // <IconText type="dislike" text="隐藏" />
                          // <IconText
                          //   type="clock-circle-o"
                          //   text={formatMsgTime(new Date())}
                          // />
                        ]
                      }
                    >
                      <List.Item.Meta
                        title={<a>{"管理员"}</a>}
                        description={item.content}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Spin>
        </div>
      </div>
    );
  }
}
export default Form.create()(ArticleDetail);
