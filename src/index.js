import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import "css/base.less";
class App extends React.Component {
  render() {
    return (
      <div>
        <Router />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
