import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, UserPlus } from 'lucide-react'
import { storage } from '../utils/storage'
import { TeamMember } from '../types'
import './TeamMembers.css'

export default function TeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = () => {
    setMembers(storage.getMembers())
  }

  const handleDelete = (id: string) => {
    if (window.confirm('정말 이 팀원을 삭제하시겠습니까?')) {
      storage.deleteMember(id)
      loadMembers()
    }
  }

  return (
    <div className="team-members">
      <div className="page-header">
        <h2>팀원 관리</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={20} />
          팀원 추가
        </button>
      </div>

      {showAddForm && (
        <AddMemberForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            setShowAddForm(false)
            loadMembers()
          }}
        />
      )}

      {members.length === 0 ? (
        <div className="empty-state">
          <UserPlus size={48} color="#ccc" />
          <p>등록된 팀원이 없습니다.</p>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            첫 팀원 추가하기
          </button>
        </div>
      ) : (
        <div className="members-list">
          {members.map(member => (
            <div key={member.id} className="member-item">
              <div className="member-item-content">
                <div className="member-avatar-large">
                  {member.name.charAt(0)}
                </div>
                <div className="member-details">
                  <h3>{member.name}</h3>
                  <div className="member-meta">
                    <span>
                      {member.physicalInfo.height}cm / {member.physicalInfo.weight}kg
                    </span>
                    <span>•</span>
                    <span>{member.physicalInfo.age}세</span>
                    <span>•</span>
                    <span>
                      {member.physicalInfo.gender === 'male' ? '남성' :
                       member.physicalInfo.gender === 'female' ? '여성' : '기타'}
                    </span>
                  </div>
                  <div className="member-goals">
                    {member.fitnessGoals.map(goal => (
                      <span key={goal} className="goal-tag">
                        {goal === 'weight_loss' ? '체중 감량' :
                         goal === 'muscle_gain' ? '근육 증가' :
                         goal === 'endurance' ? '지구력 향상' :
                         goal === 'flexibility' ? '유연성 향상' :
                         goal === 'strength' ? '근력 강화' : '일반 건강'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="member-actions">
                <Link
                  to={`/members/${member.id}`}
                  className="btn btn-secondary"
                >
                  <Edit size={18} />
                  상세보기
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash2 size={18} />
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AddMemberForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    height: '',
    weight: '',
    age: '',
    gender: 'male' as 'male' | 'female' | 'other',
    bodyFat: '',
    muscleMass: '',
    fitnessGoals: [] as string[],
  })

  const goalOptions = [
    { value: 'weight_loss', label: '체중 감량' },
    { value: 'muscle_gain', label: '근육 증가' },
    { value: 'endurance', label: '지구력 향상' },
    { value: 'flexibility', label: '유연성 향상' },
    { value: 'strength', label: '근력 강화' },
    { value: 'general_fitness', label: '일반 건강' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email || undefined,
      physicalInfo: {
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        age: parseInt(formData.age),
        gender: formData.gender,
        bodyFat: formData.bodyFat ? parseFloat(formData.bodyFat) : undefined,
        muscleMass: formData.muscleMass ? parseFloat(formData.muscleMass) : undefined,
      },
      fitnessGoals: formData.fitnessGoals as any,
      createdAt: new Date().toISOString(),
    }

    storage.addMember(newMember)
    onSuccess()
  }

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      fitnessGoals: prev.fitnessGoals.includes(goal)
        ? prev.fitnessGoals.filter(g => g !== goal)
        : [...prev.fitnessGoals, goal]
    }))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>새 팀원 추가</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="member-form">
          <div className="form-group">
            <label>이름 *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>키 (cm) *</label>
              <input
                type="number"
                required
                value={formData.height}
                onChange={e => setFormData({ ...formData, height: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>몸무게 (kg) *</label>
              <input
                type="number"
                required
                value={formData.weight}
                onChange={e => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>나이 *</label>
              <input
                type="number"
                required
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>성별 *</label>
              <select
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
              >
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>체지방률 (%)</label>
              <input
                type="number"
                value={formData.bodyFat}
                onChange={e => setFormData({ ...formData, bodyFat: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>근육량 (kg)</label>
              <input
                type="number"
                value={formData.muscleMass}
                onChange={e => setFormData({ ...formData, muscleMass: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>운동 목적 *</label>
            <div className="goals-grid">
              {goalOptions.map(option => (
                <label key={option.value} className="goal-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.fitnessGoals.includes(option.value)}
                    onChange={() => toggleGoal(option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

