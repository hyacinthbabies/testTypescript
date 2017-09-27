/**
 * 接口返回
 */
export class ApiResponse {
    success: boolean;
    code: string;
    message: string;
    data: any;

    constructor(success: boolean, code: string, message: string, data: any) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

export class ApiError extends Error {
  code: string;
  message: string;
  name: string = "ApiError";

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export class TheResponse {
  status: string;
  length: number;
  data: any;
  message:string;
}

class RequestOption implements RequestInit {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: any;
  body?: any;
  mode?: "navigate" | "same-origin" | "no-cors" | "cors";
  cache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache";
}

export const request = (url: string,para:any): Promise<ApiResponse> => {
    return new Promise<ApiResponse>(((resolve, reject) => {
        const headers = new Headers();
        const option = new RequestOption();
        let paramsArray:Array<Object> = [];
        //拼接参数
        Object.keys(para).forEach(key => paramsArray.push(key + '=' + para[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
        fetch("http://wxapi.nongfenqi.com"+url, option)
        .then((result: Response) => {
            if (result.status === 200 && result.json) {
                return result.json();
            } else {
                const errorResponse = new TheResponse();
                errorResponse.status = "error";
                errorResponse.message = "请求失败";
                return errorResponse;
            }
        })
        .then((r: TheResponse) => {
            if (r.status === "success") {
            resolve(new ApiResponse(r.status === "success", r.status, r.message, r.data));
            } else {
            reject(new ApiError(r.status, r.message));
            }
        })
        .catch((error: Error) => {
            reject(new ApiError("error", error.message));
        })
    }));
}