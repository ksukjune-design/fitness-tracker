import { Link, useLocation } from 'react-router-dom'
import { Home, Users, TrendingUp, Activity } from 'lucide-react'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: '대시보드' },
    { path: '/members', icon: Users, label: '팀원 관리' },
    { path: '/team-progress', icon: TrendingUp, label: '팀 진척도' },
  ]

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">
            <Activity className="logo-icon" />
            팀 운동 현황 관리
          </h1>
          <nav className="nav">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

