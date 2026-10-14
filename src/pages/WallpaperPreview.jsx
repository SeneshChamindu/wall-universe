
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Download,
  Heart,
  Share2,
  Image as ImageIcon,
  Check,
  Maximize2
} from 'lucide-react'

export default function WallpaperPreview() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [favorite, setFavorite] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [copied, setCopied] = useState(false)

  // Database එක connect කරනකම් preview placeholder එකක්.
  const wallpaper = {
    title: 'Wallpaper Preview',
    category: 'Wall Universe',
    resolution: 'Original resolution',
    fileSize: 'Original file size',
    image: '',
  }

  async function shareWallpaper() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: wallpaper.title,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // User sharing එක cancel කළොත් කිසිවක් කරන්න එපා.
    }
  }

  return (
    <main className="wp-page">
      <style>{`
        .wp-page {
          min-height: 100vh;
          background: #050706;
          color: #f4f8f5;
          font-family: Inter, Arial, sans-serif;
          padding: 18px;
        }
        .wp-wrap { max-width: 1050px; margin: auto; }
        .wp-top {
          display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
          margin-bottom: 22px;
        }
        .wp-btn {
          display: inline-flex; align-items: center;
          justify-content: center; gap: 8px;
          min-height: 42px; padding: 10px 14px;
          color: #e5eee8; background: #101713;
          border: 1px solid #26372c; border-radius: 12px;
          cursor: pointer; font-size: 13px;
        }
        .wp-btn:hover { border-color: #10b981; }
        .wp-icon-btn {
          width: 44px; height: 44px; padding: 0;
          display: grid; place-items: center;
        }
        .wp-content {
          display: grid; grid-template-columns: minmax(0, 1fr) 300px;
          gap: 24px; align-items: start;
        }
        .wp-image {
          min-height: 300px; aspect-ratio: 4 / 5;
          max-height: 720px; background: #0b110d;
          border: 1px solid #24362a; border-radius: 18px;
          display: flex; align-items: center;
          justify-content: center; overflow: hidden;
          position: relative;
        }
        .wp-image img {
          width: 100%; height: 100%;
          object-fit: contain; position: absolute;
        }
        .wp-empty {
          display: flex; flex-direction: column;
          align-items: center; gap: 12px;
          color: #718277; text-align: center; padding: 20px;
        }
        .wp-empty svg { color: #10b981; }
        .wp-panel {
          background: #0c120e; border: 1px solid #24362a;
          border-radius: 18px; padding: 22px;
        }
        .wp-tag {
          display: inline-flex; padding: 6px 10px;
          background: #10281d; color: #34d399;
          border-radius: 8px; font-size: 11px;
          font-weight: 700;
        }
        .wp-title {
          font-size: 25px; line-height: 1.3;
          overflow-wrap: anywhere; margin: 14px 0 8px;
        }
        .wp-muted { color: #91a197; font-size: 13px; line-height: 1.7; }
        .wp-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 22px; }
        .wp-primary {
          background: #10b981; border-color: #10b981;
          color: #04150d; font-weight: 800;
        }
        .wp-primary:hover { background: #34d399; }
        .wp-details { margin-top: 22px; border-top: 1px solid #24362a; padding-top: 18px; }
        .wp-detail {
          display: flex; justify-content: space-between;
          gap: 12px; padding: 12px 0;
          border-bottom: 1px solid #1c2920; font-size: 12px;
        }
        .wp-detail span:first-child { color: #91a197; }
        .wp-detail span:last-child { text-align: right; overflow-wrap: anywhere; }
        .wp-notice { color: #91a197; font-size: 11px; line-height: 1.6; margin-top: 15px; }
        @media(max-width: 700px) {
          .wp-page { padding: 14px; }
          .wp-content { grid-template-columns: 1fr; gap: 16px; }
          .wp-image { min-height: 260px; max-height: 75vh; }
          .wp-title { font-size: 22px; }
          .wp-panel { padding: 18px; }
        }
      `}</style>

      <div className="wp-wrap">
        <header className="wp-top">
          <button className="wp-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} /> Back
          </button>

          <span className="wp-muted">WALL UNIVERSE</span>

          <button
            className="wp-btn wp-icon-btn"
            onClick={() => setShowDetails(!showDetails)}
            aria-label="Toggle wallpaper details"
          >
            <Maximize2 size={18} />
          </button>
        </header>

        <div className="wp-content">
          <section className="wp-image">
            {wallpaper.image ? (
              <img src={wallpaper.image} alt={wallpaper.title} />
            ) : (
              <div className="wp-empty">
                <ImageIcon size={48} />
                <strong>Wallpaper Preview</strong>
                <span className="wp-muted">
                  Wallpapers will appear here after upload.
                </span>
              </div>
            )}
          </section>

          <aside className="wp-panel">
            <span className="wp-tag">{wallpaper.category}</span>
            <h1 className="wp-title">{wallpaper.title}</h1>
            <p className="wp-muted">
              View wallpaper details, save your favorites and share with friends.
            </p>

            <div className="wp-actions">
              <button
                className="wp-btn"
                onClick={() => setFavorite(!favorite)}
                aria-pressed={favorite}
              >
                <Heart
                  size={17}
                  fill={favorite ? '#10b981' : 'none'}
                  color={favorite ? '#10b981' : 'currentColor'}
                />
                {favorite ? 'Saved' : 'Favorite'}
              </button>

              <button className="wp-btn" onClick={shareWallpaper}>
                {copied ? <Check size={17} /> : <Share2 size={17} />}
                {copied ? 'Copied' : 'Share'}
              </button>

              <button
                className="wp-btn wp-primary"
                style={{ gridColumn: '1 / -1' }}
                onClick={() => navigate('/login')}
              >
                <Download size={17} /> Sign in to Download
              </button>
            </div>

            <div className="wp-details">
              <strong>Wallpaper details</strong>

              <div className="wp-detail">
                <span>Category</span>
                <span>{wallpaper.category}</span>
              </div>
              <div className="wp-detail">
                <span>Resolution</span>
                <span>{wallpaper.resolution}</span>
              </div>
              <div className="wp-detail">
                <span>File size</span>
                <span>{wallpaper.fileSize}</span>
              </div>

              {showDetails && (
                <div className="wp-detail">
                  <span>Wallpaper ID</span>
                  <span>{id || 'Not assigned'}</span>
                </div>
              )}
            </div>

            <p className="wp-notice">
              Original quality downloads and wallpaper information will be
              enabled when the database is connected.
            </p>
          </aside>
        </div>

        <footer className="wp-muted" style={{ textAlign: 'center', marginTop: 28 }}>
          Powered by Senesh Chamindu
        </footer>
      </div>
    </main>
  )
                  }
