import React from "react";
import { Input, List, Avatar, Spin, Form, Button, Icon } from "antd";
import ApiUtil from "utils/api";
import { formatMsgTime } from "utils/util";
const Search = Input.Search;
const FormItem = Form.Item;
class ArticleDetail extends React.Component {
  state = {
    data: {}, //新闻详情
    commentDetail: [], //评论
    currentId: "",
    loading: false
  };

  componentDidMount() {
    const { params: { id } } = this.props.match;
    this.getData(res => {
      this.setState({
        loading: false,
        commentDetail: res.results
      });
    });
    $("#content").html(`18、v-if和v-show的共同点和区别（考察频率：中）
    参考官方文档
    都是用来做条件渲染，通过条件控制元素的显示与隐藏。
    v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
    v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
    相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
    一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
    
    作者：Yao_xmu
    链接：https://juejin.im/post/5af3cc4af265da0ba3521028
    来源：掘金
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`);
  }

  //查询详情
  getArticleDetail = id => {
    this.setState({ currentId: id, loading: true });
    ApiUtil({ newId: id }, `/news/detail`).then(res => {
      //查询评论
      this.getArticleComment(id);
      this.setState({ newsDetail: res, loading: false });
      $("#content").html(res.content);
    });
  };

  //查询评论
  getArticleComment = id => {
    this.setState({ currentId: id, loading: true });
    ApiUtil({ newsId: id }, `/news/review/list`).then(res => {
      this.setState({ commentDetail: res, loading: false });
    });
  };

  //查询新闻列表
  getData = callback => {
    // ApiUtil({},"/news/list")
    // .then(res=>{
    //     callback(res);
    // })
    callback({
      results: [
        {
          title: "我是标题",
          id: 1,
          name: { last: "15800948768" },
          content: "弱弱的说一句：感觉这不是中级，是基础吧"
        },
        {
          title: "我是标题",
          id: 2,
          name: { last: "宋宋" },
          content: "弱弱的说一句：感觉这不是中级，是基础吧"
        }
      ]
    });
  };

  onLoadMore = () => {
    this.setState({
      loadingMore: true
    });
    this.getData(res => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          loadingMore: false
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event("resize"));
        }
      );
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values["comment"] && values["comment"].trim() !== "") {
          console.log("不为空");
        } else {
          console.log("不能为空");
        }
      }
    });
  };

  render() {
    const {
      data,
      commentDetail,
      currentId,
      Comment,
      loading,
      loadingMore,
      showLoadingMore
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const loadMore = showLoadingMore ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: 32
        }}
      >
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>加载更多</Button>}
      </div>
    ) : null;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <div className="content-container" style={{ maxWidth: "100%" }}>
        <div className="publish-date" style={{ textAlign: "center" }}>
          <h2>{data.articleName}</h2>
          {/* <h1>发布于：{date}</h1> */}
        </div>
        <div className="publish-detail">
          <Spin spinning={loading}>
            {/* 新闻详情 */}
            <h1 className="news-title">我是新闻标题</h1>
            <div className="article-sub">
              <span>上游新闻</span>
              <span>{formatMsgTime(new Date())}</span>
            </div>
            <div id="content" />
            {/* 评论 */}
            <div className="comment-box">
              <div className="comment-title">评论</div>
              <div className="comment-form">
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator("comment")(
                      <Input.TextArea rows={4} placeholder="说说你的看法" />
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
                  itemLayout="vertical"
                  loadMore={loadMore}
                  dataSource={commentDetail}
                  renderItem={item => (
                    <List.Item
                      key={item.title}
                      title={item.name.last}
                      actions={[
                        <IconText type="dislike" text="隐藏" />,
                        <IconText
                          type="clock-circle-o"
                          text={formatMsgTime(new Date())}
                        />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<span>水水水水</span>}
                        title={<a>{item.name.last}</a>}
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
