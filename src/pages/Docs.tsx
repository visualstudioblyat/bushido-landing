import { useEffect } from 'react'
import { BookIcon, WorkspaceIcon, CompactIcon, ShieldIcon, CodeIcon, UsersIcon, SettingsIcon, ZapIcon, CommandIcon } from '../components/Icons'

const DOCS_BASE = 'https://docs.bushido.dev/docs'

const cards = [
  {
    icon: BookIcon,
    title: 'Getting started',
    description: 'Tabs, navigation, bookmarks, keyboard shortcuts — the essentials.',
    href: `${DOCS_BASE}/getting-started/install`,
  },
  {
    icon: WorkspaceIcon,
    title: 'Workspaces',
    description: 'Color-coded tab groups with independent context. Ctrl+1-9 to switch.',
    href: `${DOCS_BASE}/user-manual/workspaces`,
  },
  {
    icon: CommandIcon,
    title: 'Command palette',
    description: 'Ctrl+K to search tabs, bookmarks, history, & actions in one place.',
    href: `${DOCS_BASE}/user-manual/command-palette`,
  },
  {
    icon: ShieldIcon,
    title: 'Privacy & blocking',
    description: '2,000+ blocked domains, WebRTC protection, fingerprint resistance.',
    href: `${DOCS_BASE}/privacy/ad-blocking`,
  },
  {
    icon: CompactIcon,
    title: 'Compact mode',
    description: 'Auto-hide the sidebar. Hover the left edge to peek.',
    href: `${DOCS_BASE}/user-manual/compact-mode`,
  },
  {
    icon: ZapIcon,
    title: 'Reader & PiP',
    description: 'Distraction-free reading mode. Picture-in-picture for videos.',
    href: `${DOCS_BASE}/user-manual/reader-mode`,
  },
  {
    icon: SettingsIcon,
    title: 'Configuration',
    description: 'Settings, search engines, privacy toggles, & appearance.',
    href: `${DOCS_BASE}/user-manual/settings`,
  },
  {
    icon: CodeIcon,
    title: 'Build from source',
    description: 'Clone, install deps, cargo tauri dev. That\'s it.',
    href: `${DOCS_BASE}/getting-started/build-from-source`,
  },
  {
    icon: UsersIcon,
    title: 'Contribute',
    description: 'How to report bugs, submit PRs, & get involved.',
    href: `${DOCS_BASE}/getting-started/contribute`,
  },
]

export default function Docs() {
  useEffect(() => {
    document.title = 'Docs — Bushido Browser'
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main id="main-content" className="docs">
      <div className="docs__header reveal">
        <h1 className="section-title">Documentation</h1>
        <p className="section-desc">
          Everything you need to get the most out of Bushido. Guides, references, & developer docs.
        </p>
      </div>

      <div className="docs__grid">
        {cards.map((card) => (
          <a href={card.href} className="docs__card reveal" key={card.title}>
            <div className="docs__card-icon">
              <card.icon size={20} />
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </a>
        ))}
      </div>
    </main>
  )
}
