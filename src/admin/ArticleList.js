import React from "react";
import { Table, Divider, message } from "antd";
import ApiUtil from "utils/api";
import { Auth } from "component/Authority";
import Permission from "utils/permission";
import { getName, DateFormat } from "utils/util";
import Omit from "component/Omit";

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "文章编号",
        dataIndex: "id"
      },
      {
        title: "标题",
        dataIndex: "title",
        render(text) {
          return <Omit text={text} sizeWord={10} />;
        }
      },
      {
        title: "文章概要",
        dataIndex: "summary",
        render(text) {
          return <Omit text={text} sizeWord={30} />;
        }
      },
      {
        title: "作者名称",
        dataIndex: "addUserName"
      },
      {
        title: "文章日期",
        dataIndex: "addTime",
        render(text) {
          return DateFormat(new Date(text), "yyyy-MM-dd HH:mm:ss");
        }
      },
      {
        title: "文章类型",
        dataIndex: "typeId",
        render: text => {
          return getName(text);
        }
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
              <a onClick={this.onHandleEdit.bind(null, record.id)}>编辑</a>
              <Divider type="vertical" />
              <a onClick={this.getArticalDetail.bind(null, record.id)}>详情</a>
              <Divider type="vertical" />
              <a onClick={this.setHotArticle.bind(null, record)}>设为热点</a>
              <Divider type="vertical" />
              <a onClick={this.deleteArticle.bind(null, record.id)}>删除</a>
              <Divider type="vertical" />
              <a onClick={this.getCommentList.bind(null, record.id)}>
                查看评论
              </a>
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
    this.getArticleList();
  }

  //查询列表
  getArticleList = () => {
    ApiUtil({}, "/news/list").then(res => {
      this.setState({ data: res.data });
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
    ApiUtil({ id }, `/news/delete?userId=${localStorage.getItem("userId")}`)
      .then(res => {
        this.getArticleList();
        message.success("删除成功");
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  //查看评论列表
  getCommentList = id => {
    this.props.history.push(`/admin/commentList`, { id });
  };

  //设为热点新闻
  setHotArticle = record => {
    ApiUtil(
      {},
      `/news/set/hot?newsId=${record.id}&typeId=${
        record.typeId
      }&userId=${localStorage.getItem("userId")}`
    )
      .then(res => {
        this.getArticleList();
        message.success("设置成功");
      })
      .catch(err => {
        message.error("设置失败");
      });
  };

  render() {
    const { loading, data } = this.state;
    return (
      <Auth authId={Permission.NEWS_LIST}>
        <div style={{ width: "100%", margin: "2%" }}>
          <Table columns={this.columns} dataSource={data} />
        </div>
      </Auth>
    );
  }
}

export default ArticleList;
