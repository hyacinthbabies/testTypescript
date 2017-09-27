import * as React from 'react';
import {HashRouter as Router,Route,Switch} from "react-router-dom";
import InformationList from "./chat/informationList";
import InformationDetail from "./chat/informationDetail";

class Routes extends React.Component<any,any> {
    render(){
        return (
        <Router>
          <div>
                <Route path="/list" component={InformationList}/>
                <Route path="/detail/:id"component={InformationDetail} />
            </div>
        </Router>
        );
    }
}

export default Routes;
