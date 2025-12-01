export interface TeamMember {
  id: string
  name: string
  email?: string
  profileImage?: string
  physicalInfo: PhysicalInfo
  fitnessGoals: FitnessGoal[]
  workoutPlan?: WorkoutPlan
  goals?: Goal[]
  challenges?: ChallengeParticipation[]
  createdAt: string
}

export interface PhysicalInfo {
  height: number // cm
  weight: number // kg
  age: number
  gender: 'male' | 'female' | 'other'
  bodyFat?: number // %
  muscleMass?: number // kg
}

export type FitnessGoal = 
  | 'weight_loss' 
  | 'muscle_gain' 
  | 'endurance' 
  | 'flexibility' 
  | 'strength' 
  | 'general_fitness'

export interface WorkoutPlan {
  id: string
  memberId: string
  goals: FitnessGoal[]
  exercises: ExerciseTemplate[]
  program?: WorkoutProgram
  weeklySchedule: WeeklySchedule
  startDate: string
  endDate?: string
  createdAt: string
}

// 세트 단위 운동 템플릿 (카탈로그용)
export interface ExerciseTemplate {
  id: string
  name: string
  type: 'cardio' | 'strength' | 'flexibility' | 'balance'
  defaultSets?: number
  defaultReps?: number
  defaultDuration?: number // minutes
  defaultWeight?: number // kg
  restTime?: number // seconds
  notes?: string
}

// 실제 프로그램 내에서 사용하는 세트 단위 정보
export interface ExerciseSet {
  id: string
  exerciseTemplateId: string
  order: number
  sets: number
  reps?: number
  duration?: number // minutes
  weight?: number // kg
  restTime?: number // seconds
}

// 프로젝트(프로그램) 단위 구성
export interface WorkoutProgram {
  id: string
  name: string
  description?: string
  phase?: 'beginner' | 'intermediate' | 'advanced'
  weeks: number
  daysPerWeek: number
  sessions: ProgramSession[]
  createdAt: string
}

export interface ProgramSession {
  id: string
  name: string
  dayOfWeek: keyof WeeklySchedule
  exerciseSets: ExerciseSet[]
}

export interface WeeklySchedule {
  monday: string[] // exercise IDs
  tuesday: string[]
  wednesday: string[]
  thursday: string[]
  friday: string[]
  saturday: string[]
  sunday: string[]
}

export interface WorkoutLog {
  id: string
  memberId: string
  date: string
  exercises: CompletedExercise[]
  totalDuration: number // minutes
  caloriesBurned?: number
  notes?: string
  mood?: 'excellent' | 'good' | 'okay' | 'poor'
}

export interface CompletedExercise {
  exerciseId: string
  exerciseName: string
  sets?: number
  reps?: number
  duration?: number
  weight?: number
  completed: boolean
}

export interface Encouragement {
  id: string
  fromMemberId: string
  toMemberId: string
  message: string
  createdAt: string
  likes?: number
}

// 개인 목표
export interface Goal {
  id: string
  memberId: string
  title: string
  description?: string
  type: 'weight' | 'frequency' | 'performance' | 'habit'
  targetValue?: number
  unit?: string // kg, 회/주 등
  startDate: string
  targetDate: string
  progress: number // 0~100
  status: 'ongoing' | 'completed' | 'failed'
}

// 챌린지(템플릿)
export interface Challenge {
  id: string
  title: string
  description?: string
  durationDays: number
  targetFrequencyPerWeek: number
  type: 'individual' | 'team'
  createdAt: string
}

// 특정 팀원이 참여 중인 챌린지
export interface ChallengeParticipation {
  challengeId: string
  startedAt: string
  progressDays: number
  completed: boolean
}

