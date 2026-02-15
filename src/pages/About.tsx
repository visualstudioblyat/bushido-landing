import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { GitHubIcon } from '../components/Icons'

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed') })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main id="main-content" className="about">
      <Helmet>
        <title>About — Bushido Browser</title>
        <meta name="description" content="About Bushido Browser — an open-source, privacy-first browser built in Tauri/Rust by an independent developer." />
        <link rel="canonical" href="https://bushido-browser.app/about" />
        <meta property="og:title" content="About — Bushido Browser" />
        <meta property="og:description" content="About Bushido Browser — an open-source, privacy-first browser built in Tauri/Rust by an independent developer." />
        <meta property="og:url" content="https://bushido-browser.app/about" />
      </Helmet>

      <div className="about__header reveal">
        <h1 className="section-label">About Bushido</h1>
        <p className="about__mission">
          Bushido is a solo project. I got tired of browsers that spy on you, bloat themselves with features nobody asked for, & treat your attention like a product. So I built one that doesn't.
        </p>
      </div>

      <div className="about__group reveal">
        <h2 className="about__group-title">Built by</h2>
        <div className="about__member">
          <span className="about__member-name">
            visualstudioblyat
            <a href="https://github.com/visualstudioblyat" target="_blank" rel="noopener noreferrer" aria-label="visualstudioblyat on GitHub">
              <GitHubIcon size={13} />
            </a>
          </span>
          <span className="about__member-role">everything</span>
        </div>
      </div>

      <div className="about__contrib reveal">
        <h2 className="about__group-title">Contribute</h2>
        <p className="section-sub">
          Bushido is open source. Bug reports, PRs, & ideas are welcome.
        </p>
        <a href="https://github.com/visualstudioblyat/bushido" target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
          View on GitHub
        </a>
      </div>

      <div className="about__contrib reveal">
        <h2 className="about__group-title">Contact</h2>
        <p className="section-sub">
          For partnerships, questions, or just to say hi.
        </p>
        <a href="mailto:burnersiscool@gmail.com" className="btn btn--ghost btn--sm">
          burnersiscool@gmail.com
        </a>
      </div>
    </main>
  )
}
