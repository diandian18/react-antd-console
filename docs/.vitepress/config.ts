// import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "react-antd-console",
  description: "后台管理系统前端解决方案",
  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ],
  lang: 'zh',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/guide/what' },
      { text: '在线预览', link: 'https://template.react-antd-console.site' },
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '简介', link: '/guide/what' },
          { text: '快速开始', link: '/guide/begin' },
          { text: '我是后端？', link: '/guide/backend' },
        ]
      },
      {
        text: '开发',
        items: [
          { text: '结构', link: '/development/structure' },
          { text: '布局', link: '/development/layout' },
          { text: '路由', link: '/development/route' },
          { text: '鉴权', link: '/development/auth' },
          { text: '请求', link: '/development/request' },
          { text: 'Mock', link: '/development/mock' },
          { text: '数据管理', link: '/development/model' },
          { text: '样式', link: '/development/style' },
          { text: '环境变量', link: '/development/env' },
          { text: '编码规范', link: '/development/lint' },
          { text: 'Icon', link: '/development/icon' },
          { text: '国际化', link: '/development/i18n' },
          { text: '搜索列表', link: '/development/search-list' },
          { text: '常见问题', link: '/development/qa' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/diandian18/react-antd-console' },
    ],

    outline: {
      label: '页面导航',
      level: [2, 3],
    },
    sidebarMenuLabel: "菜单",
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          'zh': {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },
  },
})
