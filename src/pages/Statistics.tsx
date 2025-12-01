import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, TrendingUp, Activity } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { storage } from '../utils/storage'
import { TeamMember, WorkoutLog } from '../types'
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import './Statistics.css'

export default function Statistics() {
  const { id } = useParams<{ id: string }>()
  const [member, setMember] = useState<TeamMember | null>(null)
  const [logs, setLogs] = useState<WorkoutLog[]>([])
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week')

  useEffect(() => {
    if (id) {
      const foundMember = storage.getMember(id)
      if (foundMember) {
        setMember(foundMember)
        const memberLogs = storage.getMemberWorkoutLogs(id)
        setLogs(memberLogs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
      }
    }
  }, [id])

  const getChartData = () => {
    if (logs.length === 0) return []

    const now = new Date()
    let startDate: Date
    let endDate = now

    if (period === 'day') {
      startDate = subDays(now, 30)
    } else if (period === 'week') {
      // locale 옵션 없이 기본 설정 사용 (Amplify 빌드 환경에서 타입 호환성 이슈 방지)
      startDate = startOfWeek(subDays(now, 6 * 7))
      endDate = endOfWeek(now)
    } else {
      startDate = startOfMonth(subDays(now, 5))
      endDate = endOfMonth(now)
    }

    const days = eachDayOfInterval({ start: startDate, end: endDate })
    
    return days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd')
      const dayLogs = logs.filter(log => log.date === dayStr)
      
      return {
        date: format(day, period === 'day' ? 'MM/dd' : period === 'week' ? 'MM/dd' : 'yyyy-MM'),
        duration: dayLogs.reduce((sum, log) => sum + (log.totalDuration || 0), 0),
        workouts: dayLogs.length,
        mood: dayLogs.length > 0 ? dayLogs[dayLogs.length - 1].mood : null,
      }
    })
  }

  const getSummary = () => {
    const filteredLogs = logs.filter(log => {
      const logDate = new Date(log.date)
      const now = new Date()
      let startDate: Date

      if (period === 'day') {
        startDate = subDays(now, 30)
      } else if (period === 'week') {
        startDate = startOfWeek(subDays(now, 6 * 7))
      } else {
        startDate = startOfMonth(subDays(now, 5))
      }

      return logDate >= startDate
    })

    return {
      totalWorkouts: filteredLogs.length,
      totalDuration: filteredLogs.reduce((sum, log) => sum + (log.totalDuration || 0), 0),
      avgDuration: filteredLogs.length > 0 
        ? Math.round(filteredLogs.reduce((sum, log) => sum + (log.totalDuration || 0), 0) / filteredLogs.length)
        : 0,
    }
  }

  if (!member) {
    return (
      <div className="statistics">
        <div className="empty-state">
          <p>팀원을 찾을 수 없습니다.</p>
          <Link to="/members" className="btn btn-primary">돌아가기</Link>
        </div>
      </div>
    )
  }

  const chartData = getChartData()
  const summary = getSummary()

  return (
    <div className="statistics">
      <Link to={`/members/${id}`} className="back-link">
        <ArrowLeft size={20} />
        돌아가기
      </Link>

      <div className="stats-header">
        <h2>{member.name}님의 운동 통계</h2>
        <div className="period-selector">
          <button
            className={`period-btn ${period === 'day' ? 'active' : ''}`}
            onClick={() => setPeriod('day')}
          >
            일간
          </button>
          <button
            className={`period-btn ${period === 'week' ? 'active' : ''}`}
            onClick={() => setPeriod('week')}
          >
            주간
          </button>
          <button
            className={`period-btn ${period === 'month' ? 'active' : ''}`}
            onClick={() => setPeriod('month')}
          >
            월간
          </button>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <Calendar size={24} color="#667eea" />
          <div>
            <h3>{summary.totalWorkouts}</h3>
            <p>총 운동 횟수</p>
          </div>
        </div>
        <div className="summary-card">
          <TrendingUp size={24} color="#764ba2" />
          <div>
            <h3>{summary.totalDuration}분</h3>
            <p>총 운동 시간</p>
          </div>
        </div>
        <div className="summary-card">
          <Activity size={24} color="#22c55e" />
          <div>
            <h3>{summary.avgDuration}분</h3>
            <p>평균 운동 시간</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>운동 시간 추이</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="duration" stroke="#667eea" strokeWidth={2} name="운동 시간 (분)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>운동 횟수</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="workouts" fill="#764ba2" name="운동 횟수" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

