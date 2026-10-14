
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  UserRound,
  Mail,
  Heart,
  Image as ImageIcon,
  LogOut,
  ShieldCheck,
  Pencil,
  Save
} from 'lucide-react'
import { supabase } from '../lib/supabase.js'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [displayName, setDisplayName] = useState('')
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [favoriteCount, setFavoriteCount] = useState(0)

  useEffect(() => {
    let active = true

    async function loadProfile() {
      try {
        const saved = JSON.parse(
          localStorage.getItem('wall-universe-favorites') || '[]'
        )
        if (active && Array.isArray(saved)) {
          setFavoriteCount(saved.length)
        }
      } catch {
        setFavoriteCount(0)
      }

      if (!supabase) {
        if (active) setLoading(false)
        return
      }

      const { data, error } = await supabase.auth.getUser()

      if (!active) return

      if (!error && data?.user) {
        setUser(data.user)

        const { data: profile } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', data.user.id)
          .maybeSingle()

        if (active) {
          setDisplayName(
            profile?.display_name ||
            data.user.user_metadata?.display_name ||
            ''
          )
        }
      }

      if (active) setLoading(false)
    }

    loadProfile()

    return () => {
      active = false
    }
  }, [])

  async function saveProfile() {
    if (!supabase || !user) return

    setSaving(true)
    setMessage('')

    try {
      const name = displayName.trim()

      const { error } = await supabase.auth.updateUser({
        data: { display_name: name }
      })

      if (error) throw error

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          display_name: name
        })

      if (profileError) throw profileError

      setEditing(false)
      setMessage('Profile updated successfully.')
    } catch (error) {
      setMessage(error.message || 'Could not update profile.')
    } finally {
      setSaving(false)
    }
  }

  async function signOut() {
    if (!supabase) {
      navigate('/login')
      return
    }

    const { error } = await supabase.auth.signOut()

    if (error) {
      setMessage(error.message)
      return
    }

    navigate('/login')
  }

  return (
    <main className="profile-page">
      <style>{`
        .profile-page {
          min-height: 100vh;
          padding: 20px;
          background: #050706;
          color: #f4f8f5;
          font-family: Inter, Arial, sans-serif;
        }
        .profile-wrap { max-width: 760px; margin: auto; }
        .profile-top {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 28px;
        }
        .profile-back {
          width: 44px; height: 44px; display: grid;
          place-items: center; flex-shrink: 0;
          background: #101713; border: 1px solid #26372c;
          color: #e5eee8; border-radius: 13px; cursor: pointer;
        }
        .profile-back:hover { border-color: #10b981; }
        .profile-top h1 { margin: 0; font-size: 24px; }
        .profile-top p { margin: 5px 0 0; color: #91a197; font-size: 12px; }
        .profile-card {
          border: 1px solid #26372c; border-radius: 20px;
          background: #0c120e; padding: 25px;
        }
        .profile-person {
          display: flex; align-items: center; gap: 17px;
          padding-bottom: 23px; border-bottom: 1px solid #26372c;
        }
        .profile-avatar {
          width: 76px; height: 76px; flex-shrink: 0;
          display: grid; place-items: center;
          border-radius: 23px; background: #123326;
          border: 1px solid #1c5c40; color: #34d399;
        }
        .profile-person h2 { font-size: 20px; margin: 0 0 7px; overflow-wrap: anywhere; }
        .profile-person p { color: #91a197; font-size: 12px; margin: 0; overflow-wrap: anywhere; }
        .profile-status {
          display: inline-flex; align-items: center; gap: 6px;
          color: #34d399; background: #10281d;
          padding: 6px 9px; border-radius: 8px;
          font-size: 10px; font-weight: 800; margin-top: 10px;
        }
        .profile-label {
          display: block; color: #a9b8ae;
          font-size: 12px; font-weight: 700; margin: 20px 0 9px;
        }
        .profile-input {
          width: 100%; height: 48px; padding: 0 13px;
          background: #080d09; border: 1px solid #2a3b30;
          border-radius: 11px; outline: none;
          color: #f4f8f5; font-size: 13px;
        }
        .profile-input:focus { border-color: #10b981; }
        .profile-readonly {
          min-height: 48px; display: flex; align-items: center;
          gap: 10px; padding: 12px;
          background: #080d09; border: 1px solid #202e24;
          border-radius: 11px; color: #d4e1d7;
          font-size: 13px; overflow-wrap: anywhere;
        }
        .profile-readonly svg { color: #34d399; flex-shrink: 0; }
        .profile-stats {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px; margin-top: 20px;
        }
        .profile-stat {
          padding: 17px; background: #101713;
          border: 1px solid #26372c; border-radius: 13px;
        }
        .profile-stat-top { display: flex; align-items: center; gap: 8px; color: #34d399; }
        .profile-stat strong { display: block; margin-top: 12px; font-size: 21px; }
        .profile-stat span { color: #91a197; font-size: 11px; }
        .profile-actions {
          display: flex; gap: 10px; flex-wrap: wrap; margin-top: 23px;
        }
        .profile-btn {
          min-height: 44px; padding: 11px 15px;
          display: inline-flex; align-items: center;
          justify-content: center; gap: 8px;
          border: 1px solid #2a3b30; border-radius: 11px;
          background: #142219; color: #dce9df;
          font-size: 12px; font-weight: 800; cursor: pointer;
        }
        .profile-btn.primary { background: #10b981; color: #04150d; border-color: #10b981; }
        .profile-btn.danger { background: #19100f; color: #fca5a5; border-color: #49302d; }
        .profile-btn:disabled { opacity: .6; cursor: wait; }
        .profile-message {
          margin-top: 15px; padding: 12px;
          border: 1px solid #254a33; border-radius: 10px;
          color: #a7f3d0; background: #13271b;
          font-size: 12px; overflow-wrap: anywhere;
        }
        .profile-note { color: #718277; font-size: 11px; line-height: 1.7; margin-top: 20px; }
        .profile-footer { text-align: center; color: #718277; font-size: 11px; margin-top: 28px; }
        @media(max-width: 500px) {
          .profile-page { padding: 14px; }
          .profile-card { padding: 18px; }
          .profile-person { align-items: flex-start; }
          .profile-avatar { width: 62px; height: 62px; border-radius: 19px; }
          .profile-person h2 { font-size: 17px; }
          .profile-actions .profile-btn { flex: 1; }
        }
      `}</style>

      <div className="profile-wrap">
        <header className="profile-top">
          <button
            className="profile-back"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={19} />
          </button>
          <div>
            <h1>My Profile</h1>
            <p>Manage your Wall Universe account.</p>
          </div>
        </header>

        <section className="profile-card">
          <div className="profile-person">
            <div className="profile-avatar">
              <UserRound size={36} />
            </div>
            <div>
              <h2>
                {loading
                  ? 'Loading profile...'
                  : displayName || user?.email?.split('@')[0] || 'Guest User'}
              </h2>
              <p>{user?.email || 'Sign in to access your account.'}</p>
              <span className="profile-status">
                <ShieldCheck size={13} />
                {user ? 'SIGNED IN' : 'GUEST MODE'}
              </span>
            </div>
          </div>

          <label className="profile-label" htmlFor="profile-name">
            Display name
          </label>
          {editing ? (
            <input
              id="profile-name"
              className="profile-input"
              value={displayName}
              onChange={event => setDisplayName(event.target.value)}
              placeholder="Enter your display name"
              maxLength={60}
            />
          ) : (
            <div className="profile-readonly">
              <UserRound size={17} />
              {displayName || 'No display name set'}
            </div>
          )}

          <label className="profile-label">Email address</label>
          <div className="profile-readonly">
            <Mail size={17} />
            {user?.email || 'Not signed in'}
          </div>

          <div className="profile-stats">
            <div className="profile-stat">
              <div className="profile-stat-top">
                <Heart size={17} />
                <span>Favorites</span>
              </div>
              <strong>{favoriteCount}</strong>
              <span>Saved on this device</span>
            </div>

            <div className="profile-stat">
              <div className="profile-stat-top">
                <ImageIcon size={17} />
                <span>Downloads</span>
              </div>
              <strong>—</strong>
              <span>Will be available later</span>
            </div>
          </div>

          <div className="profile-actions">
            {user ? (
              <>
                {editing ? (
                  <>
                    <button
                      className="profile-btn primary"
                      onClick={saveProfile}
                      disabled={saving}
                    >
                      <Save size={16} />
                      {saving ? 'Saving...' : 'Save changes'}
                    </button>
                    <button
                      className="profile-btn"
                      onClick={() => {
                        setEditing(false)
                        setMessage('')
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="profile-btn primary"
                    onClick={() => setEditing(true)}
                  >
                    <Pencil size={16} /> Edit profile
                  </button>
                )}

                <button className="profile-btn danger" onClick={signOut}>
                  <LogOut size={16} /> Sign out
                </button>
              </>
            ) : (
              <button
                className="profile-btn primary"
                onClick={() => navigate('/login')}
              >
                <UserRound size={16} /> Sign in
              </button>
            )}

            <button
              className="profile-btn"
              onClick={() => navigate('/favorites')}
            >
              <Heart size={16} /> My favorites
            </button>
          </div>

          {message && (
            <div className="profile-message" role="status">
              {message}
            </div>
          )}

          <p className="profile-note">
            Profile editing requires a configured Supabase connection and
            the appropriate database permissions. Favorites currently use
            this device's local storage.
          </p>
        </section>

        <footer className="profile-footer">
          Powered by Senesh Chamindu
        </footer>
      </div>
    </main>
  )
      }
