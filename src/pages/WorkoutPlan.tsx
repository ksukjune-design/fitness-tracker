import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react'
import { storage } from '../utils/storage'
import { TeamMember, WorkoutPlan, Exercise, WeeklySchedule } from '../types'
import './WorkoutPlan.css'

export default function WorkoutPlanPage() {
  const { id } = useParams<{ id: string }>()
  const [member, setMember] = useState<TeamMember | null>(null)
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  })

  useEffect(() => {
    if (id) {
      const foundMember = storage.getMember(id)
      if (foundMember) {
        setMember(foundMember)
        if (foundMember.workoutPlan) {
          setWorkoutPlan(foundMember.workoutPlan)
          setExercises(foundMember.workoutPlan.exercises)
          setWeeklySchedule(foundMember.workoutPlan.weeklySchedule)
        }
      }
    }
  }, [id])

  const handleSave = () => {
    if (!id || !member) return

    const plan: WorkoutPlan = {
      id: workoutPlan?.id || Date.now().toString(),
      memberId: id,
      goals: member.fitnessGoals,
      exercises,
      weeklySchedule,
      startDate: workoutPlan?.startDate || new Date().toISOString(),
      createdAt: workoutPlan?.createdAt || new Date().toISOString(),
    }

    storage.updateMember(id, { workoutPlan: plan })
    alert('운동 계획이 저장되었습니다!')
  }

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      type: 'strength',
      sets: 3,
      reps: 10,
    }
    setExercises([...exercises, newExercise])
  }

  const updateExercise = (exerciseId: string, updates: Partial<Exercise>) => {
    setExercises(exercises.map(ex => ex.id === exerciseId ? { ...ex, ...updates } : ex))
  }

  const deleteExercise = (exerciseId: string) => {
    setExercises(exercises.filter(ex => ex.id !== exerciseId))
    // Remove from schedule
    const newSchedule = { ...weeklySchedule }
    Object.keys(newSchedule).forEach(day => {
      newSchedule[day as keyof WeeklySchedule] = newSchedule[day as keyof WeeklySchedule].filter(id => id !== exerciseId)
    })
    setWeeklySchedule(newSchedule)
  }

  const toggleExerciseInDay = (day: keyof WeeklySchedule, exerciseId: string) => {
    const dayExercises = weeklySchedule[day]
    if (dayExercises.includes(exerciseId)) {
      setWeeklySchedule({
        ...weeklySchedule,
        [day]: dayExercises.filter(id => id !== exerciseId)
      })
    } else {
      setWeeklySchedule({
        ...weeklySchedule,
        [day]: [...dayExercises, exerciseId]
      })
    }
  }

  if (!member) {
    return (
      <div className="workout-plan">
        <div className="empty-state">
          <p>팀원을 찾을 수 없습니다.</p>
          <Link to="/members" className="btn btn-primary">돌아가기</Link>
        </div>
      </div>
    )
  }

  const days = [
    { key: 'monday', label: '월요일' },
    { key: 'tuesday', label: '화요일' },
    { key: 'wednesday', label: '수요일' },
    { key: 'thursday', label: '목요일' },
    { key: 'friday', label: '금요일' },
    { key: 'saturday', label: '토요일' },
    { key: 'sunday', label: '일요일' },
  ] as const

  return (
    <div className="workout-plan">
      <Link to={`/members/${id}`} className="back-link">
        <ArrowLeft size={20} />
        돌아가기
      </Link>

      <div className="plan-header">
        <h2>{member.name}님의 운동 계획</h2>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={20} />
          저장
        </button>
      </div>

      <div className="plan-sections">
        <div className="plan-section">
          <div className="section-header">
            <h3>운동 목록</h3>
            <button className="btn btn-secondary" onClick={addExercise}>
              <Plus size={18} />
              운동 추가
            </button>
          </div>

          <div className="exercises-list">
            {exercises.length === 0 ? (
              <p className="empty-text">운동을 추가해주세요.</p>
            ) : (
              exercises.map(exercise => (
                <div key={exercise.id} className="exercise-item">
                  <div className="exercise-form">
                    <input
                      type="text"
                      placeholder="운동 이름"
                      value={exercise.name}
                      onChange={e => updateExercise(exercise.id, { name: e.target.value })}
                      className="exercise-name"
                    />
                    <select
                      value={exercise.type}
                      onChange={e => updateExercise(exercise.id, { type: e.target.value as any })}
                    >
                      <option value="cardio">유산소</option>
                      <option value="strength">근력</option>
                      <option value="flexibility">유연성</option>
                      <option value="balance">균형</option>
                    </select>
                    {exercise.type === 'strength' && (
                      <>
                        <input
                          type="number"
                          placeholder="세트"
                          value={exercise.sets || ''}
                          onChange={e => updateExercise(exercise.id, { sets: parseInt(e.target.value) || undefined })}
                        />
                        <input
                          type="number"
                          placeholder="횟수"
                          value={exercise.reps || ''}
                          onChange={e => updateExercise(exercise.id, { reps: parseInt(e.target.value) || undefined })}
                        />
                        <input
                          type="number"
                          placeholder="무게 (kg)"
                          value={exercise.weight || ''}
                          onChange={e => updateExercise(exercise.id, { weight: parseFloat(e.target.value) || undefined })}
                        />
                      </>
                    )}
                    {exercise.type === 'cardio' && (
                      <input
                        type="number"
                        placeholder="시간 (분)"
                        value={exercise.duration || ''}
                        onChange={e => updateExercise(exercise.id, { duration: parseInt(e.target.value) || undefined })}
                      />
                    )}
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => deleteExercise(exercise.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="plan-section">
          <h3>주간 스케줄</h3>
          <div className="schedule-grid">
            {days.map(({ key, label }) => (
              <div key={key} className="schedule-day">
                <h4>{label}</h4>
                <div className="day-exercises">
                  {exercises.map(exercise => (
                    <label key={exercise.id} className="exercise-checkbox">
                      <input
                        type="checkbox"
                        checked={weeklySchedule[key].includes(exercise.id)}
                        onChange={() => toggleExerciseInDay(key, exercise.id)}
                      />
                      <span>{exercise.name || '이름 없음'}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

