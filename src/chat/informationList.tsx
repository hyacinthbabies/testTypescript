import * as React from 'react';
import Card from "../component/card";
import {Link} from 'react-router-dom';
import {request,ApiError,ApiResponse} from "../utils/api";
import {getInfoList} from "./funcApi";
class InformationList extends React.Component<any, any> {
    constructor(props:any){
        super(props);
        this.state={
            dataList:[]
        }
    }

    componentDidMount() {
        getInfoList()
        .then((response: ApiResponse) => {
            this.setState({
                dataList:response.data
            });
        })
        .catch((error: ApiError) => {
            console.log(error.code, ',', error.name, ',', error.message);
        });
    }

    useJquery(){
        console.log($("#list"));
    }

    public render(): JSX.Element{
    return (
        <div>
            <div id="list" onClick={this.useJquery}>这里是列表页</div>
            {
                this.state.dataList.map((list:any,index:number)=>{
                    return <Link to={`/detail/${list.id}`} key={index}>
                                <Card cardInfo={list} />            
                            </Link>
                })
            }
          </div>
       )
    }
}

export default InformationList;