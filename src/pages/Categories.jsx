
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  Image as ImageIcon,
  Car,
  Trees,
  Gamepad2,
  Moon,
  Orbit,
  Shapes,
  Sparkles,
  Monitor,
  ChevronRight
} from 'lucide-react'
import { supabase } from '../lib/supabase.js'

const categories = [
  { name: 'Anime', icon: Sparkles, color: '#A78BFA' },
  { name: 'Cars', icon: Car, color: '#F59E0B' },
  { name: 'Nature', icon: Trees, color: '#34D399' },
  { name: 'Gaming', icon: Gamepad2, color: '#60A5FA' },
  { name: 'AMOLED', icon: Moon, color: '#F472B6' },
  { name: 'Space', icon: Orbit, color: '#818CF8' },
  { name: 'Abstract', icon: Shapes, color: '#FB7185' },
  { name: 'Minimal', icon: Sparkles, color: '#A3E635' },
  { name: '4K', icon: Monitor, color: '#22D3EE' },
]

export default function Categories() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadCategories() {
      if (!supabase) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('wallpapers')
        .select('category')

      if (active) {
        if (!error && data) {
          const result = {}
          data.forEach(item => {
            const name = item.category || 'Nature'
            result[name] = (result[name] || 0) + 1
          })
          setCounts(result)
        }
        setLoading(false)
      }
    }

    loadCategories()
    return () => { active = false }
  }, [])

  const filtered = categories.filter(category =>
    category.name.toLowerCase().includes(search.trim().toLowerCase())
  )

  function openCategory(name) {
    navigate(`/?category=${encodeURIComponent(name)}`)
  }

  return (
    <main className="cat-page">
      <style>{`
        .cat-page {
          min-height: 100vh;
          padding: 20px;
          background: #050706;
          color: #f4f8f5;
          font-family: Inter, Arial, sans-serif;
        }
        .cat-wrap { max-width: 1000px; margin: auto; }
        .cat-header {
          display: flex; align-items: center;
          justify-content: space-between; gap: 14px;
          margin-bottom: 30px;
        }
        .cat-back {
          width: 44px; height: 44px; flex-shrink: 0;
          display: grid; place-items: center;
          border-radius: 13px; border: 1px solid #26372c;
          color: #e5eee8; background: #101713; cursor: pointer;
        }
        .cat-back:hover { border-color: #10b981; }
        .cat-brand { flex: 1; }
        .cat-brand h1 { margin: 0; font-size: 22px; letter-spacing: -.6px; }
        .cat-brand p { margin: 5px 0 0; color: #91a197; font-size: 12px; }
        .cat-search {
          display: flex; align-items: center; gap: 10px;
          width: 100%; max-width: 360px; height: 46px;
          padding: 0 14px; border: 1px solid #26372c;
          background: #0c120e; border-radius: 13px;
          color: #34d399;
        }
        .cat-search:focus-within { border-color: #10b981; }
        .cat-search input {
          min-width: 0; width: 100%; outline: 0; border: 0;
          background: transparent; color: #f4f8f5; font-size: 13px;
        }
        .cat-search input::placeholder { color: #718277; }
        .cat-section-title {
          font-size: 17px; margin: 0 0 7px;
        }
        .cat-subtitle { color: #91a197; font-size: 12px; margin: 0 0 20px; }
        .cat-grid {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 15px;
        }
        .cat-card {
          position: relative; min-height: 150px; overflow: hidden;
          display: flex; flex-direction: column; align-items: flex-start;
          justify-content: space-between; gap: 18px;
          padding: 20px; border: 1px solid #233329;
          border-radius: 17px; background: #0c120e;
          color: #f4f8f5; text-align: left; cursor: pointer;
          transition: transform .2s, border-color .2s, background .2s;
        }
        .cat-card:hover {
          transform: translateY(-3px); border-color: #10b981;
          background: #101a13;
        }
        .cat-icon {
          width: 43px; height: 43px; display: grid;
          place-items: center; border-radius: 13px;
          background: #17231b;
        }
        .cat-info {
          display: flex; align-items: center;
          justify-content: space-between; gap: 10px; width: 100%;
        }
        .cat-name { font-weight: 800; font-size: 14px; }
        .cat-count { color: #91a197; font-size: 11px; margin-top: 5px; }
        .cat-arrow { color: #647469; }
        .cat-empty {
          grid-column: 1 / -1; padding: 50px 20px;
          text-align: center; color: #91a197;
          border: 1px dashed #26372c; border-radius: 17px;
        }
        .cat-footer {
          color: #718277; text-align: center;
          font-size: 11px; margin-top: 36px;
        }
        @media(max-width: 650px) {
          .cat-page { padding: 15px; }
          .cat-header { flex-wrap: wrap; margin-bottom: 25px; }
          .cat-search { max-width: none; order: 2; }
          .cat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 11px; }
          .cat-card { min-height: 132px; padding: 15px; }
          .cat-icon { width: 39px; height: 39px; }
          .cat-brand h1 { font-size: 19px; }
        }
      `}</style>

      <div className="cat-wrap">
        <header className="cat-header">
          <button
            className="cat-back"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={19} />
          </button>

          <div className="cat-brand">
            <h1>Categories</h1>
            <p>Find wallpapers that match your style.</p>
          </div>

          <div className="cat-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search categories..."
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </div>
        </header>

        <section>
          <h2 className="cat-section-title">Explore collections</h2>
          <p className="cat-subtitle">
            Choose a category to discover wallpapers.
          </p>

          <div className="cat-grid">
            {filtered.map(category => {
              const Icon = category.icon

              return (
                <button
                  key={category.name}
                  className="cat-card"
                  onClick={() => openCategory(category.name)}
                >
                  <span
                    className="cat-icon"
                    style={{ color: category.color }}
                  >
                    <Icon size={23} />
                  </span>

                  <span className="cat-info">
                    <span>
                      <span className="cat-name">{category.name}</span>
                      <span className="cat-count" style={{ display: 'block' }}>
                        {loading
                          ? 'Loading...'
                          : `${counts[category.name] || 0} wallpapers`}
                      </span>
                    </span>
                    <ChevronRight className="cat-arrow" size={18} />
                  </span>
                </button>
              )
            })}

            {filtered.length === 0 && (
              <div className="cat-empty">
                <ImageIcon size={30} />
                <p>No matching categories found.</p>
              </div>
            )}
          </div>
        </section>

        <footer className="cat-footer">
          Powered by Senesh Chamindu
        </footer>
      </div>
    </main>
  )
  }
