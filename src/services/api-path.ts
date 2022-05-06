const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/mock';

// 请求API路径
export const ApiPaths = {
  login: '/users/login',
  getLoginInfo: '/user',
  exampleNotRes: '/has/example',
};
