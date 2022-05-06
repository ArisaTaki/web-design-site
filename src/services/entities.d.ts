// 在该文件内定义请求参数与响应参数的类型，并且导出，以供全局调用

export interface BaseResponse<T = any> {
  // 返回message
  message: string
  // 状态code：200 success。201 error，之后再细分
  code: number
  data: T
}

export interface LoginInfo {
  email: string;
  password: string;
}

export namespace ApiData {
  // 带有返回值data的情况
  namespace Login {
    interface Params {
      user: LoginInfo
    }

    interface ResponseData extends BaseResponse<ResponseData> {
      _id: string;
      username: string;
      email: string;
      image: string;
      token: string;
    }
    type Response = BaseResponse<ResponseData>;
  }

  namespace GetLoginInfo {
    interface ResponseData extends BaseResponse<ResponseData> {
      _id: string;
      username: string;
      email: string;
      image: string;
      createdAt: string;
      updateAt: string;
    }
    type Response = BaseResponse<ResponseData>;
  }

  // 没有返回值data的情况
  namespace ExampleNotRes {
    interface Params {
      example: string
    }

    type Response = BaseResponse;
  }
}
