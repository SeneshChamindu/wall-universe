
import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import {
  Search,
  Moon,
  Sun,
  Image as ImageIcon,
  Heart,
  Compass,
  UserRound,
  ArrowRight,
} from 'lucide-react'

import Admin from './pages/Admin.jsx'
import Login from './pages/Login.jsx'
import Categories from './pages/Categories.jsx'
import Favorites from './pages/Favorites.jsx'
import Profile from './pages/Profile.jsx'
import WallpaperPreview from './pages/WallpaperPreview.jsx'
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

function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(true)
  const [search, setSearch] = useState('')
  const [searchSubmitted, setSearchSubmitted] = useState(false)

  const activeTab = location.pathname === '/categories'
    ? 'Categories'
    : location.pathname === '/favorites'
      ? 'Favorites'
      : location.pathname === '/profile'
        ? 'Profile'
        : 'Home'

  const empty = (
    <div className="empty-state">
      <div className="empty-icon">
        <ImageIcon size={34} />
      </div>
      <h3>
        {searchSubmitted ? 'No wallpapers found' : 'No wallpapers yet'}
      </h3>
      <p>
        {searchSubmitted
          ? 'Try another search when wallpapers are available.'
          : 'Your next favourite wallpaper will appear here. Check back soon!'}
      </p>
    </div>
  )

  function submitSearch(event) {
    event.preventDefault()
    setSearchSubmitted(true)
    document.getElementById('wallpaper-results')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <header className="topbar">
        <a
          className="brand"
          href="/"
          onClick={event => {
            event.preventDefault()
            navigate('/')
            setSearch('')
            setSearchSubmitted(false)
          }}
        >
          <span className="brand-icon">
            <ImageIcon size={22} />
          </span>
          <span>
            <strong>Wall Universe</strong>
          </span>
        </a>

        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            border: '1px solid #10B981',
            background: '#10B981',
            color: '#04150D',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
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

          <form className="search-box" onSubmit={submitSearch}>
            <Search size={21} />

            <input
              type="search"
              placeholder="Search wallpapers..."
              value={search}
              onChange={event => {
                setSearch(event.target.value)
                setSearchSubmitted(false)
              }}
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

            <button
              className="muted"
              onClick={() => navigate('/categories')}
              style={{
                background: 'transparent',
                border: 0,
                cursor: 'pointer',
              }}
            >
              View all →
            </button>
          </div>

          <div className="category-grid">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`category-card category-${index}`}
                onClick={() => navigate('/categories')}
              >
                <span className="category-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{category}</span>
              </button>
            ))}
          </div>
        </section>

        <section
          className="section wallpaper-section"
          id="wallpaper-results"
        >
          <div className="section-heading">
            <div>
              <span className="section-label">FRESH FINDS</span>
              <h2>
                {searchSubmitted ? 'Search Results' : 'Latest Wallpapers'}
              </h2>
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
          { name: 'Home', icon: ImageIcon, path: '/' },
          { name: 'Categories', icon: Compass, path: '/categories' },
          { name: 'Favorites', icon: Heart, path: '/favorites' },
          { name: 'Profile', icon: UserRound, path: '/profile' },
        ].map(({ name, icon: Icon, path }) => (
          <button
            key={name}
            className={activeTab === name ? 'nav-item active' : 'nav-item'}
            onClick={() => navigate(path)}
            aria-current={activeTab === name ? 'page' : undefined}
          >
            <Icon size={21} />
            <span>{name}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/wallpaper/:id" element={<WallpaperPreview />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
                }
