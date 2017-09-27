import {User} from "./user";
import {ReplyList} from "./replyList";
export interface ICardInfo extends User{
    informationId:number;
    type:number;
    address:string;
    addTime:number;
    count?:number;
    picGroupId:string;
    content:string;
    status:number;
    replyList?:Array<ReplyList>;
    praiseCount?:number;
    // (userId:number):void;
}