import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Activity, ArrowUpRight, Bell, BookOpen, BriefcaseBusiness, Building2, Check, ChevronDown, CircleHelp,
  Eye, EyeOff, FileText, Grid2X2, GraduationCap, LayoutDashboard, LogOut, LockKeyhole, Mail, Menu,
  MessageCircle, MoreHorizontal, PanelLeftClose, Search, Settings2, ShieldCheck, Sparkles, TrendingUp,
  UserRound, Users, X,
} from 'lucide-react'
import { dashboardData, activity, navByRole, roles } from './data'

const icons = { grid: Grid2X2, user: UserRound, briefcase: BriefcaseBusiness, file: FileText, message: MessageCircle, users: Users, chart: TrendingUp, graduation: GraduationCap, building: Building2, shield: ShieldCheck }

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginRole, setLoginRole] = useState('student')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)

  const submitLogin = (event) => {
    event.preventDefault()
    onLogin(loginRole)
  }

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="login-brand"><div className="brand-mark"><span></span><span></span><span></span></div><strong>campus<span>connect</span></strong></div>
        <div className="login-visual-copy"><p className="eyebrow">One campus. Every opportunity.</p><h1>Make your next move count.</h1><p>Placement intelligence that keeps students, mentors, institutions, and ambitious teams moving together.</p></div>
        <div className="login-orbit"><div className="login-core"><Sparkles size={25} /></div><span className="login-node node-a">Students</span><span className="login-node node-b">Mentors</span><span className="login-node node-c">Companies</span></div>
        <div className="login-quote"><span>“</span><p>CampusConnect helped me turn a scattered search into a clear path.</p><small>Aarav Rajan · B.Tech CSE</small></div>
      </div>
      <div className="login-form-panel">
        <div className="login-form-wrap">
          <div className="mobile-login-brand"><div className="brand-mark"><span></span><span></span><span></span></div><strong>campus<span>connect</span></strong></div>
          <p className="eyebrow">Welcome back</p><h2>Sign in to your workspace</h2><p className="login-subtitle">Choose your portal and pick up where you left off.</p>
          <form onSubmit={submitLogin}>
            <label className="field-label">I am signing in as<select value={loginRole} onChange={(event) => setLoginRole(event.target.value)}>{Object.entries(roles).map(([key, item]) => <option value={key} key={key}>{item.label}</option>)}</select><ChevronDown size={16} /></label>
            <label className="field-label">Email address<div className="input-wrap"><Mail size={17} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@campusconnect.edu" required /></div></label>
            <label className="field-label">Password<div className="input-wrap"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            <div className="form-options"><label className="check-label"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span>Remember me</span></label><button type="button" className="link-button">Forgot password?</button></div>
            <button type="submit" className="login-button">Sign in <ArrowUpRight size={17} /></button>
          </form>
          <p className="login-help">Need access? <button className="link-button">Contact your institution admin</button></p>
          <div className="login-footer"><span>Secure workspace</span><span>•</span><span>Supabase Auth ready</span></div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [role, setRole] = useState('student')
  const [authenticated, setAuthenticated] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')
  const data = dashboardData[role]
  const user = roles[role]
  const nav = navByRole[role]

  const changeRole = (nextRole) => {
    setRole(nextRole)
    setMobileOpen(false)
    setToast(`${roles[nextRole].label} portal loaded`)
    window.setTimeout(() => setToast(''), 2600)
  }

  const login = (nextRole) => {
    setRole(nextRole)
    setAuthenticated(true)
  }

  if (!authenticated) return <LoginScreen onLogin={login} />

  if (!role || !roles[role]) return <Navigate to="/" replace />

  return (
    <div className={`app-shell theme-${user.accent}`}>
      <aside className={`sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><span></span><span></span><span></span></div>
          <div><strong>campus<span>connect</span></strong><small>placement intelligence</small></div>
          <button className="mobile-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X size={18} /></button>
        </div>
        <div className="portal-picker">
          <small>Viewing portal</small>
          <select value={role} onChange={(event) => changeRole(event.target.value)} aria-label="Choose portal">
            {Object.entries(roles).map(([key, item]) => <option value={key} key={key}>{item.label} portal</option>)}
          </select>
          <ChevronDown size={15} />
        </div>
        <nav className="primary-nav" aria-label="Primary navigation">
          <small className="nav-label">Workspace</small>
          {nav.map(([label, icon]) => {
            const Icon = icons[icon]
            return <button className={`nav-item ${label === 'Overview' ? 'active' : ''}`} key={label} onClick={() => label !== 'Overview' && setToast(`${label} is ready for your workspace`)}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{label === 'Messages' && <b>3</b>}</button>
          })}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item" onClick={() => setToast('Help centre coming soon')}><CircleHelp size={18} /><span>Help centre</span></button>
          <button className="nav-item" onClick={() => setToast('Settings coming soon')}><Settings2 size={18} /><span>Settings</span></button>
          <button className="nav-item" onClick={() => setAuthenticated(false)}><LogOut size={18} /><span>Sign out</span></button>
          <div className="sidebar-user">
            <div className="avatar">{user.initials}</div><div><strong>{user.name}</strong><span>{user.label}</span></div><MoreHorizontal size={18} />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={21} /></button>
          <div className="breadcrumbs"><span>CampusConnect</span><span>/</span><strong>{user.label} portal</strong></div>
          <div className="topbar-actions">
            <label className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search anything" /><kbd>⌘ K</kbd></label>
            <button className="icon-button" aria-label="Notifications" onClick={() => setToast('You have 4 new notifications')}><Bell size={19} /><i></i></button>
            <div className="top-avatar">{user.initials}</div>
          </div>
        </header>

        <div className="page-wrap">
          <section className="hero-row">
            <div className="hero-copy"><p className="eyebrow">{data.eyebrow}</p><h1>{data.title}</h1><p className="hero-description">{data.description}</p></div>
            <div className="hero-actions"><button className="button secondary" onClick={() => setToast('Workspace export prepared')}><Activity size={16} /> Export report</button><button className="button primary" onClick={() => setToast(role === 'company' ? 'Recruitment composer opened' : 'Quick action opened')}><Sparkles size={16} /> {role === 'company' ? 'Create recruitment' : 'Quick action'}</button></div>
          </section>

          <section className="stat-grid">
            {data.stats.map(([label, value, note, tone]) => <article className="stat-card" key={label}><div className="stat-top"><span>{label}</span><MoreHorizontal size={17} /></div><strong>{value}</strong><p className={tone}><TrendingUp size={14} /> {note}</p></article>)}
          </section>

          <section className="content-grid">
            <article className="feature-panel">
              <div className="section-heading"><div><p className="section-kicker">{data.focusLabel}</p><h2>{data.focusTitle}</h2></div><button className="round-arrow" aria-label="Open details" onClick={() => setToast('Details opened')}><ArrowUpRight size={18} /></button></div>
              <div className="feature-illustration"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="feature-star"><Sparkles size={27} /></div><span className="signal signal-one"></span><span className="signal signal-two"></span><span className="signal signal-three"></span><div className="feature-tag">{role === 'student' ? '92% match' : role === 'company' ? '12 qualified' : 'Live insight'}</div></div>
              <div className="feature-footer"><div><span className="muted-label">Details</span><p>{data.focusMeta}</p></div><button className="text-button" onClick={() => setToast('Opening workspace details')}>View details <ArrowUpRight size={15} /></button></div>
            </article>
            <article className="activity-panel"><div className="section-heading"><div><p className="section-kicker">Recent activity</p><h2>What’s moving</h2></div><button className="more-button" onClick={() => setToast('Showing all activity')}>View all</button></div><div className="activity-list">{activity.map((item) => { const Icon = item.icon === 'spark' ? Sparkles : item.icon === 'check' ? Check : MessageCircle; return <div className="activity-item" key={item.title}><div className={`activity-icon ${item.tone}`}><Icon size={16} /></div><div><strong>{item.title}</strong><span>{item.meta}</span></div><MoreHorizontal size={16} /></div> })}</div><div className="activity-summary"><div className="summary-icon"><BookOpen size={16} /></div><div><strong>Weekly digest</strong><span>Everything important, in one quiet place.</span></div><button onClick={() => setToast('Digest opened')}><ArrowUpRight size={17} /></button></div></article>
          </section>

          <section className="bottom-grid"><div className="section-heading"><div><p className="section-kicker">Your workspace</p><h2>Keep the momentum</h2></div><button className="more-button" onClick={() => setToast('All workspace items loaded')}>See all</button></div><div className="workspace-cards"><button onClick={() => setToast('Profile editor opened')}><div className="workspace-icon violet"><UserRound size={20} /></div><div><strong>Complete your profile</strong><span>Make a stronger first impression</span></div><ArrowUpRight size={17} /></button><button onClick={() => setToast('Opportunity feed opened')}><div className="workspace-icon gold"><BriefcaseBusiness size={20} /></div><div><strong>Explore opportunities</strong><span>12 roles match your profile</span></div><ArrowUpRight size={17} /></button><button onClick={() => setToast('Messages opened')}><div className="workspace-icon teal"><MessageCircle size={20} /></div><div><strong>Reply to your mentor</strong><span>One message waiting for you</span></div><ArrowUpRight size={17} /></button></div></section>
        </div>
      </main>
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </div>
  )
}

export default App
