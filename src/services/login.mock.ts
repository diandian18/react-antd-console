import { axiosRes } from '@/mock/res';
import { HttpResponse, http } from 'msw';

export const commonInfo = {};

export const userAdmin = {
  'userAccount': 'admin',
  'userId': 113488145936665,
  'avatar': '',
  'permissions': [
    'home',
    'home:index',
    'home:grid',
    'profile',
    'nest',
    'error',
  ],
  'accessToken': 'aaaa',
  'refreshToken': 'bbbb',
  'expiration': 1710230387237,
};

export const loginMock = [
  http.post('/api/user/login', async() => {
    const userInfo = userAdmin;
    return HttpResponse.json(axiosRes({
      ...commonInfo,
      ...userInfo,
    }));
  }),
  http.post('/api/user/logout', () => {
    return HttpResponse.json(axiosRes(null));
  }),
];
