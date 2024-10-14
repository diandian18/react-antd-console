import request from '@/http';

interface HttpGetBaseInfoRes {
  userId: number;
  userAccount: string;
  avatar: string;
  permissions: string[];
}

/**
 * 获取个人基本信息
 */
export async function httpGetBaseInfo() {
  return request.get<API.HttpResult<HttpGetBaseInfoRes>>('/user/mine');
}
