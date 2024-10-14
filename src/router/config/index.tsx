import type { RouteConfig } from '@/router';
import SvgIcon from '@/components/SvgIcon';

export const routesConfig: RouteConfig[] = [
  {
    path: '/login',
    component: () => import('@/pages/login'),
    name: '登录',
    hidden: true,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: () => import('@/layouts/ConsoleLayout'),
    flatten: true,
    children: [
      {
        path: 'home',
        name: '首页',
        permission: 'home',
        icon: <SvgIcon name="home" />,
        children: [
          {
            path: '',
            redirect: 'index',
          },
          {
            path: 'index',
            component: () => import('@/pages/home'),
            name: '首页',
            permission: 'homeIndex',
            icon: <SvgIcon name="home" />,
          },
          {
            path: 'grid/:id',
            component: () => import('@/pages/grid'),
            name: '栅格布局',
            permission: 'homeGrid',
            icon: <SvgIcon name="grid" />,
          },
        ],
      },
      {
        path: 'profile',
        hidden: true,
        component: () => import('@/pages/profile'),
        name: '个人中心',
        permission: 'profile',
        icon: <SvgIcon name="profile" />,
      },
      {
        path: 'nest',
        component: () => import('@/pages/nest'),
        name: '嵌套路由',
        icon: <SvgIcon name="nest" />,
        permission: 'nest',
        children: [
          {
            path: '', // 或'/layout'，也会生效
            redirect: 'nest1',
          },
          {
            path: 'nest1',
            component: () => import('@/pages/nest/nest1'),
            name: '菜单1',
          },
          {
            path: 'nest2',
            component: () => import('@/pages/nest/nest2'),
            name: '菜单2',
            children: [
              {
                path: '',
                redirect: 'nest2-1',
              },
              {
                path: 'nest2-1',
                component: () => import('@/pages/nest/nest2-1'),
                name: '菜单2-1',
              },
              {
                path: 'nest2-2',
                component: () => import('@/pages/nest/nest2-2'),
                name: '菜单2-2',
                children: [
                  {
                    path: '',
                    redirect: 'nest2-2-1',
                  },
                  {
                    path: 'nest2-2-1',
                    component: () => import('@/pages/nest/nest2-2-1'),
                    name: '菜单2-2-1',
                  },
                  {
                    path: 'nest2-2-2',
                    component: () => import('@/pages/nest/nest2-2-2'),
                    name: '菜单2-2-2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'error-page',
        name: '错误页',
        icon: <SvgIcon name="error" />,
        permission: 'error',
        children: [
          {
            path: '',
            redirect: '403',
          },
          {
            path: '403',
            component: () => import('@/pages/noAccess'),
            name: '403',
            icon: <SvgIcon name="forbidden" />,
          },
          {
            path: '404',
            component: () => import('@/pages/notFound'),
            name: '404',
            icon: <SvgIcon name="not_found" />,
          },
        ],
      },
    ],
  },
  {
    path: '/no-access',
    component: () => import('@/pages/noAccess'),
    name: '出错了',
    hidden: true,
  },
  {
    path: '/not-found',
    component: () => import('@/pages/notFound'),
    name: '页面不存在',
    hidden: true,
  },
  {
    path: '*',
    component: () => import('@/pages/notFound'),
    name: '页面不存在',
    hidden: true,
  },
];

