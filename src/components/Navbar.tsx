import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GitHubIcon, MenuIcon, CloseIcon } from './Icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} aria-label="Main">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <img src="/logo.png" alt="" className="navbar__logo" width={26} height={26} />
          <span>Bushido</span>
        </Link>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          <Link to="/" className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}>Home</Link>
          <Link to="/release-notes" className={`navbar__link ${location.pathname === '/release-notes' ? 'navbar__link--active' : ''}`}>Release notes</Link>
          <a href="https://docs.bushido-browser.app/docs" className="navbar__link">Docs</a>
          <Link to="/about" className={`navbar__link ${location.pathname === '/about' ? 'navbar__link--active' : ''}`}>About</Link>
          <a href="https://github.com/visualstudioblyat/bushido" target="_blank" rel="noopener noreferrer" className="navbar__link navbar__link--icon" aria-label="GitHub">
            <GitHubIcon size={18} />
          </a>
        </div>

        <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
          {mobileOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>
    </nav>
  )
}
