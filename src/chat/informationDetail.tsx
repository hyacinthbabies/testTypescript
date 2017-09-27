import * as React from 'react';
import Card from "../component/card";
import {request,ApiError,ApiResponse} from "../utils/api";
import {ICardInfo} from '../interface/cardInfo';
import {getInfoDetailById} from "./funcApi";
import Test from "./testJs";
class Detail extends React.Component<any, any> {
    constructor(props:any){
        super(props);
        this.state={
            dataDetail:null
        }
    }

    componentDidMount() {
        getInfoDetailById(this.props.match.params.id)
        .then(function(response: ApiResponse){
            this.setState({
                dataDetail:response.data
            });          
        }.bind(this))
        .catch((error: ApiError) => {
            console.log(error.code, ',', error.name, ',', error.message);
        });
    }

    delInfo(result:string):void{
        alert(result);
    }
    render() {
    const {dataDetail} = this.state;
    return (
        <div>
            <div>这里是详情页</div>
            <Test/>
            {
                dataDetail?
                     <Card cardInfo={dataDetail} goDelete={this.delInfo.bind(this)}/>
                     :
                     null
            }
          </div>
       )
    
    }
}

export default Detail;