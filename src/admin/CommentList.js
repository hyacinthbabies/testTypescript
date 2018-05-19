import React from "react";
import { Table, Divider, message } from "antd";
import ApiUtil from "utils/api";

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "编号",
        dataIndex: "id"
      },
      {
        title: "新闻编号",
        dataIndex: "newsId"
      },
      {
        title: "评论内容",
        dataIndex: "content"
      },
      {
        title: "作者名称",
        dataIndex: "addUserName"
      },
      {
        title: "文章类型",
        dataIndex: "articleType"
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
