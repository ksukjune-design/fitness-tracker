import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, MessageCircle, Heart } from 'lucide-react'
import { storage } from '../utils/storage'
import { TeamMember, WorkoutLog, Encouragement } from '../types'
import { format, subDays } from 'date-fns'
import './TeamProgress.css'

export default function TeamProgress() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [logs, setLogs] = useState<WorkoutLog[]>([])
  const [encouragements, setEncouragements] = useState<Encouragement[]>([])
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [encouragementMessage, setEncouragementMessage] = useState('')

  useEffect(() => {
    const allMembers = storage.getMembers()
    const allLogs = storage.getWorkoutLogs()
    const allEncouragements = storage.getEncouragements()
    
    setMembers(allMembers)
    setLogs(allLogs)
    setEncouragements(allEncouragements)
  }, [])

  const getMemberStats = (memberId: string) => {
    const memberLogs = logs.filter(log => log.memberId === memberId)
    const last7Days = subDays(new Date(), 7)
    const recentLogs = memberLogs.filter(log => new Date(log.date) >= last7Days)
    
    return {
      totalWorkouts: memberLogs.length,
      recentWorkouts: recentLogs.length,
      totalDuration: memberLogs.reduce((sum, log) => sum + (log.totalDuration || 0), 0),
      recentDuration: recentLogs.reduce((sum, log) => sum + (log.totalDuration || 0), 0),
      lastWorkout: memberLogs.length > 0 
        ? format(new Date(memberLogs[memberLogs.length - 1].date), 'yyyy-MM-dd')
        : null,
    }
  }

  const handleSendEncouragement = () => {
    if (!selectedMember || !encouragementMessage.trim()) {
      alert('팀원과 메시지를 선택해주세요.')
      return
    }

    const encouragement: Encouragement = {
      id: Date.now().toString(),
      fromMemberId: 'current-user', // 실제로는 현재 로그인한 사용자 ID
      toMemberId: selectedMember,
      message: encouragementMessage,
      createdAt: new Date().toISOString(),
    }

    storage.addEncouragement(encouragement)
    setEncouragements([...encouragements, encouragement])
    setEncouragementMessage('')
    setSelectedMember(null)
    alert('격려 메시지가 전송되었습니다!')
  }

  const getMemberEncouragements = (memberId: string) => {
    return encouragements.filter(e => e.toMemberId === memberId)
  }

  return (
    <div className="team-progress">
      <div className="page-header">
        <h2>
          <Users size={28} />
          팀 진척도
        </h2>
      </div>

      {members.length === 0 ? (
        <div className="empty-state">
          <Users size={48} color="#ccc" />
          <p>등록된 팀원이 없습니다.</p>
          <Link to="/members" className="btn btn-primary">
            팀원 추가하기
          </Link>
        </div>
      ) : (
        <>
          <div className="progress-grid">
            {members.map(member => {
              const stats = getMemberStats(member.id)
              const memberEncouragements = getMemberEncouragements(member.id)
              
              return (
                <div key={member.id} className="progress-card">
                  <div className="progress-card-header">
                    <div className="member-avatar-progress">
                      {member.name.charAt(0)}
                    </div>
                    <div className="member-name-section">
                      <h3>{member.name}</h3>
                      <Link to={`/members/${member.id}`} className="view-detail-link">
                        상세보기 →
                      </Link>
                    </div>
                  </div>

                  <div className="progress-stats">
                    <div className="stat-item">
                      <span className="stat-label">총 운동 횟수</span>
                      <span className="stat-value">{stats.totalWorkouts}회</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">최근 7일</span>
                      <span className="stat-value">{stats.recentWorkouts}회</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">총 운동 시간</span>
                      <span className="stat-value">{stats.totalDuration}분</span>
                    </div>
                    {stats.lastWorkout && (
                      <div className="stat-item">
                        <span className="stat-label">마지막 운동</span>
                        <span className="stat-value">
                          {format(new Date(stats.lastWorkout), 'MM/dd')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="progress-indicator">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${Math.min((stats.recentWorkouts / 7) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="progress-text">
                      이번 주 목표: {stats.recentWorkouts}/7일
                    </span>
                  </div>

                  {memberEncouragements.length > 0 && (
                    <div className="encouragements-section">
                      <h4>
                        <Heart size={16} />
                        격려 메시지 ({memberEncouragements.length})
                      </h4>
                      <div className="encouragements-list">
                        {memberEncouragements.slice(-3).map(enc => (
                          <div key={enc.id} className="encouragement-item">
                            <p>{enc.message}</p>
                            <span className="encouragement-date">
                              {format(new Date(enc.createdAt), 'MM/dd')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    className="btn btn-secondary btn-small"
                    onClick={() => setSelectedMember(member.id)}
                  >
                    <MessageCircle size={16} />
                    격려하기
                  </button>
                </div>
              )
            })}
          </div>

          {selectedMember && (
            <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>격려 메시지 보내기</h3>
                  <button className="close-btn" onClick={() => setSelectedMember(null)}>×</button>
                </div>
                <div className="encouragement-form">
                  <label>받는 사람</label>
                  <p className="selected-member">
                    {members.find(m => m.id === selectedMember)?.name}
                  </p>
                  <label>메시지</label>
                  <textarea
                    value={encouragementMessage}
                    onChange={e => setEncouragementMessage(e.target.value)}
                    placeholder="격려 메시지를 작성해주세요..."
                    rows={4}
                    className="form-textarea"
                  />
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setSelectedMember(null)}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSendEncouragement}
                    >
                      전송
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

