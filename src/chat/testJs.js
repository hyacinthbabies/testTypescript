import * as React from 'react';
import Card from "../component/card";
import {Link} from 'react-router-dom';
import {getInfoList} from "./funcApi";
class Test extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataList:[]
        }
    }

    componentDidMount() {
        getInfoList()
            .then((response) => {
                this.setState({
                    dataList:response.data
                });
            })
            .catch((error) => {
                console.log(error.code, ',', error.name, ',', error.message);
            });
    }

    useJquery(){
        console.log($("#list"));
    }

    render(){
        return (
            <div>
                <div id="list" onClick={this.useJquery}>这里是列表页</div>
                {
                    this.state.dataList.map((list,index)=>{
                        return <Link to={`/detail/${list.id}`} key={index}>
                            <Card cardInfo={list} />
                        </Link>
                    })
                }
            </div>
        )
    }
}

export default Test;