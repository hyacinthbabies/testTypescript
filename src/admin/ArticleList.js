import React from "react";
import { Table, Divider, message } from "antd";
import ApiUtil from "utils/api";
import { Auth } from "component/Authority";
import Permission from "utils/permission";

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "文章编号",
        dataIndex: "id"
      },
      {
        title: "文章概要",
        dataIndex: "summary"
      },
      {
        title: "文章内容",
        dataIndex: "content"
      },
      {
        title: "作者名称",
        dataIndex: "addUserName"
      },
      {
        title: "文章日期",
        dataIndex: "addTime"
      },
      {
        title: "文章类型",
        dataIndex: "typeName"
      },
      {
        title: "阅读数量",
        dataIndex: "number"
      },
      {
        title: "操作",
        render: record => {
          return (
            <span>
              <a onClick={this.onHandleEdit.bind(null, record._id)}>编辑</a>
              <Divider type="vertical" />
              <a onClick={this.getArticalDetail.bind(null, record._id)}>详情</a>
              <Divider type="vertical" />
              <a onClick={this.deleteArticle.bind(null, record._id)}>删除</a>
              <Divider type="vertical" />
              <a onClick={this.getCommentList.bind(null, record._id)}>
                查看评论
              </a>
            </span>
          );
        }
      }
    ];
  }
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    data: [] //表格数据
  };

  componentDidMount() {
    // this.getArticleList();
  }

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  //查询列表
  getArticleList = () => {
    ApiUtil({}, "/news/list").then(res => {
      this.setState({ data: res });
    });
  };

  //查询详情
  getArticalDetail = id => {
    this.props.history.push(`/admin/articleDetail/${id}`);
  };

  //修改新闻
  onHandleEdit = id => {
    this.props.history.push(`/admin/articleAdd`, { id });
  };

  //删除新闻
  deleteArticle = id => {
    ApiUtil({ newsId: id }, "/news/delete").then(res => {
      // this.getArticleList();
      message.success("删除成功");
    });
  };

  //查看评论列表
  getCommentList = id => {
    this.props.history.push(`/admin/commentList`, { id });
  };

  render() {
    const { loading, selectedRowKeys, data } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <Auth authId={Permission.NEWS_LIST}>
        <div style={{ width: "100%" }}>
          <Table
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={data}
          />
        </div>
      </Auth>
    );
  }
}

export default ArticleList;