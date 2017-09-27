/* app/index.tsx */
import * as React from 'react';
import * as ReactDOM from "react-dom";
import Router from "./router";
interface IAppProps {}
interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
  public render(): JSX.Element {
    return (
      <div>
        <Router/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))