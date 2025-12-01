import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Target, Activity, BarChart3 } from 'lucide-react'
import { storage } from '../utils/storage'
import { TeamMember } from '../types'
import './MemberDetail.css'

export default function MemberDetail() {
  const { id } = useParams<{ id: string }>()
  const [member, setMember] = useState<TeamMember | null>(null)
  const [workoutLogs, setWorkoutLogs] = useState<any[]>([])

  useEffect(() => {
    if (id) {
      const foundMember = storage.getMember(id)
      if (foundMember) {
        setMember(foundMember)
        const logs = storage.getMemberWorkoutLogs(id)
        setWorkoutLogs(logs)
      }
    }
  }, [id])

  if (!member) {
    return (
      <div className="member-detail">
        <div className="empty-state">
          <p>팀원을 찾을 수 없습니다.</p>
          <Link to="/members" className="btn btn-primary">
            팀원 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const goalLabels: Record<string, string> = {
    weight_loss: '체중 감량',
    muscle_gain: '근육 증가',
    endurance: '지구력 향상',
    flexibility: '유연성 향상',
    strength: '근력 강화',
    general_fitness: '일반 건강',
  }

  return (
    <div className="member-detail">
      <Link to="/members" className="back-link">
        <ArrowLeft size={20} />
        팀원 목록으로
      </Link>

      <div className="member-header">
        <div className="member-avatar-detail">
          {member.name.charAt(0)}
        </div>
        <div className="member-header-info">
          <h2>{member.name}</h2>
          <div className="member-stats">
            <span>{member.physicalInfo.height}cm</span>
            <span>•</span>
            <span>{member.physicalInfo.weight}kg</span>
            <span>•</span>
            <span>{member.physicalInfo.age}세</span>
          </div>
        </div>
      </div>

      <div className="detail-sections">
        <div className="detail-section">
          <h3>
            <Target size={20} />
            운동 목적
          </h3>
          <div className="goals-list">
            {member.fitnessGoals.map(goal => (
              <span key={goal} className="goal-badge">
                {goalLabels[goal]}
              </span>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>
            <Activity size={20} />
            신체 정보
          </h3>
          <div className="info-grid">
            <div className="info-item">
              <label>키</label>
              <span>{member.physicalInfo.height}cm</span>
            </div>
            <div className="info-item">
              <label>몸무게</label>
              <span>{member.physicalInfo.weight}kg</span>
            </div>
            <div className="info-item">
              <label>나이</label>
              <span>{member.physicalInfo.age}세</span>
            </div>
            <div className="info-item">
              <label>성별</label>
              <span>
                {member.physicalInfo.gender === 'male' ? '남성' :
                 member.physicalInfo.gender === 'female' ? '여성' : '기타'}
              </span>
            </div>
            {member.physicalInfo.bodyFat && (
              <div className="info-item">
                <label>체지방률</label>
                <span>{member.physicalInfo.bodyFat}%</span>
              </div>
            )}
            {member.physicalInfo.muscleMass && (
              <div className="info-item">
                <label>근육량</label>
                <span>{member.physicalInfo.muscleMass}kg</span>
              </div>
            )}
          </div>
        </div>

        {member.workoutPlan ? (
          <div className="detail-section">
            <h3>
              <Calendar size={20} />
              운동 계획
            </h3>
            <p>맞춤형 운동 계획이 설정되어 있습니다.</p>
            <Link to={`/workout-plan/${member.id}`} className="btn btn-primary">
              운동 계획 보기
            </Link>
          </div>
        ) : (
          <div className="detail-section">
            <h3>
              <Calendar size={20} />
              운동 계획
            </h3>
            <p>아직 운동 계획이 설정되지 않았습니다.</p>
            <Link to={`/workout-plan/${member.id}`} className="btn btn-primary">
              운동 계획 만들기
            </Link>
          </div>
        )}

        <div className="detail-section">
          <h3>
            <BarChart3 size={20} />
            운동 기록
          </h3>
          <div className="action-buttons">
            <Link to={`/workout-log/${member.id}`} className="btn btn-primary">
              운동 기록하기
            </Link>
            <Link to={`/statistics/${member.id}`} className="btn btn-secondary">
              통계 보기
            </Link>
          </div>
          {workoutLogs.length > 0 && (
            <div className="recent-logs">
              <p className="recent-logs-title">최근 기록 ({workoutLogs.length}개)</p>
              <div className="logs-list">
                {workoutLogs.slice(0, 5).map(log => (
                  <div key={log.id} className="log-item">
                    <span>{new Date(log.date).toLocaleDateString('ko-KR')}</span>
                    <span>{log.totalDuration}분</span>
                    {log.mood && (
                      <span className={`mood-badge mood-${log.mood}`}>
                        {log.mood === 'excellent' ? '최고' :
                         log.mood === 'good' ? '좋음' :
                         log.mood === 'okay' ? '보통' : '나쁨'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

