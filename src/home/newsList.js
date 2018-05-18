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
const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
class NewsList extends React.Component {
  state = {
    loading: true,
    data: [],
    hasLogin: false
  };
  componentDidMount() {
    //查询是否登录
    if (localStorage.getItem("userName")) {
      this.setState({ hasLogin: true });
    }
    this.getData("-1");
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
      // const newData = _.dropRightWhile(res.data,{typeId:this.state.keyOfList})
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

  render() {
    const { loading, data, hasLogin } = this.state;
    return (
      <div>
        <Tabs
          tabPosition={"right"}
          type="card"
          style={{ padding: 22, border: "1px solid #e8e8e8" }}
        >
          <TabPane tab="要闻" key="1">
            Content of Tab 1
          </TabPane>
          <TabPane tab="社会" key="2">
            Content of Tab 2
          </TabPane>
          <TabPane tab="娱乐" key="3">
            Content of Tab 3
          </TabPane>
          <TabPane tab="体育" key="4">
            Content of Tab 1
          </TabPane>
          <TabPane tab="军事" key="5">
            Content of Tab 2
          </TabPane>
          <TabPane tab="明星" key="6">
            Content of Tab 3
          </TabPane>
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
                  text={formatMsgTime(item.addTime ? item.addTime : new Date())}
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
      </div>
    );
  }
}

export default NewsList;
