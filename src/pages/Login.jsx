import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, LockKeyhole, Image } from 'lucide-react'
import { supabase } from '../lib/supabase.js'

export default function Login() {
  const [register, setRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    if (!supabase) {
      setMessage('Login setup is not configured yet.')
      return
    }

    setLoading(true)
    try {
      const result = register
        ? await supabase.auth.signUp({ email: email.trim(), password })
        : await supabase.auth.signInWithPassword({ email: email.trim(), password })

      if (result.error) throw result.error

      if (register) {
        setMessage('Account created. Check your email if confirmation is required.')
      } else {
        navigate('/')
      }
    } catch (error) {
      setMessage(error.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <style>{`
        *{box-sizing:border-box}
        .login-page{min-height:100vh;background:radial-gradient(ellipse at top,#123326 0%,#080d0a 48%,#050706 100%);color:#f4f8f5;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Inter,Arial,sans-serif}
        .login-box{width:100%;max-width:410px}
        .login-brand{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:30px}
        .login-logo{width:48px;height:48px;border-radius:15px;background:#10b981;color:#04150d;display:grid;place-items:center;box-shadow:0 8px 28px #10b98130}
        .login-brand h2{font-size:23px;margin:0;font-weight:800;letter-spacing:-.7px}
        .login-brand span{color:#34d399}
        .login-card{background:#0c120e;border:1px solid #263a2d;border-radius:22px;padding:30px;box-shadow:0 24px 80px #0005}
        .login-card h1{font-size:29px;letter-spacing:-1px;margin:0 0 9px}
        .login-sub{font-size:13px;color:#96a69b;line-height:1.7;margin:0 0 26px}
        .login-label{display:block;font-size:12px;font-weight:700;color:#d5e3d9;margin:18px 0 9px}
        .login-field{height:50px;border:1px solid #2a3b30;border-radius:12px;background:#080d09;display:flex;align-items:center;gap:11px;padding:0 14px;color:#34d399;transition:border .2s}
        .login-field:focus-within{border-color:#10b981;box-shadow:0 0 0 3px #10b98118}
        .login-field input{width:100%;min-width:0;border:0;outline:0;background:transparent;color:#f4f8f5;font-size:14px}
        .login-field input::placeholder{color:#617067}
        .login-eye{border:0;background:transparent;color:#94a59a;cursor:pointer;display:grid;place-items:center}
        .login-submit{width:100%;height:52px;border:1px solid #34d399;border-radius:12px;background:linear-gradient(135deg,#34d399,#059669);color:#04150d;font-size:14px;font-weight:800;letter-spacing:.2px;margin-top:25px;cursor:pointer;box-shadow:0 8px 25px #10b98120;transition:transform .2s,box-shadow .2s}
        .login-submit:hover{transform:translateY(-2px);box-shadow:0 12px 30px #10b98135}
        .login-submit:active{transform:scale(.98)}
        .login-submit:disabled{opacity:.6;cursor:wait;transform:none}
        .login-message{overflow-wrap:anywhere;background:#13271b;border:1px solid #254a33;color:#a7f3d0;border-radius:11px;padding:12px;margin-top:15px;font-size:12px;line-height:1.6}
        .login-switch{text-align:center;color:#96a69b;font-size:13px;margin:23px 0 0}
        .login-switch button{background:transparent;border:0;color:#34d399;font-weight:800;cursor:pointer;font-size:13px}
        .login-footer{text-align:center;color:#6e7e73;font-size:11px;margin-top:25px}
        @media(max-width:420px){.login-page{padding:18px}.login-card{padding:23px}.login-card h1{font-size:26px}}
      `}</style>

      <div className="login-box">
        <div className="login-brand">
          <div className="login-logo"><Image size={25} /></div>
          <h2>Wall <span>Universe</span></h2>
        </div>

        <section className="login-card">
          <h1>{register ? 'Create account' : 'Welcome back'}</h1>
          <p className="login-sub">
            {register
              ? 'Create your account and save your favourite wallpapers.'
              : 'Sign in to discover, save and download wallpapers.'}
          </p>

          <form onSubmit={handleSubmit}>
            <label className="login-label" htmlFor="login-email">Email address</label>
            <div className="login-field">
              <Mail size={18} />
              <input id="login-email" type="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <label className="login-label" htmlFor="login-password">Password</label>
            <div className="login-field">
              <LockKeyhole size={18} />
              <input id="login-password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" autoComplete={register ? 'new-password' : 'current-password'} minLength={6} value={password} onChange={e => setPassword(e.target.value)} required />
              <button className="login-eye" type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button className="login-submit" type="submit" disabled={loading}>
              {loading ? 'Please wait...' : register ? 'Create account →' : 'Sign in →'}
            </button>
          </form>

          {message && <div className="login-message" role="status">{message}</div>}

          <p className="login-switch">
            {register ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => { setRegister(!register); setMessage('') }}>
              {register ? 'Sign in' : 'Create account'}
            </button>
          </p>
        </section>

        <p className="login-footer">Powered by Senesh Chamindu</p>
        <p className="login-footer"><Link to="/" style={{color:'#34d399',textDecoration:'none'}}>← Back to Wall Universe</Link></p>
      </div>
    </main>
  )
}
