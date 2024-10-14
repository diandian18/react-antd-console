import { axiosRes } from '@/mock/res';
import { HttpResponse, http } from 'msw';
import { commonInfo, userAdmin } from './login.mock';

export const withAuthMock = [
  http.get('/api/user/mine', async() => {
    const userInfo = userAdmin;
    return HttpResponse.json(axiosRes({
      ...commonInfo,
      ...userInfo,
    }));
  }),
];
