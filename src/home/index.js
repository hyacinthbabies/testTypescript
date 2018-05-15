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
class Index extends React.Component {
  state = {
    hasLogin: false
  };

  componentDidMount() {
    //查询是否登录
    if (localStorage.getItem("userId")) {
      this.setState({ hasLogin: true });
    }
  }

  goOut = () => {
    this.setState({
      hasLogin: false
    });
  };

  goLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    const { hasLogin } = this.state;
    return (
      <div className="news-contanier">
        <div
          style={{
            backgroundColor: "#222",
            padding: 5,
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          {hasLogin ? (
            <span>
              <a style={{ color: "#fff", marginRight: 10 }}>
                {localStorage.getItem("userName")}
              </a>
              <a
                style={{ color: "#fff", marginRight: 10 }}
                onClick={this.goOut}
              >
                退出登录
              </a>
            </span>
          ) : (
            <a
              style={{ color: "#fff", marginRight: 10 }}
              onClick={this.goLogin}
            >
              登录
            </a>
          )}
        </div>
        <Content style={{ margin: "20px 300px" }}>
          {this.props.children}
        </Content>
      </div>
    );
  }
}

export default Index;
