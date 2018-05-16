import React from "react";
import { Table, Divider, message } from "antd";
import ApiUtil from "utils/api";

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "文章编号",
        dataIndex: "_id"
      },
      {
        title: "评论内容",
        dataIndex: "articleName"
      },
      {
        title: "作者名称",
        dataIndex: "authorName"
      },
      {
        title: "文章日期",
        dataIndex: "articleDate"
      },
      {
        title: "文章类型",
        dataIndex: "articleType"
      },
      {
        title: "操作",
        render: record => {
          return (
            <span>
              <a onClick={this.deleteArticle.bind(null, record._id)}>删除</a>
            </span>
          );
        }
      }
    ];
  }
  state = {
    loading: false,
    data: [] //表格数据
  };

  componentDidMount() {
    const { state } = this.props.location;
    if (state && state.id) {
      this.getCommentList(state.id);
    }
  }

  //获取评论列表
  getCommentList = id => {
    let param = {
      newsId: id
    };
    //查询列表
    ApiUtil(param, "/news/review/list", "GET").then(res => {
      this.setState({ data: res.data });
    });
  };

  deleteArticle = id => {
    ApiUtil({ articleId: id }, "/api/removeArticle").then(res => {
      this.getCommentList();
      message.success("删除成功");
    });
  };

  render() {
    const { loading, data } = this.state;

    return (
      <div style={{ width: "100%" }}>
        <Table columns={this.columns} dataSource={data} />
      </div>
    );
  }
}

export default CommentList;
