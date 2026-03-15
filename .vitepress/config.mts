import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'JoAi Documentation',
  description:
    'AI agents that actually do things. With all the core AI capabilities you expect, plus the ability to interact with Web3 blockchains and apps you use every day - all in one place.',
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
          { text: 'Chat & Commands', link: '/chat-commands' },
          { text: 'Knowledge', link: '/knowledge' },
          { text: 'Shortcuts', link: '/shortcuts' },
          { text: 'Tasks', link: '/tasks' },
          { text: 'Alerts', link: '/alerts' },
          { text: 'Workspace', link: '/workspace' },
          { text: 'Swarms', link: '/swarms' },
          { text: 'Teams', link: '/teams' },
          { text: 'Wallets', link: '/wallets' },
        ],
      },
      {
        text: 'Warps',
        items: [
          { text: 'General', link: '/warps/general' },
          { text: 'Quickstart', link: '/warps/quickstart' },
          { text: 'Creating Warps', link: '/warps/creating-warps' },
          { text: 'Specifications', link: '/warps/specifications' },
          { text: 'Action Types', link: '/warps/action-types' },
          { text: 'Mini-Apps', link: '/warps/mini-apps' },
          { text: 'MCP Actions', link: '/warps/mcp-actions' },
          { text: 'Prompt Actions', link: '/warps/prompt-actions' },
          { text: 'Chains', link: '/warps/chains' },
          { text: 'Registry', link: '/warps/registry' },
          { text: 'Integrations', link: '/warps/integrations' },
          { text: 'SDKs', link: '/warps/sdks' },
          { text: 'Wallets', link: '/warps/wallets' },
          { text: 'Messages', link: '/warps/messages' },
        ],
      },
      {
        text: 'Protocols',
        items: [
          { text: 'MCP', link: '/protocols/mcp' },
          { text: 'OpenBond Protocol', link: '/protocols/openbond' },
          { text: 'x402', link: '/protocols/x402' },
          { text: 'EIP-8004 (Ethereum)', link: '/protocols/8004' },
          { text: 'Google A2A', link: '/protocols/google-a2a' },
        ],
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Warps', link: '/warps' },
          { text: 'Integrations', link: '/integrations' },
          { text: 'API', link: '/api' },
          { text: 'Blueprints', link: '/blueprints' },
          { text: 'Skills', link: '/skills' },
          { text: 'Webhooks', link: '/webhooks' },
        ],
      },
      {
        text: 'Resources',
        items: [
          { text: 'App Store', link: '/app-store' },
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
