import React from "react";
import ApiUtil from "utils/api";
import {
  List,
  Avatar,
  Button,
  Spin,
  Icon,
  Tabs,
  Layout,
  Menu,
  Tag
} from "antd";
import { getName, formatMsgTime } from "utils/util";
import axios from "axios";
import Constant from "utils/constant";
const TabPane = Tabs.TabPane;
const { Header, Content } = Layout;
const { SubMenu } = Menu;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const typeList = [
  {
    id: "0",
    label: "要闻"
  },
  {
    id: "1",
    label: "社会"
  },
  {
    id: "2",
    label: "娱乐"
  },
  {
    id: "3",
    label: "体育"
  },
  {
    id: "4",
    label: "军事"
  },
  {
    id: "5",
    label: "明星"
  }
];
class NewsList extends React.Component {
  state = {
    loading: true,
    data: [],
    hotData: {
      picId: "",
      title: ""
    }, //热点新闻内容
    hasLogin: false
  };
  componentDidMount() {
    //查询是否登录
    if (localStorage.getItem("userName")) {
      this.setState({ hasLogin: true });
    }
    this.getData("-1");
    this.getHotNewsDetail("0");
  }

  //查询新闻列表
  getData = typeId => {
    if (typeId === "-1") {
      typeId = "";
    }
    this.setState({
      loading: true
    });
    ApiUtil({ typeId }, "/news/list").then(res => {
      this.setState({
        loading: false,
        data: res.data
      });
    });
  };

  //查看新闻详情
  getNewsDetail = id => {
    window.open(`http://localhost:8080/home/newsDetail/${id}`, "_blank");
  };

  onHandleComplain = () => {
    console.log("cc");
  };

  //处理列表筛选
  handleListKeyChange = key => {
    this.getData(key);
  };

  //查询热点新闻
  getHotNewsDetail = typeId => {
    ApiUtil({ typeId }, "/news/hot/detail", "GET")
      .then(res => {
        this.setState({
          loading: false,
          hotData: res.data ? res.data : {}
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  onHandleHotNews = id => {
    this.getHotNewsDetail(id);
  };

  render() {
    const { loading, data, hasLogin, hotData } = this.state;
    return (
      <div>
        <Tabs
          tabPosition={"right"}
          type="card"
          onChange={this.onHandleHotNews}
          style={{ border: "1px solid #e8e8e8", height: 340 }}
        >
          {typeList.map(list => {
            return (
              <TabPane tab={list.label} key={list.id}>
                <img
                  src={Constant.IMG_ROOT + "/" + hotData.picId}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                  onClick={this.getNewsDetail.bind(null, hotData.id)}
                />
                <p class="news-hot-title">{hotData.title}</p>
              </TabPane>
            );
          })}
        </Tabs>

        <Tabs
          defaultActiveKey="-1"
          onChange={this.handleListKeyChange}
          style={{ marginTop: 30 }}
        >
          <TabPane tab="全部" key="-1" />
          <TabPane tab="政治" key="0" />
          <TabPane tab="社会" key="1" />
          <TabPane tab="娱乐" key="2" />
          <TabPane tab="体育" key="3" />
          <TabPane tab="军事" key="4" />
          <TabPane tab="明星" key="5" />
          <TabPane tab="其他" key="6" />
        </Tabs>
        <Spin spinning={loading}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  // <a onClick={this.onHandleComplain}>
                  //   <IconText type="dislike-o" text="举报" />
                  // </a>,
                  <IconText
                    type="clock-circle-o"
                    text={formatMsgTime(
                      item.addTime ? item.addTime : new Date()
                    )}
                  />,
                  <IconText type="eye-o" text={item.number ? item.number : 0} />
                ]}
                extra={
                  <img
                    onClick={this.getNewsDetail.bind(null, item.id)}
                    width={150}
                    alt="logo"
                    src={
                      item.picId
                        ? Constant.IMG_ROOT + "/" + item.picId
                        : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    }
                  />
                }
              >
                <List.Item.Meta
                  onClick={this.getNewsDetail.bind(null, item.id)}
                  title={
                    <a>
                      <Tag color="magenta">{getName(item.typeId)}</Tag>
                      {item.title}
                    </a>
                  }
                  description={item.summary}
                />
                {/* {item.content} */}
              </List.Item>
            )}
          />
        </Spin>
      </div>
    );
  }
}

export default NewsList;
