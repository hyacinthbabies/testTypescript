/* app/index.tsx */
import * as React from 'react';
import {ICardInfo} from '../interface/cardInfo';
import Constant from "../utils/Constant";
interface ICardList{
    cardInfo:ICardInfo;
    goDelete?:<T>(message:T)=>void;
}
interface appState{

}
class Card extends React.Component<ICardList, appState> {
    constructor(props:any){
        super(props);
        this.state = {
            isDelete:true
        }
    }

    delInfo(infoId:number):void{
        this.props.goDelete("删除成功");
    }

    public render(): JSX.Element{
        const {cardInfo} = this.props;
        return (
        <div className="publish-item">
                <div className="publish-item-content">
                    <div className="publish-header">
                        <div className="publish-header-inner">
                            <div className="avatar avatar-small">
                                <div className="avatar-shadow"></div>
                                <img src={Constant.picUrl+"user-avatar.png"} alt="" />
                                <div className={cardInfo.level==0?"hide":"icon-v-wrap small"}>
                                    <img src={Constant.picUrl + "icon-v.png"} />
                                </div>
                            </div>
                            <div className="text-content">
                                <h4>{cardInfo.userName}</h4>
                                <div className="text-secondary">
                                    <span className="address">{cardInfo.address==undefined?"暂无地址":cardInfo.address}</span>
                                    <b>|</b>
                                    <span className="time">{cardInfo.addTime}</span>
                                </div>
                            </div>
                            <div className="tag-wrap">
                                <div className={cardInfo.type==0?"hide":"tag tag-small tag-primary"} >{cardInfo.type}</div>
                            </div>
                        </div>
                    </div>
                    <div className="publish-content clear-fix">
                        <div className="publish-content-text">
                            <span className="color-primary">{cardInfo.status}</span>{cardInfo.content.length>60?cardInfo.content.substring(0,60) + "..." : cardInfo.content}
                        </div>
                        <div className="publish-content-pic">
                            <div className="publish-pic-group clear-fix">
                                {/*{picListHtml}*/}
                            </div>
                            <div className="pic-num-wrap">
                                <span className={cardInfo.count>=3?"pic-num":"hide"}>共{cardInfo.count}张</span>
                            </div>
                        </div>
                        {
                            this.props.goDelete !=undefined ?
                            <div>
                                <div className="publish-content-actions clear-fix">
                                    <div className="pull-left color-gray">
                                        <div className="actions-item">评论{cardInfo.replyList.length}</div>
                                        <div className="actions-item">赞{cardInfo.praiseCount}</div>
                                    </div>
                                    <div className={this.state.isDelete?"pull-right":"hide"} onClick={this.delInfo.bind(this,cardInfo.userId)}>
                                        <div className="actions-item">
                                            <i className="icon-bg icon-bg-delete"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;