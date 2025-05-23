import type { RouteConfig } from '@/router';
import SvgIconDefault, { Props } from '@/components/SvgIcon';

const SvgIcon: React.FC<Props<SVGSVGElement>> = (props) => {
  return <SvgIconDefault size={18} {...props} />
}

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
            path: 'alive',
            component: () => import('@/pages/alive'),
            name: 'KeepAlive',
            permission: 'homeAlive',
            icon: <SvgIcon name="kun" />,
          },
          {
            path: 'grid',
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
        path: 'permission',
        name: '权限',
        permission: 'permission',
        icon: <SvgIcon name="lock" />,
        children: [
          {
            path: '',
            redirect: 'route',
          },
          {
            path: 'route',
            component: () => import('@/pages/permission/route'),
            name: '路由权限',
            permission: 'routePermission',
            icon: <SvgIcon name="menu" />,
          },
          {
            path: 'local',
            component: () => import('@/pages/permission/local'),
            name: '局部权限',
            permission: 'localPermission',
            icon: <SvgIcon name="btn" />,
          },
        ],
      },
      {
        path: 'router',
        name: '路由',
        permission: 'router',
        icon: <SvgIcon name="route" />,
        children: [
          {
            path: '',
            redirect: 'dynamic',
          },
          {
            path: 'dynamic',
            component: () => import('@/pages/router/dynamic'),
            name: '动态路由',
            permission: 'routerDynamic',
            icon: <SvgIcon name="menu2" />,
          },
          {
            path: 'meta',
            component: () => import('@/pages/router/meta'),
            name: '动态meta',
            permission: 'routerMeta',
            icon: <SvgIcon name="web" />,
          },
        ],
      },
      {
        path: 'table',
        name: '搜索表格',
        permission: 'tablePage',
        icon: <SvgIcon name="search_table" />,
        children: [
          {
            path: '',
            redirect: 'tablePage',
          },
          {
            path: 'tablePage',
            component: () => import('@/pages/tablePage'),
            name: '常见表格',
            permission: 'complexTablePage',
            icon: <SvgIcon name="table" />,
          },
          {
            path: 'tablePage/:id',
            component: () => import('@/pages/tablePage/detail'),
            name: '常见表格详情',
            permission: 'complexTablePageDetail',
            icon: <SvgIcon name="detail" />,
            hidden: true,
          },
          {
            path: 'scrollLoadModeTable',
            component: () => import('@/pages/tablePage/scrollLoadModeTable'),
            name: '滚动加载表格',
            permission: 'scrollLoadModeTable',
            icon: <SvgIcon name="scroll_table" />,
          },
          {
            path: 'scrollLoadModeList',
            component: () => import('@/pages/tablePage/scrollLoadModeList'),
            name: '滚动加载列表',
            permission: 'scrollLoadModeList',
            icon: <SvgIcon name="scroll_list" />,
          },
          {
            path: 'extraSearchModel',
            component: () => import('@/pages/tablePage/extraSearchModel'),
            name: '额外参数',
            permission: 'extraSearchModel',
            icon: <SvgIcon name="extra_model" />,
          },
          {
            path: 'formatSearchModel',
            component: () => import('@/pages/tablePage/formatSearchModel'),
            name: '格式化搜索参数',
            permission: 'formatSearchModel',
            icon: <SvgIcon name="format" />,
          },
          {
            path: 'simpleTablePage',
            component: () => import('@/pages/tablePage/simpleTablePage'),
            name: '简单表格',
            permission: 'simpleTablePage',
            icon: <SvgIcon name="table_simple" />,
          },
          {
            path: 'tablePageInModal',
            component: () => import('@/pages/tablePage/tablePageInModal'),
            name: '弹窗内使用',
            permission: 'tablePageInModal',
            icon: <SvgIcon name="dialog" />,
          },
          {
            path: 'customSearchBtn',
            component: () => import('@/pages/tablePage/customSearchBtn'),
            name: '自定义搜索按钮',
            permission: 'customSearchBtn',
            icon: <SvgIcon name="search" />,
          },
        ],
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
      {
        external: true,
        path: 'https://github.com/diandian18/react-antd-console',
        name: '外链',
        icon: <SvgIcon name="external_link" />,
        permission: 'external',
      },
      // {
      //   path: 'singleSider',
      //   component: () => import('@/pages/singleSider'),
      //   name: '单栏',
      //   icon: <SvgIcon name="single_slider" />,
      //   permission: 'singleSlider',
      // },
    ],
  },
  {
    path: '/separation',
    component: () => import('@/pages/separation'),
    name: '独立布局',
    icon: <SvgIcon name="rectangle" />,
    permission: 'separation',
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

