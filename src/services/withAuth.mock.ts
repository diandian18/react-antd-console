import { axiosRes } from '@/mock/res';
import { HttpResponse, http } from 'msw';
import { commonInfo, userAdmin, userAssistant } from './login.mock';

export const withAuthMock = [
  http.get('/api/user/mine', async({ request }) => {
    let token = '';
    // @ts-expect-error entries
    const entries = request.headers.entries();
    for (const [key, value] of entries) {
      if (key === 'authorization') {
        token = (value ?? '').split(' ')[1];
      }
    }
    const userInfo = token === 'aaaa' ? userAdmin : userAssistant;
    return HttpResponse.json(axiosRes({
      ...commonInfo,
      ...userInfo,
    }));
  }),
];
