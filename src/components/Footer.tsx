import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-row">
            <img src="/logo.png" alt="Bushido" className="footer__logo" width={28} height={28} />
            <span className="footer__name">Bushido</span>
          </div>
          <p className="footer__tagline">Browse with discipline</p>
          <span className="btn btn--primary btn--sm" style={{ opacity: 0.7, cursor: 'default' }}>
            Coming soon
          </span>
        </div>

        <div className="footer__columns">
          <div className="footer__col">
            <p>Product</p>
            <Link to="/release-notes">Release notes</Link>
            <a href="https://docs.bushido-browser.app/docs">Documentation</a>
            <Link to="/about">About</Link>
          </div>
          <div className="footer__col">
            <p>Get started</p>
            <a href="https://github.com/visualstudioblyat/bushido/releases" target="_blank" rel="noopener noreferrer">Download</a>
            <a href="https://github.com/visualstudioblyat/bushido#readme" target="_blank" rel="noopener noreferrer">Build from source</a>
          </div>
          <div className="footer__col">
            <p>Community</p>
            <a href="https://github.com/visualstudioblyat/bushido" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://discord.gg/6s4tEk8X" target="_blank" rel="noopener noreferrer">Discord</a>
            <a href="https://github.com/visualstudioblyat/bushido/issues" target="_blank" rel="noopener noreferrer">Report an issue</a>
            <a href="mailto:burnersiscool@gmail.com">burnersiscool@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>Built by visualstudioblyat</span>
      </div>
    </footer>
  )
}
