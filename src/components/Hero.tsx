import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GitHubIcon, DownloadIcon } from './Icons'
import BrowserDemo from '../demo/BrowserDemo'

const ease = [0.25, 0.1, 0.25, 1] as const
const clipEase = [0.65, 0, 0.35, 1] as const

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState(reduced ? 3 : 0)

  useEffect(() => {
    if (reduced) { setPhase(3); return }
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1100),
      setTimeout(() => setPhase(3), 2000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [reduced])

  const dur = reduced ? 0 : undefined

  return (
    <section className="hero">
      {/* Label */}
      <motion.div
        className="hero__label"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: phase >= 1 ? 0.45 : 0, y: phase >= 1 ? 0 : 8 }}
        transition={{ duration: dur ?? 0.7, ease }}
      >
        Bushido Browser
      </motion.div>

      {/* Headline with clip-path reveal */}
      <div className="hero__title-wrap">
        <motion.h1
          className="hero__title"
          initial={{ clipPath: 'inset(0 100% 0 0)', x: 6 }}
          animate={{
            clipPath: phase >= 2 ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            x: phase >= 2 ? 0 : 6,
          }}
          transition={{
            clipPath: { duration: dur ?? 0.8, ease: clipEase },
            x: { duration: dur ?? 1.2, ease },
          }}
        >
          Browse with discipline
        </motion.h1>

        <motion.div
          className="hero__accent-line"
          initial={{ left: 0, opacity: 0 }}
          animate={{
            left: phase >= 2 ? '100%' : '0%',
            opacity: reduced ? 0 : (phase >= 2 ? [0, 1, 1, 0] : 0),
          }}
          transition={{
            duration: dur ?? 0.8,
            ease: clipEase,
            opacity: { duration: dur ?? 0.8, times: [0, 0.1, 0.9, 1] },
          }}
        />
      </div>

      <motion.p
        className="hero__subtitle"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 12 }}
        transition={{ duration: dur ?? 0.6, ease }}
      >
        Beautifully minimal, privacy-focused, &amp; packed with features.
        Your experience matters — your data stays yours.
      </motion.p>

      <motion.div
        className="hero__actions"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 12 }}
        transition={{ duration: dur ?? 0.6, delay: reduced ? 0 : 0.1, ease }}
      >
        <a href="https://github.com/visualstudioblyat/bushido/releases" className="btn btn--primary">
          <DownloadIcon size={16} />
          Download beta
        </a>
        <a href="https://github.com/visualstudioblyat/bushido" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
          View on GitHub
        </a>
      </motion.div>

      <motion.div
        className="hero__social"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ duration: dur ?? 0.6, delay: reduced ? 0 : 0.2, ease }}
      >
        <a href="https://github.com/visualstudioblyat/bushido" target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub">
          <GitHubIcon size={20} />
        </a>
      </motion.div>

      {/* Interactive browser demo */}
      <motion.div
        className="demo-wrapper"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 80 }}
        transition={{ duration: dur ?? 0.7, delay: reduced ? 0 : 0.15, ease: [0.4, 0, 0.2, 1] }}
      >
        <BrowserDemo />
      </motion.div>
    </section>
  )
}
