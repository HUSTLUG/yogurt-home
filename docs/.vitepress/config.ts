import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Yougrt docs",
  description: "Yougrt 使用文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get start', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Get start',
        items: [
          { text: '效果展示', link: '/show'},
          { text: '开始部署', link: '/start'},
          { text: '详细配置', link: '/config'},
          { text: '后台操作', link: '/admin'}
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HUSTLUG'}
    ]
  }
})
