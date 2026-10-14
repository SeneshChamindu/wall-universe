
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, LockKeyhole, ArrowLeft, Image } from 'lucide-react'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    if (!email.trim() || !password) {
      setMessage('Please enter your email and password.')
      return
    }

    if (mode === 'register' && password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const { supabase } = await import('../lib/supabase.js')

      if (!supabase) {
        setMessage('Authentication is not configured yet. Please try again later.')
        return
      }

      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        })

        if (error) throw error

        setMessage('Account request submitted. Check your email if confirmation is enabled.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })

        if (error) throw error

        navigate('/')
      }
    } catch (error) {
      setMessage(error.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="wu-auth">
      <style>{`
        .wu-auth{min-height:100vh;background:#070a08;color:#f3f7f4;display:grid;place-items:center;padding:22px;font-family:Inter,Arial,sans-serif}
        .wu-authbox{width:100%;max-width:420px}
        .wu-authback{display:inline-flex;gap:8px;align-items:center;color:#a5b2a9;text-decoration:none;font-size:13px;margin-bottom:28px}
        .wu-authbrand{display:flex;align-items:center;gap:12px;margin-bottom:30px}
        .wu-authlogo{width:46px;height:46px;display:grid;place-items:center;border-radius:14px;background:#103324;color:#34d399}
        .wu-authbrand strong{font-size:20px}
        .wu-authbrand span{color:#34d399}
        .wu-authcard{background:#0e1410;border:1px solid #253329;border-radius:20px;padding:26px}
        .wu-authcard h1{font-size:27px;margin:0 0 9px}
        .wu-authmuted{color:#92a097;font-size:13px;line-height:1.7}
        .wu-authlabel{display:block;font-size:12px;margin:18px 0 8px;color:#d6e0d9}
        .wu-authfield{display:flex;align-items:center;gap:10px;padding:0 12px;border:1px solid #2a382e;border-radius:10px;background:#080d09;color:#34d399}
        .wu-authfield input{min-width:0;width:100%;padding:14px 0;border:0;outline:0;background:transparent;color:#f3f7f4;font-size:14px}
        .wu-authfield button{border:0;background:transparent;color:#92a097;cursor:pointer}
        .wu-authsubmit{width:100%;padding:14px;border:0;border-radius:10px;background:#10b981;color:#04150d;font-weight:800;margin-top:22px;cursor:pointer}
        .wu-authsubmit:disabled{opacity:.6}
        .wu-authmessage{padding:11px;border-radius:9px;background:#14291d;color:#a7f3d0;font-size:12px;margin-top:14px;overflow-wrap:anywhere}
        .wu-authswitch{border:0;background:transparent;color:#34d399;cursor:pointer;font:inherit;font-weight:700}
        @media(max-width:420px){.wu-authcard{padding:20px}.wu-authcard h1{font-size:24px}}
      `}</style>

      <div className="wu-authbox">
        <Link className="wu-authback" to="/">
          <ArrowLeft size={16} /> Back to Wall Universe
        </Link>

        <div className="wu-authbrand">
          <div className="wu-authlogo"><Image size={25} /></div>
          <strong>Wall <span>Universe</span></strong>
        </div>

        <section className="wu-authcard">
          <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
          <p className="wu-authmuted">
            {mode === 'login'
              ? 'Sign in to save favorites and download wallpapers.'
              : 'Join Wall Universe and build your wallpaper collection.'}
          </p>

          <form onSubmit={handleSubmit}>
            <label className="wu-authlabel" htmlFor="wu-email">Email address</label>
            <div className="wu-authfield">
              <Mail size={18} />
              <input
                id="wu-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
              />
            </div>

            <label className="wu-authlabel" htmlFor="wu-password">Password</label>
            <div className="wu-authfield">
              <LockKeyhole size={18} />
              <input
                id="wu-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                placeholder="At least 6 characters"
                minLength={6}
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {mode === 'register' && (
              <>
                <label className="wu-authlabel" htmlFor="wu-confirm">Confirm password</label>
                <div className="wu-authfield">
                  <LockKeyhole size={18} />
                  <input
                    id="wu-confirm"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter password again"
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <button className="wu-authsubmit" type="submit" disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {message && <div className="wu-authmessage" role="status">{message}</div>}

          <p className="wu-authmuted" style={{ textAlign: 'center', marginTop: 22 }}>
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              className="wu-authswitch"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login')
                setMessage('')
              }}
            >
              {mode === 'login' ? 'Register' : 'Sign in'}
            </button>
          </p>
        </section>

        <p className="wu-authmuted" style={{ textAlign: 'center', marginTop: 22, fontSize: 11 }}>
          Powered by Senesh Chamindu 🥷
        </p>
      </div>
    </main>
  )
      }
