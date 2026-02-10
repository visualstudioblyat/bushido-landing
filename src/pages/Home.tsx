import { useEffect } from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Values from '../components/Values'

export default function Home() {
  useEffect(() => {
    document.title = 'Bushido Browser'
  }, [])

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
      <Hero />
      <div className="section-divider" />
      <Features />
      <div className="values-wrap">
        <Values />
      </div>
    </main>
  )
}
