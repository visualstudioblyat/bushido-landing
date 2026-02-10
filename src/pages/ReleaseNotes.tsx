import { useEffect, useState, useRef } from 'react'

const CHANGELOG_URL = 'https://raw.githubusercontent.com/visualstudioblyat/bushido/main/CHANGELOG.md'

interface ReleaseCategory {
  name: string
  items: string[]
}

interface Release {
  version: string
  date: string
  compareUrl?: string
  categories: ReleaseCategory[]
}

const CATEGORY_COLORS: Record<string, string> = {
  Added: 'var(--color-added)',
  Theme: 'var(--color-known)',
  Changed: 'var(--color-changed)',
  Fixed: 'var(--color-fixed)',
  Removed: 'var(--color-breaking)',
  Security: 'var(--color-breaking)',
}

function parseChangelog(md: string): Release[] {
  const releases: Release[] = []
  // split on version headers
  const blocks = md.split(/^## /m).filter(b => b.trim())

  for (const block of blocks) {
    const lines = block.split('\n')
    const firstLine = lines[0].trim()

    // extract version (e.g. "v0.3.0")
    const versionMatch = firstLine.match(/^v?([\d.]+.*)/)
    if (!versionMatch) continue
    const version = versionMatch[1]

    // extract date and compare URL from the first few lines (may have blank lines)
    let date = ''
    let compareUrl: string | undefined
    for (let j = 1; j < Math.min(lines.length, 5); j++) {
      const metaLine = lines[j]?.trim() || ''
      const dateMatch = metaLine.match(/\*\*(\d{4}-\d{2}-\d{2})\*\*/)
      if (dateMatch) { date = dateMatch[1]; }
      const linkMatch = metaLine.match(/\[Compare\]\((.*?)\)/)
      if (linkMatch) { compareUrl = linkMatch[1]; }
      if (date) break
    }

    // parse categories
    const categories: ReleaseCategory[] = []
    let currentCategory: ReleaseCategory | null = null

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      const catMatch = line.match(/^### (.+)/)
      if (catMatch) {
        currentCategory = { name: catMatch[1].trim(), items: [] }
        categories.push(currentCategory)
        continue
      }
      const itemMatch = line.match(/^- (.+)/)
      if (itemMatch && currentCategory) {
        currentCategory.items.push(itemMatch[1])
      }
    }

    releases.push({ version, date, compareUrl, categories })
  }

  return releases
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function ReleaseNotes() {
  const [releases, setReleases] = useState<Release[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    document.title = 'Release notes — Bushido Browser'
  }, [])

  // fetch + parse changelog
  useEffect(() => {
    fetch(CHANGELOG_URL)
      .then(r => {
        if (!r.ok) throw new Error('fetch failed')
        return r.text()
      })
      .then(md => {
        setReleases(parseChangelog(md))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  // reveal-on-scroll observer — re-run when releases load
  useEffect(() => {
    if (loading) return
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed') })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observerRef.current!.observe(el))
    return () => observerRef.current?.disconnect()
  }, [loading, releases])

  return (
    <main id="main-content" className="release-notes">
      <div className="release-notes__header reveal">
        <h1 className="section-label">Changelog</h1>
        <p className="section-sub">
          Every update to Bushido, pulled live from the source.
        </p>
      </div>

      {loading && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading changelog...</p>
      )}

      {error && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Couldn't load changelog. Check back later.
        </p>
      )}

      <div className="release-notes__list">
        {releases.map((release, idx) => (
          <article key={release.version} className="release reveal">
            <div className="release__header">
              <div className="release__version-row">
                <h2 className="release__version">v{release.version}</h2>
                {idx === 0 && <span className="release__badge" style={{ background: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent)' }}>Latest</span>}
              </div>
              <div className="release__meta">
                {release.date && <span className="release__date">{formatDate(release.date)}</span>}
                {release.compareUrl && (
                  <a href={release.compareUrl} className="release__link" target="_blank" rel="noopener noreferrer">
                    Compare &rarr;
                  </a>
                )}
              </div>
            </div>

            {release.categories.map(cat => (
              <div key={cat.name} className="release__category">
                <h3 className="release__category-label" style={{ color: CATEGORY_COLORS[cat.name] || 'var(--text)' }}>
                  {cat.name}
                </h3>
                <ul>
                  {cat.items.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: markdownInline(item) }} />
                  ))}
                </ul>
              </div>
            ))}
          </article>
        ))}
      </div>
    </main>
  )
}

// minimal inline markdown: **bold** and `code`
function markdownInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code style="font-size:0.8em;padding:1px 5px;border-radius:3px;background:rgba(255,255,255,0.06)">$1</code>')
}
