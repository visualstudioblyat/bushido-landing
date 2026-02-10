import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ReleaseNotes from './pages/ReleaseNotes'
import About from './pages/About'

function NotFound() {
  return (
    <main id="main-content" style={{ textAlign: 'center', padding: '120px 24px 80px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>404</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Page not found.</p>
      <Link to="/" className="btn btn--ghost">Back to home</Link>
    </main>
  )
}

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/release-notes" element={<ReleaseNotes />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
