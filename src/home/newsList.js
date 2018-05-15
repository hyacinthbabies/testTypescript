import React from "react";
import ApiUtil from "utils/api";
import { List, Avatar, Button, Spin, Icon, Tabs, Layout, Menu } from "antd";
const TabPane = Tabs.TabPane;
const { Header, Content } = Layout;
const { SubMenu } = Menu;
import axios from "axios";

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
    loadingMore: false,
    showLoadingMore: true,
    data: [],
    hasLogin: false
  };
  componentDidMount() {
    //查询是否登录
    if (localStorage.getItem("userName")) {
      this.setState({ hasLogin: true });
    }

    this.getData(res => {
      this.setState({
        loading: false,
        data: res.results
      });
    });
  }

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
          name: { last: "zhang" },
          content:
            "Ant Design, a design language for background applications, is refined by Ant UED Team"
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

  //查看新闻详情
  getNewsDetail = id => {
    window.open(`http://localhost:8080/home/newsDetail/${id}`, "_blank");
  };

  render() {
    const {
      loading,
      loadingMore,
      showLoadingMore,
      data,
      hasLogin
    } = this.state;
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
        <List
          itemLayout="vertical"
          size="large"
          loadMore={loadMore}
          dataSource={data}
          renderItem={item => (
            <List.Item
              onClick={this.getNewsDetail.bind(null, item.id)}
              key={item.title}
              actions={[
                <IconText type="dislike-o" text="举报" />,
                <IconText type="message" text="2" />
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                title={<a>{item.name.last}</a>}
                description={item.content}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default NewsList;
