export interface TeamMember {
  id: string
  name: string
  email?: string
  profileImage?: string
  physicalInfo: PhysicalInfo
  fitnessGoals: FitnessGoal[]
  workoutPlan?: WorkoutPlan
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
  exercises: Exercise[]
  weeklySchedule: WeeklySchedule
  startDate: string
  endDate?: string
  createdAt: string
}

export interface Exercise {
  id: string
  name: string
  type: 'cardio' | 'strength' | 'flexibility' | 'balance'
  sets?: number
  reps?: number
  duration?: number // minutes
  weight?: number // kg
  restTime?: number // seconds
  notes?: string
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
}

