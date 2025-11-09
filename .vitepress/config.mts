import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'JoAi Docs',
  description: 'Documentation for JoAi products & services.',
  lastUpdated: false,
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'JoAi', link: 'https://joai.ai' }],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/introduction/getting-started.md' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://x.com/JoAiAgents' },
      { icon: 'github', link: 'https://github.com/JoAiHQ' },
    ],
  },
})
