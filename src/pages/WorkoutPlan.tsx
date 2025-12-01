import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Save, Trash2, Dumbbell, HeartPulse, Activity, Flame } from 'lucide-react'
import { storage } from '../utils/storage'
import {
  TeamMember,
  WorkoutPlan,
  WeeklySchedule,
  ExerciseTemplate,
  ExerciseSet,
  WorkoutProgram,
  ProgramSession,
} from '../types'
import './WorkoutPlan.css'

type DayKey = keyof WeeklySchedule

type ProgramByDay = Record<DayKey, ExerciseSet[]>

export default function WorkoutPlanPage() {
  const { id } = useParams<{ id: string }>()
  const [member, setMember] = useState<TeamMember | null>(null)
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const [exerciseTemplates, setExerciseTemplates] = useState<ExerciseTemplate[]>([])
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  })
  const [programByDay, setProgramByDay] = useState<ProgramByDay>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  })
  const [selectedBodyPart, setSelectedBodyPart] = useState<'all' | ExerciseTemplate['bodyPart']>('all')

  useEffect(() => {
    // 운동 카탈로그 로드 (최초 1회 시드 포함)
    setExerciseTemplates(storage.getExerciseTemplates())
  }, [])

  useEffect(() => {
    if (!id) return

    const foundMember = storage.getMember(id)
    if (!foundMember) return

    setMember(foundMember)

    if (foundMember.workoutPlan) {
      const plan = foundMember.workoutPlan
      setWorkoutPlan(plan)
      setWeeklySchedule(plan.weeklySchedule)

      // 기존 프로그램 정보가 있으면 세트 구조로 복원
      if (plan.program) {
        const byDay: ProgramByDay = {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        }
        plan.program.sessions.forEach(session => {
          byDay[session.dayOfWeek].push(...session.exerciseSets)
        })
        setProgramByDay(byDay)
      }
    }
  }, [id])

  const handleSave = () => {
    if (!id || !member) return

    // ProgramByDay → WorkoutProgram 변환
    const sessions: ProgramSession[] = []
    const days: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    days.forEach(day => {
      const sets = programByDay[day]
      if (sets.length === 0) return

      sessions.push({
        id: `${day}-${Date.now()}`,
        name: dayLabel(day),
        dayOfWeek: day,
        exerciseSets: sets,
      })
    })

    const program: WorkoutProgram | undefined =
      sessions.length === 0
        ? undefined
        : {
            id: workoutPlan?.program?.id || `program-${Date.now()}`,
            name: workoutPlan?.program?.name || `${member.name}님의 기본 프로그램`,
            description: workoutPlan?.program?.description,
            phase: workoutPlan?.program?.phase || 'beginner',
            weeks: workoutPlan?.program?.weeks || 4,
            daysPerWeek: sessions.length,
            sessions,
            createdAt: workoutPlan?.program?.createdAt || new Date().toISOString(),
          }

    // weeklySchedule은 각 요일에 포함된 템플릿 ID의 집합으로 동기화
    const newWeeklySchedule: WeeklySchedule = {
      monday: uniqueTemplateIds(programByDay.monday),
      tuesday: uniqueTemplateIds(programByDay.tuesday),
      wednesday: uniqueTemplateIds(programByDay.wednesday),
      thursday: uniqueTemplateIds(programByDay.thursday),
      friday: uniqueTemplateIds(programByDay.friday),
      saturday: uniqueTemplateIds(programByDay.saturday),
      sunday: uniqueTemplateIds(programByDay.sunday),
    }

    const plan: WorkoutPlan = {
      id: workoutPlan?.id || Date.now().toString(),
      memberId: id,
      goals: member.fitnessGoals,
      exercises: exerciseTemplates, // 현재 카탈로그 전체를 저장
      weeklySchedule: newWeeklySchedule,
      program,
      startDate: workoutPlan?.startDate || new Date().toISOString(),
      createdAt: workoutPlan?.createdAt || new Date().toISOString(),
    }

    storage.updateMember(id, { workoutPlan: plan })
    alert('운동 계획이 저장되었습니다!')
  }

  const addSetToDay = (day: DayKey, templateId: string) => {
    if (!templateId) return
    const template = exerciseTemplates.find(t => t.id === templateId)
    if (!template) return

    const next: ExerciseSet = {
      id: `${template.id}-${Date.now()}`,
      exerciseTemplateId: template.id,
      order: programByDay[day].length + 1,
      sets: template.defaultSets || 3,
      reps: template.defaultReps,
      duration: template.defaultDuration,
      weight: template.defaultWeight,
      restTime: template.restTime,
    }

    setProgramByDay(prev => ({
      ...prev,
      [day]: [...prev[day], next],
    }))
  }

  const updateSet = (day: DayKey, setId: string, updates: Partial<ExerciseSet>) => {
    setProgramByDay(prev => ({
      ...prev,
      [day]: prev[day].map(s => (s.id === setId ? { ...s, ...updates } : s)),
    }))
  }

  const removeSet = (day: DayKey, setId: string) => {
    setProgramByDay(prev => ({
      ...prev,
      [day]: prev[day].filter(s => s.id !== setId),
    }))
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
            <h3>운동 카탈로그</h3>
          </div>
          <div className="bodypart-filter">
            {renderBodyPartFilter(selectedBodyPart, setSelectedBodyPart)}
          </div>
          <div className="template-list">
            {exerciseTemplates.length === 0 ? (
              <p className="empty-text">아직 등록된 운동 템플릿이 없습니다.</p>
            ) : (
              exerciseTemplates
                .filter(t => selectedBodyPart === 'all' || t.bodyPart === selectedBodyPart)
                .map(t => (
                  <div key={t.id} className="template-item">
                    <div className="template-main">
                      <div className="template-icon">{renderTemplateIcon(t.bodyPart)}</div>
                      <div>
                        <p className="template-name">{t.name}</p>
                        <p className="template-meta">
                          {labelForBodyPart(t.bodyPart)} ·{' '}
                          {t.defaultSets && t.defaultReps
                            ? `${t.defaultSets}세트 x ${t.defaultReps}회`
                            : t.defaultDuration
                            ? `${t.defaultDuration}분`
                            : '세트 미정'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="plan-section">
          <h3>주간 프로그램 (세트 단위)</h3>
          <div className="schedule-grid">
            {days.map(({ key, label }) => (
              <div key={key} className="schedule-day">
                <h4>{label}</h4>

                <div className="day-add-row">
                  <select
                    className="day-select"
                    defaultValue=""
                    onChange={e => {
                      addSetToDay(key, e.target.value)
                      e.target.value = ''
                    }}
                  >
                    <option value="">템플릿 선택 후 추가</option>
                    {exerciseTemplates.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-secondary btn-small"
                    onClick={() => {
                      if (exerciseTemplates[0]) {
                        addSetToDay(key, exerciseTemplates[0].id)
                      }
                    }}
                  >
                    <Plus size={16} />
                    기본 세트 추가
                  </button>
                </div>

                {programByDay[key].length === 0 ? (
                  <p className="day-empty">이 날에 등록된 세트가 없습니다.</p>
                ) : (
                  <div className="day-sets">
                    {programByDay[key].map(set => {
                      const template = exerciseTemplates.find(t => t.id === set.exerciseTemplateId)
                      return (
                        <div key={set.id} className="day-set-row">
                          <div className="day-set-main">
                            <span className="day-set-name">{template?.name || '알 수 없는 운동'}</span>
                            <span className="day-set-type">
                              {template?.type === 'strength'
                                ? '근력'
                                : template?.type === 'cardio'
                                ? '유산소'
                                : template?.type === 'flexibility'
                                ? '유연성'
                                : template?.type === 'balance'
                                ? '균형'
                                : ''}
                            </span>
                          </div>
                          <div className="day-set-inputs">
                            <label>
                              세트
                              <input
                                type="number"
                                min={1}
                                value={set.sets}
                                onChange={e =>
                                  updateSet(key, set.id, { sets: parseInt(e.target.value) || 1 })
                                }
                              />
                            </label>
                            {template?.type === 'strength' && (
                              <>
                                <label>
                                  횟수
                                  <input
                                    type="number"
                                    min={1}
                                    value={set.reps || ''}
                                    onChange={e =>
                                      updateSet(key, set.id, {
                                        reps: e.target.value ? parseInt(e.target.value) : undefined,
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  무게(kg)
                                  <input
                                    type="number"
                                    min={0}
                                    value={set.weight || ''}
                                    onChange={e =>
                                      updateSet(key, set.id, {
                                        weight: e.target.value ? parseFloat(e.target.value) : undefined,
                                      })
                                    }
                                  />
                                </label>
                              </>
                            )}
                            {template?.type === 'cardio' && (
                              <label>
                                시간(분)
                                <input
                                  type="number"
                                  min={1}
                                  value={set.duration || ''}
                                  onChange={e =>
                                    updateSet(key, set.id, {
                                      duration: e.target.value ? parseInt(e.target.value) : undefined,
                                    })
                                  }
                                />
                              </label>
                            )}
                            <button
                              type="button"
                              className="btn btn-danger btn-small"
                              onClick={() => removeSet(key, set.id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function uniqueTemplateIds(sets: ExerciseSet[]): string[] {
  return Array.from(new Set(sets.map(s => s.exerciseTemplateId)))
}

function dayLabel(day: DayKey): string {
  switch (day) {
    case 'monday':
      return '월요일 세션'
    case 'tuesday':
      return '화요일 세션'
    case 'wednesday':
      return '수요일 세션'
    case 'thursday':
      return '목요일 세션'
    case 'friday':
      return '금요일 세션'
    case 'saturday':
      return '토요일 세션'
    case 'sunday':
      return '일요일 세션'
    default:
      return '세션'
  }
}

type BodyPartOption = {
  key: 'all' | ExerciseTemplate['bodyPart']
  label: string
  icon: JSX.Element
}

const bodyPartOptions: BodyPartOption[] = [
  { key: 'all', label: '전체', icon: <Activity size={14} /> },
  { key: 'chest', label: '가슴', icon: <Dumbbell size={14} /> },
  { key: 'back', label: '등', icon: <Flame size={14} /> },
  { key: 'legs', label: '하체', icon: <Activity size={14} /> },
  { key: 'shoulders', label: '어깨', icon: <Dumbbell size={14} /> },
  { key: 'arms', label: '팔', icon: <Dumbbell size={14} /> },
  { key: 'core', label: '코어', icon: <Activity size={14} /> },
  { key: 'cardio', label: '유산소', icon: <HeartPulse size={14} /> },
  { key: 'full', label: '전신', icon: <Flame size={14} /> },
]

function renderTemplateIcon(bodyPart: ExerciseTemplate['bodyPart']) {
  switch (bodyPart) {
    case 'chest':
      return <Dumbbell size={18} color="#ef4444" />
    case 'back':
      return <Flame size={18} color="#f97316" />
    case 'legs':
      return <Activity size={18} color="#22c55e" />
    case 'shoulders':
      return <Dumbbell size={18} color="#3b82f6" />
    case 'arms':
      return <Dumbbell size={18} color="#a855f7" />
    case 'core':
      return <Activity size={18} color="#eab308" />
    case 'cardio':
      return <HeartPulse size={18} color="#ec4899" />
    case 'full':
    default:
      return <Flame size={18} color="#f97316" />
  }
}

function labelForBodyPart(bodyPart: ExerciseTemplate['bodyPart']) {
  switch (bodyPart) {
    case 'chest':
      return '가슴'
    case 'back':
      return '등'
    case 'legs':
      return '하체'
    case 'shoulders':
      return '어깨'
    case 'arms':
      return '팔'
    case 'core':
      return '코어'
    case 'cardio':
      return '유산소'
    case 'full':
    default:
      return '전신'
  }
}

function renderBodyPartFilter(
  selected: 'all' | ExerciseTemplate['bodyPart'],
  onSelect: (value: 'all' | ExerciseTemplate['bodyPart']) => void,
) {
  return (
    <div className="bodypart-filter">
      {bodyPartOptions.map(opt => (
        <button
          key={opt.key}
          type="button"
          className={`bodypart-chip ${selected === opt.key ? 'active' : ''}`}
          onClick={() => onSelect(opt.key)}
        >
          {opt.icon}
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  )
}

