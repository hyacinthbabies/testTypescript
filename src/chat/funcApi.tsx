import {request,ApiError,ApiResponse} from "../utils/api";
export function getInfoDetailById(id:number){
    return request("/c2c/information/getInformation",{id:id,userId:2704})
}

export function getInfoList(){
    return request("/c2c/information/getInformationList",{type:2,status:1,startIndex:1,pageSize:10,userId:2})
}