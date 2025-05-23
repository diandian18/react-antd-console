import { axiosRes } from '@/mock/res';
import { HttpResponse, http } from 'msw';

export const commonInfo = {
  'tenants': [
    {
      'tenantId': 579060455820991,
      'tenantName': 'react-antd-console',
      'contactName': '大饼',
      'contactMobile': '18888888888',
      'contactEmail': 'react-antd-console.site',
      'remark': '',
    },
  ],
  'tenantId': 579060455820991,
};

export const userAdmin = {
  'userAccount': 'admin',
  'userId': 113488145936665,
  'avatar': '',
  'roleId': 646037236161085,
  'permissions': [
    'home',
    'home:index',
    'home:alive',
    'home:grid',
    'profile',

    'permission',
    'permission:route',
    'permission:local',
    'permission:local:btn1',
    'permission:local:btn2',

    'router',
    'router:dynamic',
    'router:meta',

    'tablePage',
    'tablePage:tablePage',
    'tablePage:tablePageDetail',
    'tablePage:scrollLoadModeList',
    'tablePage:scrollLoadModeTable',
    'tablePage:extraSearchModel',
    'tablePage:formatSearchModel',
    'tablePage:simpleTablePage',
    'tablePage:tablePageInModal',
    'tablePage:customSearchBtn',

    'nest',
    'error',

    'external',
    'singleSlider',
    'separation',
  ],
  'accessToken': 'aaaa',
  'refreshToken': 'bbbb',
  'expiration': 1710230387237,
};

export const userAssistant = {
  'userAccount': 'assistant',
  'userId': 113488145936661,
  'avatar': '',
  'roleId': 646037236161081,
  'permissions': [
    'home',
    'home:index',

    'profile',

    'permission',
    'permission:local',
    'permission:local:btn1',
  ],
  'accessToken': 'cccc',
  'refreshToken': 'dddd',
  'expiration': 1710230387237,
};

export const loginMock = [
  http.post<{ userAccount: string }>('/api/user/login', async({ request }) => {
    const body = await request.json() as { userAccount: string };
    const userInfo = body?.userAccount === 'admin' ? userAdmin : userAssistant;
    return HttpResponse.json(axiosRes({
      ...commonInfo,
      ...userInfo,
    }));
  }),
  http.post('/api/user/logout', () => {
    return HttpResponse.json(axiosRes(null));
  }),
];
