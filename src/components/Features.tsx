import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WorkspaceIcon, ShieldIcon, TreeIcon, CommandIcon } from './Icons'

const features = [
  {
    id: 'workspaces',
    icon: WorkspaceIcon,
    title: 'Workspaces',
    description: 'Organize tabs into color-coded workspaces. Each workspace has its own tabs, history, & context — switch between them instantly with Ctrl+1-9.',
    previewTabs: ['Research', 'Development', 'Personal'],
  },
  {
    id: 'privacy',
    icon: ShieldIcon,
    title: 'Privacy first',
    description: 'Blocks 2,000+ tracker & ad domains, prevents WebRTC leaks, & resists fingerprinting — all built in. No extensions, no setup.',
    previewTabs: ['Shield', 'Per-site whitelist'],
  },
  {
    id: 'tabtree',
    icon: TreeIcon,
    title: 'Tab tree',
    description: 'Tabs remember where they came from. Parent-child relationships keep your research organized with collapsible branches in the sidebar.',
    previewTabs: ['Parent', 'Child 1', 'Child 2'],
  },
  {
    id: 'command',
    icon: CommandIcon,
    title: 'Command palette',
    description: 'Press Ctrl+K to search across all your tabs, bookmarks, history, & actions in one place. Frecency scoring surfaces what matters most.',
    previewTabs: ['Tabs', 'Bookmarks', 'Actions'],
  },
]

export default function Features() {
  const [active, setActive] = useState(0)
  const feat = features[active]

  return (
    <section className="features" id="features">
      <div className="features__header reveal">
        <h2 className="section-label">Built different, on purpose</h2>
        <p className="section-sub">
          Not another Chromium reskin. Every feature exists because the defaults weren't good enough.
        </p>
      </div>

      <div className="features__body reveal">
        <div className="features__tabs" role="tablist" aria-label="Features">
          {features.map((f, i) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={i === active}
              aria-controls={`panel-${f.id}`}
              id={`tab-${f.id}`}
              className={`features__tab ${i === active ? 'features__tab--active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="features__tab-icon">
                <f.icon size={20} />
              </span>
              <span className="features__tab-text">
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </span>
            </button>
          ))}
        </div>

        <div
          className="features__preview"
          role="tabpanel"
          id={`panel-${feat.id}`}
          aria-labelledby={`tab-${feat.id}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              className="features__preview-card"
              key={feat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="features__preview-bar">
                <div className="features__preview-dots">
                  <span /><span /><span />
                </div>
                <div className="features__preview-tabs">
                  {feat.previewTabs.map((tab, i) => (
                    <span
                      key={tab}
                      className={`features__preview-tab ${i === 0 ? 'features__preview-tab--active' : ''}`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
              </div>
              <div className="features__preview-body">
                <span className="features__preview-icon">
                  <feat.icon size={56} />
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
