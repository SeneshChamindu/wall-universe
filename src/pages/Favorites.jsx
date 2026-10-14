
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  Search,
  Trash2,
  Download,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react'

const STORAGE_KEY = 'wall-universe-favorites'

export default function Favorites() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (Array.isArray(saved)) setFavorites(saved)
    } catch {
      setFavorites([])
    }
  }, [])

  function removeFavorite(id) {
    const updated = favorites.filter(item => item.id !== id)
    setFavorites(updated)

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // Storage unavailable.
    }
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    return favorites.filter(item =>
      `${item.title || ''} ${item.category || ''}`
        .toLowerCase()
        .includes(query)
    )
  }, [favorites, search])

  return (
    <main className="fav-page">
      <style>{`
        .fav-page {
          min-height: 100vh;
          padding: 20px;
          background: #050706;
          color: #f4f8f5;
          font-family: Inter, Arial, sans-serif;
        }
        .fav-wrap { max-width: 1100px; margin: auto; }
        .fav-header {
          display: flex; align-items: center;
          gap: 14px; margin-bottom: 28px;
        }
        .fav-back {
          width: 44px; height: 44px; flex-shrink: 0;
          display: grid; place-items: center;
          background: #101713; color: #e5eee8;
          border: 1px solid #26372c; border-radius: 13px;
          cursor: pointer;
        }
        .fav-back:hover { border-color: #10b981; }
        .fav-heading { flex: 1; min-width: 0; }
        .fav-heading h1 { font-size: 24px; margin: 0; }
        .fav-heading p { color: #91a197; font-size: 12px; margin: 6px 0 0; }
        .fav-search {
          height: 44px; display: flex; align-items: center;
          gap: 9px; padding: 0 13px; color: #34d399;
          border: 1px solid #26372c; border-radius: 12px;
          background: #0c120e; width: 260px;
        }
        .fav-search input {
          min-width: 0; width: 100%; border: 0; outline: 0;
          background: transparent; color: #f4f8f5; font-size: 13px;
        }
        .fav-search input::placeholder { color: #718277; }
        .fav-count { color: #91a197; font-size: 12px; margin-bottom: 17px; }
        .fav-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }
        .fav-card {
          overflow: hidden; border: 1px solid #24362a;
          border-radius: 16px; background: #0c120e;
          min-width: 0;
        }
        .fav-image {
          aspect-ratio: 3 / 4; position: relative;
          display: grid; place-items: center;
          background: #101713; overflow: hidden;
        }
        .fav-image img { width: 100%; height: 100%; object-fit: cover; }
        .fav-placeholder { display: grid; place-items: center; gap: 10px; color: #718277; font-size: 12px; }
        .fav-placeholder svg { color: #10b981; }
        .fav-remove {
          position: absolute; top: 10px; right: 10px;
          width: 37px; height: 37px; display: grid;
          place-items: center; border-radius: 11px;
          color: #fda4af; background: #080d09dd;
          border: 1px solid #3a302f; cursor: pointer;
        }
        .fav-info { padding: 13px; }
        .fav-title { margin: 0; font-size: 13px; font-weight: 750; overflow-wrap: anywhere; }
        .fav-category { color: #91a197; font-size: 11px; margin-top: 6px; }
        .fav-actions { display: flex; gap: 8px; margin-top: 12px; }
        .fav-action {
          min-height: 36px; display: inline-flex; align-items: center;
          justify-content: center; gap: 7px; flex: 1;
          background: #142219; border: 1px solid #26372c;
          color: #34d399; border-radius: 10px;
          font-size: 11px; font-weight: 700; cursor: pointer;
        }
        .fav-action:hover { border-color: #10b981; }
        .fav-empty {
          padding: 55px 20px; text-align: center;
          border: 1px dashed #26372c; border-radius: 18px;
          color: #91a197;
        }
        .fav-empty svg { color: #10b981; }
        .fav-empty h2 { color: #f4f8f5; font-size: 18px; margin: 14px 0 8px; }
        .fav-empty p { font-size: 12px; line-height: 1.7; }
        .fav-browse {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 16px; border: 0; border-radius: 11px;
          background: #10b981; color: #04150d;
          font-size: 12px; font-weight: 800; cursor: pointer;
          margin-top: 12px;
        }
        .fav-footer { text-align: center; color: #718277; font-size: 11px; margin-top: 35px; }
        @media(max-width: 800px) {
          .fav-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
          .fav-header { flex-wrap: wrap; }
          .fav-search { width: 100%; order: 2; }
        }
        @media(max-width: 520px) {
          .fav-page { padding: 14px; }
          .fav-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
          .fav-heading h1 { font-size: 21px; }
          .fav-info { padding: 10px; }
        }
      `}</style>

      <div className="fav-wrap">
        <header className="fav-header">
          <button
            className="fav-back"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={19} />
          </button>

          <div className="fav-heading">
            <h1>My Favorites <Heart size={20} fill="#10b981" color="#10b981" /></h1>
            <p>Your personal wallpaper collection.</p>
          </div>

          <label className="fav-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search saved wallpapers..."
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </label>
        </header>

        <p className="fav-count">
          {favorites.length} saved {favorites.length === 1 ? 'wallpaper' : 'wallpapers'}
        </p>

        {filtered.length > 0 ? (
          <section className="fav-grid">
            {filtered.map((item, index) => (
              <article className="fav-card" key={item.id ?? index}>
                <div className="fav-image">
                  {item.image_url || item.image ? (
                    <img
                      src={item.image_url || item.image}
                      alt={item.title || 'Saved wallpaper'}
                      loading="lazy"
                    />
                  ) : (
                    <div className="fav-placeholder">
                      <ImageIcon size={30} />
                      <span>Preview unavailable</span>
                    </div>
                  )}

                  <button
                    className="fav-remove"
                    onClick={() => removeFavorite(item.id)}
                    aria-label="Remove from favorites"
                    title="Remove from favorites"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="fav-info">
                  <h2 className="fav-title">{item.title || 'Untitled wallpaper'}</h2>
                  <p className="fav-category">{item.category || 'Wall Universe'}</p>

                  <div className="fav-actions">
                    <button
                      className="fav-action"
                      onClick={() => navigate(`/wallpaper/${item.id}`)}
                    >
                      <ExternalLink size={14} /> View
                    </button>

                    <button
                      className="fav-action"
                      onClick={() => navigate('/login')}
                    >
                      <Download size={14} /> Download
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="fav-empty">
            <Heart size={42} />
            <h2>{search ? 'No matching wallpapers' : 'No favorites yet'}</h2>
            <p>
              {search
                ? 'Try searching with another keyword.'
                : 'Save wallpapers you love and they will appear here.'}
            </p>
            {!search && (
              <button className="fav-browse" onClick={() => navigate('/')}>
                Explore wallpapers
              </button>
            )}
          </section>
        )}

        <footer className="fav-footer">Powered by Senesh Chamindu</footer>
      </div>
    </main>
  )
          }
