import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Activity, TrendingUp, Plus } from 'lucide-react'
import { storage } from '../utils/storage'
import { TeamMember, WorkoutLog, Goal, ChallengeParticipation } from '../types'
import './Dashboard.css'

export default function Dashboard() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeWorkouts: 0,
    totalWorkouts: 0,
    workoutsThisWeek: 0,
    activeChallenges: 0,
  })

  useEffect(() => {
    const allMembers = storage.getMembers()
    const logs = storage.getWorkoutLogs()
    const goals = storage.getGoals()

    const now = new Date()
    const startOfWeekDate = new Date(now)
    startOfWeekDate.setDate(now.getDate() - now.getDay()) // 일요일 기준

    const workoutsThisWeek = logs.filter((log: WorkoutLog) => {
      const d = new Date(log.date)
      return d >= startOfWeekDate && d <= now
    }).length

    const activeChallenges = allMembers.reduce((count, m) => {
      const participations = (m.challenges || []) as ChallengeParticipation[]
      return count + participations.filter(p => !p.completed).length
    }, 0)

    setMembers(allMembers)
    setStats({
      totalMembers: allMembers.length,
      activeWorkouts: allMembers.filter(m => m.workoutPlan).length,
      totalWorkouts: logs.length,
      workoutsThisWeek,
      activeChallenges,
    })
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>대시보드</h2>
        <Link to="/members" className="btn btn-primary">
          <Plus size={20} />
          팀원 추가
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(102, 126, 234, 0.1)' }}>
            <Users size={24} color="#667eea" />
          </div>
          <div className="stat-content">
            <h3>{stats.totalMembers}</h3>
            <p>총 팀원</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(118, 75, 162, 0.1)' }}>
            <Activity size={24} color="#764ba2" />
          </div>
          <div className="stat-content">
            <h3>{stats.activeWorkouts}</h3>
            <p>활성 운동 계획</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
            <TrendingUp size={24} color="#22c55e" />
          </div>
          <div className="stat-content">
            <h3>{stats.totalWorkouts}</h3>
            <p>총 운동 기록</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.12)' }}>
            <Activity size={24} color="#3b82f6" />
          </div>
          <div className="stat-content">
            <h3>{stats.workoutsThisWeek}</h3>
            <p>이번 주 운동 횟수</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(244, 114, 182, 0.12)' }}>
            <TrendingUp size={24} color="#f973c7" />
          </div>
          <div className="stat-content">
            <h3>{stats.activeChallenges}</h3>
            <p>진행 중인 챌린지</p>
          </div>
        </div>
      </div>

      <div className="recent-members">
        <h3>팀원 목록</h3>
        {members.length === 0 ? (
          <div className="empty-state">
            <Users size={48} color="#ccc" />
            <p>등록된 팀원이 없습니다.</p>
            <Link to="/members" className="btn btn-primary">
              첫 팀원 추가하기
            </Link>
          </div>
        ) : (
          <div className="members-grid">
            {members.map(member => (
              <Link
                key={member.id}
                to={`/members/${member.id}`}
                className="member-card"
              >
                <div className="member-avatar">
                  {member.name.charAt(0)}
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p>
                    {member.physicalInfo.height}cm / {member.physicalInfo.weight}kg
                  </p>
                  {member.workoutPlan && (
                    <span className="badge">운동 계획 있음</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

