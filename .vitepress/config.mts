import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'JoAi Documentation',
  description:
    'AI agents that actually do things. With all the core AI capabilities you expect, plus the ability to interact with Web3 blockchains and apps you use every day - all in one place.',
  lastUpdated: false,
  cleanUrls: true,
  // Partner kit is internal co-marketing copy, not product docs
  srcExclude: ['**/partner.md'],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'JoAi', link: 'https://joai.ai' }],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/introduction/getting-started' },
          { text: 'Billing & plans', link: '/billing' },
        ],
      },
      {
        text: 'Native apps',
        items: [
          { text: 'Overview', link: '/apps/' },
          { text: 'Public surfaces', link: '/apps/public-surfaces' },
          { text: 'Board', link: '/apps/board' },
          { text: 'Shop', link: '/apps/shop' },
          { text: 'Kiosk', link: '/kiosk' },
          { text: 'Contacts', link: '/apps/contacts' },
          { text: 'Campaigns', link: '/campaigns' },
          { text: 'Forms', link: '/apps/forms' },
          { text: 'Appointments', link: '/apps/appointments' },
          { text: 'Smart Links', link: '/apps/smart-links' },
          { text: 'News', link: '/apps/news' },
          { text: 'Sites', link: '/sites' },
          { text: 'Meetings', link: '/apps/meeting' },
          { text: 'Workspace', link: '/apps/files' },
          { text: 'Wallets', link: '/wallets' },
          { text: 'Contracts', link: '/apps/contracts' },
          { text: 'Heartbeats', link: '/apps/heartbeats' },
          { text: 'Voice dictation', link: '/apps/voice-dictation' },
        ],
      },
      {
        text: 'Integrations',
        items: [
          { text: 'Overview', link: '/integrations/' },
          { text: 'Telegram', link: '/integrations/telegram' },
          { text: 'Slack', link: '/integrations/slack' },
          { text: 'WhatsApp Business', link: '/integrations/whatsapp' },
          { text: 'WhatsApp Personal', link: '/integrations/whatsapp-personal' },
          { text: 'Discord', link: '/integrations/discord' },
          { text: 'Email', link: '/integrations/email' },
          { text: 'Twilio', link: '/integrations/twilio' },
          { text: 'X (Twitter)', link: '/integrations/x' },
          { text: 'XChat', link: '/integrations/xchat' },
          { text: 'Instagram', link: '/integrations/instagram' },
          { text: 'Calendars', link: '/integrations/calendar' },
          { text: 'N8N', link: '/integrations/n8n' },
          { text: 'GitHub', link: '/integrations/github' },
          { text: 'Sentry', link: '/integrations/sentry' },
          { text: 'Readwise Reader', link: '/integrations/readwise' },
          { text: 'Grok Voice', link: '/integrations/grok' },
          { text: 'MCP', link: '/integrations/mcp' },
          { text: 'API Tokens', link: '/integrations/api-tokens' },
          { text: 'Webhooks', link: '/integrations/webhooks' },
          { text: 'Website Widget', link: '/integrations/embed' },
        ],
      },
      {
        text: 'Core',
        items: [
          { text: 'Agents', link: '/agents' },
          { text: 'Studio', link: '/studio' },
          { text: 'Artifacts', link: '/artifacts' },
          { text: 'Chat & Commands', link: '/chat-commands' },
          { text: 'Desk', link: '/desk' },
          { text: 'Knowledge', link: '/knowledge' },
          { text: 'Shortcuts & Flows', link: '/shortcuts' },
          { text: 'Tasks', link: '/tasks' },
          { text: 'Alerts', link: '/alerts' },
          { text: 'CLI', link: '/cli' },
          { text: 'Swarms', link: '/swarms' },
          { text: 'Teams', link: '/teams' },
          { text: 'Desktop', link: '/desktop' },
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
          { text: 'ChatApps', link: '/chatapps' },
          { text: 'Developers', link: '/developers' },
          { text: 'API', link: '/api' },
          { text: 'Blueprints', link: '/blueprints' },
          { text: 'Skills', link: '/skills' },
          { text: 'Webhooks & hooks', link: '/webhooks' },
        ],
      },
      {
        text: 'Resources',
        items: [
          { text: 'Mobile apps', link: '/app-store' },
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
