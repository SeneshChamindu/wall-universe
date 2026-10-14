
import { useState } from 'react'
import {
  LayoutDashboard,
  Images,
  Users,
  FolderOpen,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  Upload,
  Download,
  Heart,
  TrendingUp,
  ShieldCheck,
  ImagePlus,
  MoreVertical,
  Plus,
  LockKeyhole,
} from 'lucide-react'

const menu = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Wallpapers', icon: Images },
  { name: 'Categories', icon: FolderOpen },
  { name: 'Users', icon: Users },
  { name: 'Settings', icon: Settings },
]

export default function Admin() {
  const [section, setSection] = useState('Overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')

  const stats = [
    { label: 'Total Wallpapers', value: '0', icon: Images, note: 'No uploads yet' },
    { label: 'Total Downloads', value: '0', icon: Download, note: 'Downloads tracked' },
    { label: 'Total Users', value: '0', icon: Users, note: 'Registered accounts' },
    { label: 'Total Favorites', value: '0', icon: Heart, note: 'Saved wallpapers' },
  ]

  return (
    <div className="wu-admin">
      <style>{`
        .wu-admin{min-height:100vh;background:#080b09;color:#eef5f0;font-family:Inter,Arial,sans-serif;display:flex}
        .wu-sidebar{width:245px;background:#0c110e;border-right:1px solid #202b24;padding:24px 16px;flex-shrink:0}
        .wu-brand{font-size:21px;font-weight:800;padding:6px 10px 30px}
        .wu-brand span{color:#10b981}
        .wu-label{font-size:10px;letter-spacing:2px;color:#738078;padding:12px}
        .wu-menu{display:flex;align-items:center;gap:12px;width:100%;padding:13px 12px;border:0;border-radius:10px;color:#9eaaa2;background:transparent;text-align:left;cursor:pointer;margin:3px 0;font-size:13px}
        .wu-menu.active,.wu-menu:hover{background:#123526;color:#34d399}
        .wu-main{flex:1;min-width:0}
        .wu-top{height:76px;border-bottom:1px solid #202b24;display:flex;align-items:center;justify-content:space-between;padding:0 28px;gap:14px}
        .wu-content{padding:28px;max-width:1400px;margin:auto}
        .wu-muted{color:#849188;font-size:13px;line-height:1.7}
        .wu-title{font-size:26px;font-weight:750;margin:0 0 8px}
        .wu-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px;margin:26px 0}
        .wu-card{background:#101712;border:1px solid #233128;border-radius:15px;padding:19px;min-width:0}
        .wu-stathead{display:flex;justify-content:space-between;align-items:center;gap:8px;color:#aab6ad;font-size:12px}
        .wu-icon{width:38px;height:38px;border-radius:11px;background:#123526;color:#34d399;display:grid;place-items:center}
        .wu-number{font-size:28px;font-weight:800;margin:18px 0 7px}
        .wu-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 14px;border:1px solid #2b3b30;background:#111a14;color:#e6f4eb;border-radius:10px;cursor:pointer;font-size:12px}
        .wu-primary{background:#10b981;border-color:#10b981;color:#04150d;font-weight:800}
        .wu-row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .wu-table{width:100%;border-collapse:collapse;margin-top:14px;font-size:12px}
        .wu-table th,.wu-table td{text-align:left;padding:15px 12px;border-bottom:1px solid #263129}
        .wu-table th{color:#89988e;font-weight:500}
        .wu-empty{text-align:center;padding:36px 15px}
        .wu-input{background:#0a100c;border:1px solid #2a382e;border-radius:9px;padding:11px;color:white;outline:none;max-width:100%}
        .wu-status{display:inline-flex;padding:5px 9px;border-radius:20px;background:#143626;color:#6ee7b7;font-size:11px}
        .wu-mobile{display:none}
        @media(max-width:900px){.wu-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.wu-content{padding:20px}}
        @media(max-width:600px){
          .wu-sidebar{display:none;position:fixed;z-index:10;inset:0 auto 0 0;width:260px;box-shadow:20px 0 80px #0009}
          .wu-sidebar.open{display:block}
          .wu-mobile{display:inline-flex}
          .wu-top{height:65px;padding:0 15px}
          .wu-content{padding:19px 14px}
          .wu-title{font-size:23px}
          .wu-grid{gap:9px}
          .wu-card{padding:13px}
          .wu-number{font-size:24px}
          .wu-table{min-width:500px}
          .wu-tablewrap{overflow:auto}
        }
      `}</style>

      <aside className={`wu-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="wu-row" style={{ padding: '0 8px' }}>
          <div className="wu-brand">WALL <span>UNIVERSE</span></div>
          <button className="wu-btn wu-mobile" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>
        <div className="wu-label">WORKSPACE</div>
        {menu.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={`wu-menu ${section === name ? 'active' : ''}`}
            onClick={() => { setSection(name); setSidebarOpen(false) }}
          >
            <Icon size={18} /> {name}
          </button>
        ))}
        <div style={{ marginTop: 38, padding: 13, border: '1px solid #26392c', borderRadius: 12 }}>
          <ShieldCheck size={22} color="#34d399" />
          <p style={{ fontSize: 12, fontWeight: 700 }}>Admin workspace</p>
          <p className="wu-muted" style={{ fontSize: 11 }}>Manage your wallpaper platform.</p>
        </div>
        <p className="wu-muted" style={{ padding: '20px 10px', fontSize: 11 }}>Wall Universe · Admin UI</p>
      </aside>

      <div className="wu-main">
        <header className="wu-top">
          <div className="wu-row" style={{ justifyContent: 'flex-start' }}>
            <button className="wu-btn wu-mobile" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <Menu size={19} />
            </button>
            <span className="wu-muted">Admin / {section}</span>
          </div>
          <div className="wu-row">
            <button className="wu-btn" aria-label="Notifications"><Bell size={17} /></button>
            <div style={{ width: 34, height: 34, borderRadius: 11, background: '#123526', display: 'grid', placeItems: 'center', color: '#34d399' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
        </header>

        <main className="wu-content">
          <div className="wu-row">
            <div>
              <h1 className="wu-title">
                {section === 'Overview' ? 'Dashboard overview' : section}
              </h1>
              <p className="wu-muted">Welcome to your Wall Universe control center.</p>
            </div>
            {section === 'Wallpapers' && (
              <button className="wu-btn wu-primary" onClick={() => document.getElementById('wu-upload')?.click()}>
                <Upload size={16} /> Upload wallpapers
              </button>
            )}
          </div>

          {section === 'Overview' && (
            <>
              <div className="wu-grid">
                {stats.map(({ label, value, icon: Icon, note }) => (
                  <div className="wu-card" key={label}>
                    <div className="wu-stathead">
                      <span>{label}</span>
                      <div className="wu-icon"><Icon size={18} /></div>
                    </div>
                    <div className="wu-number">{value}</div>
                    <div className="wu-muted" style={{ fontSize: 11 }}>{note}</div>
                  </div>
                ))}
              </div>
              <div className="wu-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))' }}>
                <div className="wu-card">
                  <TrendingUp size={21} color="#34d399" />
                  <h3>Platform activity</h3>
                  <p className="wu-muted">Download and upload analytics will appear after the database is connected.</p>
                </div>
                <div className="wu-card">
                  <LockKeyhole size={21} color="#34d399" />
                  <h3>Security status</h3>
                  <p className="wu-muted">Connect Supabase Auth and database policies before enabling admin actions.</p>
                </div>
              </div>
            </>
          )}

          {section === 'Wallpapers' && (
            <div className="wu-card" style={{ marginTop: 25 }}>
              <div className="wu-row">
                <div>
                  <h3 style={{ margin: 0 }}>Wallpaper library</h3>
                  <p className="wu-muted">Uploaded wallpapers will be listed here.</p>
                </div>
                <input className="wu-input" placeholder="Search wallpapers..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <input id="wu-upload" type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => {
                const files = Array.from(e.target.files || [])
                alert(`${files.length} file(s) selected. Connect Supabase Storage to upload them.`)
              }} />
              <div className="wu-empty">
                <ImagePlus size={35} color="#34d399" />
                <h3>No wallpapers uploaded</h3>
                <p className="wu-muted">This library will display your uploaded files once storage is connected.</p>
                <button className="wu-btn wu-primary" onClick={() => document.getElementById('wu-upload')?.click()}>
                  <Plus size={16} /> Choose images
                </button>
              </div>
            </div>
          )}

          {section === 'Categories' && (
            <div className="wu-card" style={{ marginTop: 25 }}>
              <h3>Categories</h3>
              <p className="wu-muted">Your planned categories are ready to configure.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 20 }}>
                {['Anime', 'Cars', 'Nature', 'Gaming', 'AMOLED', 'Space', 'Abstract', 'Minimal', '4K'].map(c => (
                  <span className="wu-status" key={c}>{c}</span>
                ))}
              </div>
              <p className="wu-muted" style={{ marginTop: 20 }}>Saving and editing categories requires the database connection.</p>
            </div>
          )}

          {section === 'Users' && (
            <div className="wu-card" style={{ marginTop: 25 }}>
              <h3>User management</h3>
              <p className="wu-muted">User records will appear here after authentication is configured.</p>
              <div className="wu-empty"><Users size={34} color="#34d399" /><p>No user records available yet.</p></div>
            </div>
          )}

          {section === 'Settings' && (
            <div className="wu-card" style={{ marginTop: 25 }}>
              <h3>Admin settings</h3>
              <p className="wu-muted">Platform configuration</p>
              <div style={{ padding: '14px 0', borderBottom: '1px solid #263129' }}>
                <strong style={{ fontSize: 13 }}>Storage provider</strong>
                <p className="wu-muted">Supabase Storage · Not connected</p>
              </div>
              <div style={{ padding: '14px 0' }}>
                <strong style={{ fontSize: 13 }}>Authentication</strong>
                <p className="wu-muted">Supabase Auth · Not connected</p>
              </div>
            </div>
          )}

          <p className="wu-muted" style={{ textAlign: 'center', marginTop: 35, fontSize: 11 }}>
            Wall Universe · Admin interface preview
          </p>
        </main>
      </div>
    </div>
  )
    }
