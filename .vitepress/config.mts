import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'JoAi Documentation',
  description:
    'Complete user guide for JoAi - your AI agent platform for automation, blockchain interactions, and workflow management.',
  lastUpdated: false,
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'JoAi', link: 'https://joai.ai' }],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/introduction/getting-started' },
        ],
      },
      {
        text: 'Core Features',
        items: [
          { text: 'Agents', link: '/agents' },
          { text: 'Chat Commands', link: '/chat-commands' },
          { text: 'Knowledge', link: '/knowledge' },
          { text: 'Shortcuts', link: '/shortcuts' },
          { text: 'Tasks', link: '/tasks' },
          { text: 'Alerts', link: '/alerts' },
          { text: 'Swarms', link: '/swarms' },
          { text: 'Teams', link: '/teams' },
          { text: 'Wallets', link: '/wallets' },
        ],
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Integrations', link: '/integrations' },
          { text: 'Blueprints', link: '/blueprints' },
          { text: 'Actions & Automation', link: '/actions-automation' },
          { text: 'Webhooks', link: '/webhooks' },
        ],
      },
      {
        text: 'Resources',
        items: [
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Best Practices', link: '/best-practices' },
          { text: 'Need Help?', link: '/help' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://x.com/JoAiAgents' },
      { icon: 'github', link: 'https://github.com/JoAiHQ' },
    ],
  },
})
