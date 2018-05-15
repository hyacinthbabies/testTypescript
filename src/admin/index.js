import React from "react";
import { Layout, Menu, Icon, Input, Card, Avatar } from "antd";
import { Link } from "react-router-dom";
import Permission from "utils/permission";
import { isAuth } from "component/Authority";

const { Header, Sider, Content } = Layout;
const Search = Input.Search;
const { Meta } = Card;
const SubMenu = Menu.SubMenu;

class Index extends React.Component {
  state = {
    collapsed: false
  };

  /**
   * 收起菜单栏
   */
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  /**
   * 退出到首页
   */
  logout = () => {
    this.props.history.push("/login");
  };

  /**
   * 点击菜单
   */
  onClickMenu = item => {
    switch (item.key) {
      case "1":
        this.props.history.push("/admin/articleAdd");
        break;
      case "2":
        this.props.history.push("/admin/articleList");
        break;
      case "5":
        this.props.history.push("/admin/userList");
        break;
      // default:
      //     this.props.history.push("/admin/articleAdd");
      //     break;
    }
  };

  render() {
    return (
      <Layout className="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
            onClick={this.onClickMenu}
          >
            {isAuth(Permission.NEWS_LIST) || isAuth(Permission.NEWS_LIST) ? (
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="mail" />
                    <span>文章管理</span>
                  </span>
                }
              >
                {isAuth(Permission.MODIFY_NEWS) ? (
                  <Menu.Item key="1">添加文章</Menu.Item>
                ) : null}
                {isAuth(Permission.NEWS_LIST) ? (
                  <Menu.Item key="2">文章列表</Menu.Item>
                ) : null}
              </SubMenu>
            ) : null}
            {/* <SubMenu key="sub2" title={<span><Icon type="mail" /><span>评论管理</span></span>}> */}
            {/* <Menu.Item key="3"></Menu.Item> */}
            {/* <Menu.Item key="4">评论列表</Menu.Item> */}
            {/* </SubMenu> */}
            {isAuth(Permission.USER_LIST) ? (
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="appstore" />
                    <span>用户管理</span>
                  </span>
                }
              >
                <Menu.Item key="5">用户列表</Menu.Item>
              </SubMenu>
            ) : null}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#fff",
              padding: 0,
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggleCollapsed}
            />
            <span>
              <a style={{ marginRight: 10 }}>
                {localStorage.getItem("userName")}
              </a>
              <a style={{ marginRight: 24 }} onClick={this.logout}>
                退出登录
              </a>
            </span>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              display: "flex",
              background: "#fff",
              minHeight: 280
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default Index;
