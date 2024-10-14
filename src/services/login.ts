import request from '@/http';

interface HttpPostLoginReq {
  userAccount: string;
  userPassword: string;
}

interface HttpPostLoginRes {
  userAccount: string;
  userId: number; 
  permissions: string[];
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

/**
 * 登录
 */
export async function httpPostLogin(data: HttpPostLoginReq) {
  return request.post<API.HttpResult<HttpPostLoginRes>>('/user/login', data);
}

/**
 * 登出
 */
export function httpPostLogout() {
  return request.post<API.BaseHttpResult>('/user/logout');
}

