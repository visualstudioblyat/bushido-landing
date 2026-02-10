import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Values from '../components/Values'

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main id="main-content">
      <Helmet>
        <title>Bushido Browser — A Tauri/Rust browser built for focus, speed, & privacy</title>
        <meta name="description" content="Bushido Browser — A minimal, open-source browser built in Tauri/Rust. Privacy-first adblocking, parallel downloads, workspaces, tree tabs, and more. 7.2MB core." />
        <link rel="canonical" href="https://bushido-browser.app/" />
        <meta property="og:title" content="Bushido Browser — Browse with discipline" />
        <meta property="og:description" content="A minimal, open-source browser built in Tauri/Rust. Privacy-first adblocking, parallel downloads, workspaces, tree tabs, and more." />
        <meta property="og:url" content="https://bushido-browser.app/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Bushido Browser",
          "operatingSystem": "Windows",
          "applicationCategory": "BrowserApplication",
          "description": "A minimal, open-source browser built in Tauri/Rust. Privacy-first adblocking, parallel downloads, workspaces, tree tabs, and more.",
          "url": "https://bushido-browser.app",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        })}</script>
      </Helmet>
      <Hero />
      <div className="section-divider" />
      <Features />
      <div className="values-wrap">
        <Values />
      </div>
    </main>
  )
}
