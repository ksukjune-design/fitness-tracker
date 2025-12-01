import { TeamMember, WorkoutLog, Encouragement } from '../types'

const STORAGE_KEYS = {
  MEMBERS: 'fitness_tracker_members',
  WORKOUT_LOGS: 'fitness_tracker_workout_logs',
  ENCOURAGEMENTS: 'fitness_tracker_encouragements',
}

export const storage = {
  // Team Members
  getMembers: (): TeamMember[] => {
    const data = localStorage.getItem(STORAGE_KEYS.MEMBERS)
    return data ? JSON.parse(data) : []
  },

  saveMembers: (members: TeamMember[]): void => {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members))
  },

  getMember: (id: string): TeamMember | undefined => {
    const members = storage.getMembers()
    return members.find(m => m.id === id)
  },

  addMember: (member: TeamMember): void => {
    const members = storage.getMembers()
    members.push(member)
    storage.saveMembers(members)
  },

  updateMember: (id: string, updates: Partial<TeamMember>): void => {
    const members = storage.getMembers()
    const index = members.findIndex(m => m.id === id)
    if (index !== -1) {
      members[index] = { ...members[index], ...updates }
      storage.saveMembers(members)
    }
  },

  deleteMember: (id: string): void => {
    const members = storage.getMembers()
    const filtered = members.filter(m => m.id !== id)
    storage.saveMembers(filtered)
  },

  // Workout Logs
  getWorkoutLogs: (): WorkoutLog[] => {
    const data = localStorage.getItem(STORAGE_KEYS.WORKOUT_LOGS)
    return data ? JSON.parse(data) : []
  },

  saveWorkoutLogs: (logs: WorkoutLog[]): void => {
    localStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(logs))
  },

  getMemberWorkoutLogs: (memberId: string): WorkoutLog[] => {
    const logs = storage.getWorkoutLogs()
    return logs.filter(log => log.memberId === memberId)
  },

  addWorkoutLog: (log: WorkoutLog): void => {
    const logs = storage.getWorkoutLogs()
    logs.push(log)
    storage.saveWorkoutLogs(logs)
  },

  updateWorkoutLog: (id: string, updates: Partial<WorkoutLog>): void => {
    const logs = storage.getWorkoutLogs()
    const index = logs.findIndex(l => l.id === id)
    if (index !== -1) {
      logs[index] = { ...logs[index], ...updates }
      storage.saveWorkoutLogs(logs)
    }
  },

  // Encouragements
  getEncouragements: (): Encouragement[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ENCOURAGEMENTS)
    return data ? JSON.parse(data) : []
  },

  saveEncouragements: (encouragements: Encouragement[]): void => {
    localStorage.setItem(STORAGE_KEYS.ENCOURAGEMENTS, JSON.stringify(encouragements))
  },

  addEncouragement: (encouragement: Encouragement): void => {
    const encouragements = storage.getEncouragements()
    encouragements.push(encouragement)
    storage.saveEncouragements(encouragements)
  },

  getEncouragementsForMember: (memberId: string): Encouragement[] => {
    const encouragements = storage.getEncouragements()
    return encouragements.filter(e => e.toMemberId === memberId)
  },
}

