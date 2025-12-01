import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Target, Flag, Award } from 'lucide-react'
import { storage } from '../utils/storage'
import { TeamMember, Goal, Challenge, ChallengeParticipation } from '../types'
import './MemberGoals.css'

export default function MemberGoalsPage() {
  const { id } = useParams<{ id: string }>()
  const [member, setMember] = useState<TeamMember | null>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [participations, setParticipations] = useState<ChallengeParticipation[]>([])
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [goalForm, setGoalForm] = useState({
    title: '',
    type: 'weight' as Goal['type'],
    targetValue: '',
    unit: '',
    startDate: new Date().toISOString().split('T')[0],
    targetDate: '',
  })

  useEffect(() => {
    if (!id) return

    const m = storage.getMember(id)
    if (!m) return

    setMember(m)

    const allGoals = storage.getGoals().filter(g => g.memberId === id)
    setGoals(allGoals)

    const tmpl = storage.getChallenges()
    setChallenges(tmpl)

    setParticipations(m.challenges || [])
  }, [id])

  if (!member || !id) {
    return (
      <div className="member-goals">
        <div className="empty-state">
          <p>팀원을 찾을 수 없습니다.</p>
          <Link to="/members" className="btn btn-primary">
            팀원 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!goalForm.title.trim()) return

    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      memberId: id,
      title: goalForm.title,
      description: undefined,
      type: goalForm.type,
      targetValue: goalForm.targetValue ? parseFloat(goalForm.targetValue) : undefined,
      unit: goalForm.unit || undefined,
      startDate: goalForm.startDate,
      targetDate: goalForm.targetDate || goalForm.startDate,
      progress: 0,
      status: 'ongoing',
    }

    storage.addGoal(id, newGoal)
    const updated = storage.getGoals().filter(g => g.memberId === id)
    setGoals(updated)
    setShowGoalForm(false)
    setGoalForm({
      title: '',
      type: 'weight',
      targetValue: '',
      unit: '',
      startDate: new Date().toISOString().split('T')[0],
      targetDate: '',
    })
  }

  const handleUpdateGoalProgress = (goalId: string, progress: number) => {
    storage.updateGoal(member.id, goalId, {
      progress,
      status: progress >= 100 ? 'completed' : 'ongoing',
    })
    const updated = storage.getGoals().filter(g => g.memberId === member.id)
    setGoals(updated)
  }

  const handleJoinChallenge = (challengeId: string) => {
    const already = participations.find(p => p.challengeId === challengeId && !p.completed)
    if (already) {
      alert('이미 참여 중인 챌린지입니다.')
      return
    }

    const next: ChallengeParticipation = {
      challengeId,
      startedAt: new Date().toISOString(),
      progressDays: 0,
      completed: false,
    }

    const nextList = [...participations, next]
    setParticipations(nextList)
    storage.updateMemberChallenges(member.id, nextList)
  }

  const handleUpdateChallenge = (challengeId: string, updates: Partial<ChallengeParticipation>) => {
    const nextList = participations.map(p =>
      p.challengeId === challengeId ? { ...p, ...updates } : p,
    )
    setParticipations(nextList)
    storage.updateMemberChallenges(member.id, nextList)
  }

  const activeParticipations = participations.filter(p => !p.completed)

  const goalTypeLabel = (type: Goal['type']) => {
    switch (type) {
      case 'weight':
        return '체중 목표'
      case 'frequency':
        return '빈도 목표'
      case 'performance':
        return '퍼포먼스 목표'
      case 'habit':
        return '습관 목표'
      default:
        return '목표'
    }
  }

  return (
    <div className="member-goals">
      <Link to={`/members/${member.id}`} className="back-link">
        <ArrowLeft size={20} />
        팀원 상세로
      </Link>

      <div className="goals-header">
        <h2>{member.name}님의 목표 & 챌린지</h2>
      </div>

      <div className="goals-layout">
        <section className="goals-section">
          <div className="section-header">
            <h3>
              <Target size={20} />
              개인 목표
            </h3>
            <button
              type="button"
              className="btn btn-primary btn-small"
              onClick={() => setShowGoalForm(true)}
            >
              목표 추가
            </button>
          </div>

          {goals.length === 0 ? (
            <p className="empty-text">아직 등록된 목표가 없습니다.</p>
          ) : (
            <div className="goal-list">
              {goals.map(goal => (
                <div key={goal.id} className="goal-card">
                  <div className="goal-main">
                    <div>
                      <p className="goal-title">{goal.title}</p>
                      <p className="goal-type">{goalTypeLabel(goal.type)}</p>
                    </div>
                    <span
                      className={`goal-status goal-status-${goal.status}`}
                    >
                      {goal.status === 'completed'
                        ? '완료'
                        : goal.status === 'failed'
                        ? '실패'
                        : '진행 중'}
                    </span>
                  </div>
                  <div className="goal-meta">
                    <span>
                      기간: {goal.startDate} ~ {goal.targetDate}
                    </span>
                    {goal.targetValue && goal.unit && (
                      <span>
                        목표: {goal.targetValue}
                        {goal.unit}
                      </span>
                    )}
                  </div>
                  <div className="goal-progress-row">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={goal.progress}
                      onChange={e =>
                        handleUpdateGoalProgress(goal.id, parseInt(e.target.value) || 0)
                      }
                    />
                    <span className="goal-progress-label">{goal.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="goals-section">
          <div className="section-header">
            <h3>
              <Flag size={20} />
              챌린지
            </h3>
          </div>

          {challenges.length === 0 ? (
            <p className="empty-text">아직 등록된 챌린지가 없습니다.</p>
          ) : (
            <div className="challenge-list">
              {challenges.map(challenge => {
                const participation = participations.find(
                  p => p.challengeId === challenge.id && !p.completed,
                )
                const progressRatio =
                  participation && challenge.durationDays > 0
                    ? Math.min(
                        100,
                        Math.round(
                          (participation.progressDays / challenge.durationDays) * 100,
                        ),
                      )
                    : 0

                return (
                  <div key={challenge.id} className="challenge-card">
                    <div className="challenge-main">
                      <p className="challenge-title">{challenge.title}</p>
                      <p className="challenge-meta">
                        기간 {challenge.durationDays}일 · 주 {challenge.targetFrequencyPerWeek}
                        회 목표 · {challenge.type === 'team' ? '팀 챌린지' : '개인 챌린지'}
                      </p>
                    </div>
                    <p className="challenge-desc">{challenge.description}</p>

                    {participation ? (
                      <div className="challenge-progress">
                        <div className="challenge-progress-bar">
                          <div
                            className="challenge-progress-fill"
                            style={{ width: `${progressRatio}%` }}
                          />
                        </div>
                        <div className="challenge-progress-info">
                          <span>
                            진행: {participation.progressDays}/{challenge.durationDays}일
                          </span>
                          <button
                            type="button"
                            className="btn btn-secondary btn-small"
                            onClick={() =>
                              handleUpdateChallenge(challenge.id, {
                                progressDays: participation.progressDays + 1,
                              })
                            }
                          >
                            +1일 완료
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary btn-small"
                            onClick={() =>
                              handleUpdateChallenge(challenge.id, {
                                completed: true,
                              })
                            }
                          >
                            완료 처리
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary btn-small"
                        onClick={() => handleJoinChallenge(challenge.id)}
                      >
                        챌린지 시작
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>

      {showGoalForm && (
        <div className="modal-overlay" onClick={() => setShowGoalForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>새 목표 추가</h3>
              <button
                className="close-btn"
                onClick={() => setShowGoalForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateGoal} className="goal-form">
              <div className="form-group">
                <label>목표 제목 *</label>
                <input
                  type="text"
                  required
                  value={goalForm.title}
                  onChange={e => setGoalForm({ ...goalForm, title: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>목표 유형 *</label>
                  <select
                    value={goalForm.type}
                    onChange={e =>
                      setGoalForm({
                        ...goalForm,
                        type: e.target.value as Goal['type'],
                      })
                    }
                  >
                    <option value="weight">체중</option>
                    <option value="frequency">운동 빈도</option>
                    <option value="performance">퍼포먼스(기록)</option>
                    <option value="habit">습관</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>목표 값</label>
                  <div className="inline-inputs">
                    <input
                      type="number"
                      value={goalForm.targetValue}
                      onChange={e =>
                        setGoalForm({ ...goalForm, targetValue: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="단위 (kg, 회/주 등)"
                      value={goalForm.unit}
                      onChange={e =>
                        setGoalForm({ ...goalForm, unit: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>시작일 *</label>
                  <input
                    type="date"
                    required
                    value={goalForm.startDate}
                    onChange={e =>
                      setGoalForm({ ...goalForm, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>목표 달성일</label>
                  <input
                    type="date"
                    value={goalForm.targetDate}
                    onChange={e =>
                      setGoalForm({ ...goalForm, targetDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowGoalForm(false)}
                >
                  취소
                </button>
                <button type="submit" className="btn btn-primary">
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


