import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import './App.css'

const furnitureModels = [
  { id: 1, name: 'Modern Sofa', price: '$499', category: 'Living', images: ['/sofa/sofa1.jpg'], excerpt: 'Comfortable modern sofa with soft cushions.', description: 'A stylish and comfortable modern sofa for your living room.' },
  { id: 2, name: 'Wooden Dining Table', price: '$799', category: 'Dining', images: ['/sofa/sofa2.jpg'], excerpt: 'Solid wood table, seats 6 comfortably.', description: 'Elegant wooden dining table perfect for family gatherings.' },
  { id: 3, name: 'Minimalist Chair', price: '$199', category: 'Seating', images: ['/sofa/sofa3.jpg'], excerpt: 'Lightweight chair with ergonomic form.', description: 'Minimalist chair with ergonomic design.' }
]

function resolveImgPath(p) {
  if (!p) return p
  if (p.startsWith('http') || p.startsWith('data:')) return p
  return p.startsWith('/') ? `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}` : p
}

function Welcome({ onClose }) {
  return (
    <div className="welcome-overlay">
      <div className="welcome-card">
        <h2>Welcome to Sunny Home</h2>
        <p>Discover furniture and leave comments on any post.</p>
        <button onClick={onClose} className="enter-btn">Enter</button>
      </div>
    </div>
  )
}

function Home({ onOpenQuickView }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites') || '[]') } catch { return [] }
  })

  const categories = ['All', ...Array.from(new Set(furnitureModels.map(m => m.category)))]

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.setAttribute('data-visible', 'true')
      })
    }, { threshold: 0.12 })

    const cards = Array.from(document.querySelectorAll('.card'))
    cards.forEach(c => observer.observe(c))

    // Fallback to ensure visibility if observer misses
    setTimeout(() => {
      cards.forEach(c => {
        if (c.getAttribute('data-visible') !== 'true') c.setAttribute('data-visible', 'true')
      })
    }, 120)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = document.querySelector('.hero-bg')
    if (!el) return
    const onScroll = () => {
      const y = window.scrollY
      el.style.transform = `translate3d(${y * -0.03}px, ${y * 0.05}px, 0) scale(1)`
      el.style.opacity = `${Math.max(0.02, 0.08 - y / 3000)}`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleFav(id) {
    const next = favorites.includes(id) ? favorites.filter(x => x !== id) : [id, ...favorites]
    setFavorites(next)
    localStorage.setItem('favorites', JSON.stringify(next))
  }

  const filtered = furnitureModels.filter(m => {
    const matchCat = activeCategory === 'All' || m.category === activeCategory
    const q = search.trim().toLowerCase()
    const matchQ = !q || m.name.toLowerCase().includes(q) || m.excerpt.toLowerCase().includes(q)
    return matchCat && matchQ
  })

  return (
    <div className="page home">
      <header>
        <h1>Sunny Home</h1>
        <input className="search" placeholder="Search furniture, e.g. sofa" value={search} onChange={e => setSearch(e.target.value)} />
        <div className="header-actions">
          <div className="badge-small">Shop</div>
        </div>
      </header>

      <section className="hero" aria-hidden="true">
        <div className="hero-bg">SUNNYHOME</div>
        <div className="hero-inner">
          <h2 className="hero-title">Furniture for bright living</h2>
          <p className="hero-sub">Handpicked pieces — warm, simple and timeless</p>
          <div className="hero-cta">
            <button className="enter-btn" onClick={() => window.scrollTo({ top: 520, behavior: 'smooth' })}>Shop collection</button>
          </div>
        </div>
      </section>

      <div className="filters">
        {categories.map(cat => (
          <button key={cat} className={`chip ${cat === activeCategory ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
        ))}
      </div>

      <ul className="grid">
        {filtered.map(m => (
          <li key={m.id} className="card" role="article">
            <Link to={`/post/${m.id}`}>
              <div className="thumb">
                <img
                  src={resolveImgPath(m.images[0])}
                  alt={m.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = 'https://via.placeholder.com/800x600?text=No+Image'
                  }}
                />
              </div>
            </Link>

            <div className="actions">
              <button className="action-btn" onClick={(e) => { e.preventDefault(); onOpenQuickView(m) }}>Quick view</button>
              <button className="action-btn" onClick={(e) => { e.preventDefault(); toggleFav(m.id) }}>{favorites.includes(m.id) ? '♥' : '♡'}</button>
            </div>

            <div className="meta">
              <h3>{m.name}</h3>
              <p className="price">{m.price}</p>
              <p className="excerpt">{m.excerpt}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PostDetails() {
  const { id } = useParams()
  const model = furnitureModels.find(m => String(m.id) === id)
  const storageKey = `comments-${id}`
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')
  const [name, setName] = useState('Guest')

  useEffect(() => {
    try { const raw = localStorage.getItem(storageKey); setComments(raw ? JSON.parse(raw) : []) } catch { setComments([]) }
  }, [storageKey])

  function addComment(e) {
    e.preventDefault()
    if (!text.trim()) return
    const next = [{ name: name || 'Guest', text: text.trim(), at: Date.now() }, ...comments]
    setComments(next)
    localStorage.setItem(storageKey, JSON.stringify(next))
    setText('')
  }

  if (!model) return <div style={{ padding: 20 }}>Item not found</div>

  return (
    <div className="page details">
      <Link to="/" className="back">← Back</Link>
      <div className="detail-wrap">
        <div className="images">
          {model.images.map((src, i) => (
            <img
              key={i}
              src={resolveImgPath(src)}
              alt={`${model.name} ${i}`}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/800x600?text=No+Image' }}
            />
          ))}
        </div>
        <div className="info">
          <h2>{model.name}</h2>
          <p className="price">{model.price}</p>
          <p>{model.description}</p>

          <section className="comments">
            <h3>Comments</h3>
            <form onSubmit={addComment} className="comment-form">
              <input className="c-name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
              <textarea className="c-text" placeholder="Write a comment..." value={text} onChange={e => setText(e.target.value)} />
              <button type="submit" className="c-submit">Post comment</button>
            </form>

            <div className="comments-list">
              {comments.length === 0 && <div className="no-comments">Be the first to comment!</div>}
              {comments.map((c, i) => (
                <div key={i} className="comment">
                  <div className="comment-meta"><strong>{c.name}</strong> <span className="time">{new Date(c.at).toLocaleString()}</span></div>
                  <div className="comment-body">{c.text}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [quickView, setQuickView] = useState(null)

  useEffect(() => {
    const seen = localStorage.getItem('welcomeSeen')
    if (!seen) setShowWelcome(true)
  }, [])

  function closeWelcome() {
    localStorage.setItem('welcomeSeen', '1')
    setShowWelcome(false)
  }

  const basename = import.meta.env.BASE_URL || '/'

  return (
    <Router basename={basename}>
      {showWelcome && <Welcome onClose={closeWelcome} />}
      <Routes>
        <Route path="/" element={<Home onOpenQuickView={setQuickView} />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>

      {quickView && (
        <div className="quickview-overlay" onClick={() => setQuickView(null)}>
          <div className="quickview-card" onClick={e => e.stopPropagation()}>
            <button className="close-quick" onClick={() => setQuickView(null)}>✕</button>
            <h3>{quickView.name}</h3>
            <div className="quick-images">
              {quickView.images.map((s, i) => <img key={i} src={resolveImgPath(s)} alt="" />)}
            </div>
            <p className="price">{quickView.price}</p>
            <p>{quickView.description}</p>
            <button className="enter-btn" onClick={() => setQuickView(null)}>View product</button>
          </div>
        </div>
      )}
    </Router>
  )
}
