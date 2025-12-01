import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Check } from 'lucide-react'
import { storage } from '../utils/storage'
import { TeamMember, WorkoutLog, CompletedExercise } from '../types'
import './WorkoutLog.css'

export default function WorkoutLogPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [member, setMember] = useState<TeamMember | null>(null)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [exercises, setExercises] = useState<CompletedExercise[]>([])
  const [totalDuration, setTotalDuration] = useState(0)
  const [mood, setMood] = useState<'excellent' | 'good' | 'okay' | 'poor' | ''>('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (id) {
      const foundMember = storage.getMember(id)
      if (foundMember) {
        setMember(foundMember)
        if (foundMember.workoutPlan?.exercises) {
          const completedExercises: CompletedExercise[] = foundMember.workoutPlan.exercises.map(ex => ({
            exerciseId: ex.id,
            exerciseName: ex.name,
            sets: ex.sets,
            reps: ex.reps,
            duration: ex.duration,
            weight: ex.weight,
            completed: false,
          }))
          setExercises(completedExercises)
        }
      }
    }
  }, [id])

  const handleSave = () => {
    if (!id || exercises.length === 0) {
      alert('운동을 추가해주세요.')
      return
    }

    const log: WorkoutLog = {
      id: Date.now().toString(),
      memberId: id,
      date,
      exercises,
      totalDuration,
      mood: mood || undefined,
      notes: notes || undefined,
    }

    storage.addWorkoutLog(log)
    alert('운동 기록이 저장되었습니다!')
    navigate(`/members/${id}`)
  }

  const updateExercise = (exerciseId: string, updates: Partial<CompletedExercise>) => {
    setExercises(exercises.map(ex => 
      ex.exerciseId === exerciseId ? { ...ex, ...updates } : ex
    ))
  }

  const toggleComplete = (exerciseId: string) => {
    updateExercise(exerciseId, { 
      completed: !exercises.find(ex => ex.exerciseId === exerciseId)?.completed 
    })
  }

  if (!member) {
    return (
      <div className="workout-log">
        <div className="empty-state">
          <p>팀원을 찾을 수 없습니다.</p>
          <Link to="/members" className="btn btn-primary">돌아가기</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="workout-log">
      <Link to={`/members/${id}`} className="back-link">
        <ArrowLeft size={20} />
        돌아가기
      </Link>

      <div className="log-header">
        <h2>{member.name}님의 운동 기록</h2>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={20} />
          저장
        </button>
      </div>

      <div className="log-form">
        <div className="form-section">
          <label>날짜</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-section">
          <label>운동 시간 (분)</label>
          <input
            type="number"
            value={totalDuration}
            onChange={e => setTotalDuration(parseInt(e.target.value) || 0)}
            className="form-input"
          />
        </div>

        <div className="form-section">
          <label>오늘의 기분</label>
          <div className="mood-selector">
            {(['excellent', 'good', 'okay', 'poor'] as const).map(m => (
              <button
                key={m}
                type="button"
                className={`mood-btn ${mood === m ? 'active' : ''} mood-${m}`}
                onClick={() => setMood(m)}
              >
                {m === 'excellent' ? '최고' :
                 m === 'good' ? '좋음' :
                 m === 'okay' ? '보통' : '나쁨'}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>운동 목록</label>
          <div className="exercises-log">
            {exercises.length === 0 ? (
              <p className="empty-text">운동 계획이 없습니다. 먼저 운동 계획을 만들어주세요.</p>
            ) : (
              exercises.map(exercise => (
                <div key={exercise.exerciseId} className="exercise-log-item">
                  <div className="exercise-log-header">
                    <h4>{exercise.exerciseName}</h4>
                    <button
                      className={`complete-btn ${exercise.completed ? 'completed' : ''}`}
                      onClick={() => toggleComplete(exercise.exerciseId)}
                    >
                      <Check size={18} />
                      {exercise.completed ? '완료' : '미완료'}
                    </button>
                  </div>
                  <div className="exercise-log-details">
                    {exercise.sets && (
                      <div className="detail-item">
                        <label>세트</label>
                        <input
                          type="number"
                          value={exercise.sets || ''}
                          onChange={e => updateExercise(exercise.exerciseId, { sets: parseInt(e.target.value) || undefined })}
                        />
                      </div>
                    )}
                    {exercise.reps && (
                      <div className="detail-item">
                        <label>횟수</label>
                        <input
                          type="number"
                          value={exercise.reps || ''}
                          onChange={e => updateExercise(exercise.exerciseId, { reps: parseInt(e.target.value) || undefined })}
                        />
                      </div>
                    )}
                    {exercise.duration && (
                      <div className="detail-item">
                        <label>시간 (분)</label>
                        <input
                          type="number"
                          value={exercise.duration || ''}
                          onChange={e => updateExercise(exercise.exerciseId, { duration: parseInt(e.target.value) || undefined })}
                        />
                      </div>
                    )}
                    {exercise.weight !== undefined && (
                      <div className="detail-item">
                        <label>무게 (kg)</label>
                        <input
                          type="number"
                          value={exercise.weight || ''}
                          onChange={e => updateExercise(exercise.exerciseId, { weight: parseFloat(e.target.value) || undefined })}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="form-section">
          <label>메모</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="form-textarea"
            rows={4}
            placeholder="오늘의 운동에 대한 메모를 작성해주세요..."
          />
        </div>
      </div>
    </div>
  )
}

