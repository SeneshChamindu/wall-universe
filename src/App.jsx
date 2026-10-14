
import { useState } from 'react'
import Admin from './pages/Admin.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import {
  Search,
  Moon,
  Sun,
  Image as ImageIcon,
  Heart,
  Compass,
  UserRound,
  Download,
  Menu,
} from 'lucide-react'
import './styles/global.css'

const categories = [
  'Anime',
  'Cars',
  'Nature',
  'Gaming',
  'AMOLED',
  'Space',
  'Abstract',
  'Minimal',
  '4K',
]

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('Home')
 
  const empty = (
    <div className="empty-state">
      <div className="empty-icon">
        <ImageIcon size={34} />
      </div>
      <h3>No wallpapers yet</h3>
      <p>
        Your next favourite wallpaper will appear here.
        Check back soon!
      </p>
    </div>
  )
if (window.location.pathname === '/admin') {
  return <Admin />
}
  if (window.location.pathname === '/login') {
  return <Login />
  }
  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-icon">
            <ImageIcon size={22} />
          </span>
          <span>
             <strong>Wall Universe</strong>
          </span>
        </a>
        <button
  onClick={() => window.location.href = '/login'}
  style={{
    padding: '10px 20px',
    borderRadius: '12px',
    border: '1px solid #10B981',
    background: '#10B981',
    color: '#04150D',
    fontWeight: 700,
    fontSize: '14px',
    cursor: 'pointer',
    transition: '0.2s'
  }}
>
  Sign in →
</button>

        <button
          className="icon-button theme-button"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Switch theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <main id="home">
        <section className="hero">
          <span className="eyebrow">
            YOUR SCREEN. YOUR UNIVERSE.
          </span>

          <h1>
            Find your
            <br />
            <span>next wallpaper.</span>
          </h1>

          <p className="hero-description">
            Discover wallpapers that match your style.
            Always in original quality.
          </p>

          <form
            className="search-box"
            onSubmit={(event) => {
              event.preventDefault()
              setActiveTab('Search')
            }}
          >
            <Search size={21} />
            <input
              type="search"
              placeholder="Search wallpapers..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search wallpapers"
            />
            <button type="submit">Search</button>
          </form>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE</span>
              <h2>Categories</h2>
            </div>
            <span className="muted">{categories.length} collections</span>
          </div>

          <div className="category-grid">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`category-card category-${index}`}
                onClick={() => {
                  setSearch(category)
                  setActiveTab('Search')
                }}
              >
                <span className="category-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{category}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section wallpaper-section">
          <div className="section-heading">
            <div>
              <span className="section-label">FRESH FINDS</span>
              <h2>{activeTab === 'Search' ? 'Search Results' : 'Latest Wallpapers'}</h2>
            </div>
            <span className="muted">Original quality</span>
          </div>
          {empty}
        </section>

        <section className="section wallpaper-section">
          <div className="section-heading">
            <div>
              <span className="section-label">COMMUNITY FAVOURITES</span>
              <h2>Trending</h2>
            </div>
            <Heart size={20} className="accent-icon" />
          </div>
          {empty}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">Wall Universe</div>
        <p>Discover your own universe of wallpapers.</p>
        <span>Powered by Senesh Chamindu</span>
      </footer>

      <nav className="bottom-nav" aria-label="Main navigation">
        {[
          { name: 'Home', icon: ImageIcon },
          { name: 'Categories', icon: Compass },
          { name: 'Favorites', icon: Heart },
          { name: 'Profile', icon: UserRound },
        ].map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={activeTab === name ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveTab(name)}
          >
            <Icon size={21} />
            <span>{name}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
