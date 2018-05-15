import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./home";
import AdminHome from "./admin";
import ArticleAdd from "./admin/ArticleAdd";
import ArticleList from "./admin/ArticleList";
import ArticleDetail from "./admin/ArticleDetail";
import CommentList from "./admin/CommentList";
import Login from "./admin/Login";
import Register from "./admin/Register";
import NewsDetail from "./home/newsList";
import UserList from "./admin/UserList";
//是否登录
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("userId") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* 管理系统 */}
          <PrivateRoute
            path="/admin"
            component={props => (
              <AdminHome {...props}>
                <PrivateRoute path="/admin/articleAdd" component={ArticleAdd} />
                <PrivateRoute
                  path="/admin/articleList"
                  component={ArticleList}
                />
                <PrivateRoute
                  path="/admin/articleDetail/:id"
                  component={ArticleDetail}
                />
                <PrivateRoute
                  path="/admin/commentList"
                  component={CommentList}
                />
                <PrivateRoute path="/admin/userList" component={UserList} />
              </AdminHome>
            )}
          />
          {/* 管理系统 */}
          <Route
            path="/home"
            component={props => (
              <Home {...props}>
                <Route path="/home/newsList" component={NewsDetail} />
                <Route path="/home/newsDetail/:id" component={ArticleDetail} />
              </Home>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
