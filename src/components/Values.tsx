const values = [
  {
    title: 'Open source, always',
    description: 'Every line of code is public. Audit it, fork it, contribute to it.',
  },
  {
    title: 'Fast & minimal',
    description: 'Chromium engine, native Rust backend. No bloat, no compromise.',
  },
  {
    title: 'Private by default',
    description: "WebRTC leak prevention, fingerprint blocking, cookie isolation. Privacy isn\u2019t an add-on.",
  },
]

export default function Values() {
  return (
    <section className="values">
      <div className="values__header reveal">
        <h2 className="section-label">What I stand for</h2>
        <p className="section-sub">
          Bushido is built on principles, not profit. Every decision starts with the user.
        </p>
      </div>
      <div className="values__grid">
        {values.map((v, i) => (
          <div className="values__card reveal" key={i}>
            <h3>{v.title}</h3>
            <p>{v.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
