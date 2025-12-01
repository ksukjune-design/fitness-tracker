import { TeamMember, WorkoutLog, Encouragement, Goal, Challenge, ChallengeParticipation, WorkoutProgram, ExerciseTemplate } from '../types'

const STORAGE_KEYS = {
  MEMBERS: 'fitness_tracker_members',
  WORKOUT_LOGS: 'fitness_tracker_workout_logs',
  ENCOURAGEMENTS: 'fitness_tracker_encouragements',
  GOALS: 'fitness_tracker_goals',
  CHALLENGES: 'fitness_tracker_challenges',
  PROGRAMS: 'fitness_tracker_programs',
  EXERCISE_TEMPLATES: 'fitness_tracker_exercise_templates',
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

  // Goals (전역 저장 + 팀원 객체 내 중복 저장 구조)
  getGoals: (): Goal[] => {
    const data = localStorage.getItem(STORAGE_KEYS.GOALS)
    return data ? JSON.parse(data) : []
  },

  saveGoals: (goals: Goal[]): void => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals))
  },

  addGoal: (memberId: string, goal: Goal): void => {
    const goals = storage.getGoals()
    goals.push(goal)
    storage.saveGoals(goals)

    // TeamMember에도 반영
    const member = storage.getMember(memberId)
    if (member) {
      const updatedGoals = [...(member.goals || []), goal]
      storage.updateMember(memberId, { goals: updatedGoals })
    }
  },

  updateGoal: (memberId: string, goalId: string, updates: Partial<Goal>): void => {
    const goals = storage.getGoals()
    const index = goals.findIndex(g => g.id === goalId)
    if (index !== -1) {
      goals[index] = { ...goals[index], ...updates }
      storage.saveGoals(goals)
    }

    const member = storage.getMember(memberId)
    if (member?.goals) {
      const updatedGoals = member.goals.map(g => g.id === goalId ? { ...g, ...updates } : g)
      storage.updateMember(memberId, { goals: updatedGoals })
    }
  },

  // Challenges (템플릿)
  getChallenges: (): Challenge[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CHALLENGES)
    if (data) return JSON.parse(data)

    // 기본 챌린지 템플릿 시드
    const seed: Challenge[] = [
      {
        id: 'challenge_4w_weight',
        title: '4주 체중 감량 챌린지',
        description: '4주 동안 주 4회 이상 운동하고 식단을 관리해 2~3kg 감량을 목표로 합니다.',
        durationDays: 28,
        targetFrequencyPerWeek: 4,
        type: 'individual',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'challenge_5k_run',
        title: '5km 런닝 도전',
        description: '4주 안에 5km를 완주하는 것을 목표로 합니다.',
        durationDays: 28,
        targetFrequencyPerWeek: 3,
        type: 'individual',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'challenge_team_steps',
        title: '팀 걷기 챌린지 (10만 보)',
        description: '팀원 전체가 함께 1주일 동안 총 10만 보를 달성하세요.',
        durationDays: 7,
        targetFrequencyPerWeek: 7,
        type: 'team',
        createdAt: new Date().toISOString(),
      },\n    ]\n\n    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(seed))\n    return seed\n  },

  saveChallenges: (challenges: Challenge[]): void => {
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges))
  },

  addChallenge: (challenge: Challenge): void => {
    const challenges = storage.getChallenges()
    challenges.push(challenge)
    storage.saveChallenges(challenges)
  },

  // 특정 팀원의 챌린지 참여 상태는 TeamMember.challenges에 저장
  updateMemberChallenges: (memberId: string, participations: ChallengeParticipation[]): void => {
    storage.updateMember(memberId, { challenges: participations })
  },

  // Workout Programs (프로그램/프로젝트 단위)
  getPrograms: (): WorkoutProgram[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRAMS)
    return data ? JSON.parse(data) : []
  },

  savePrograms: (programs: WorkoutProgram[]): void => {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs))
  },

  addProgram: (program: WorkoutProgram): void => {
    const programs = storage.getPrograms()
    programs.push(program)
    storage.savePrograms(programs)
  },

  updateProgram: (id: string, updates: Partial<WorkoutProgram>): void => {
    const programs = storage.getPrograms()
    const index = programs.findIndex(p => p.id === id)
    if (index !== -1) {
      programs[index] = { ...programs[index], ...updates }
      storage.savePrograms(programs)
    }
  },

  // 세트 단위 운동 템플릿 카탈로그
  getExerciseTemplates: (): ExerciseTemplate[] => {
    const data = localStorage.getItem(STORAGE_KEYS.EXERCISE_TEMPLATES)
    if (data) return JSON.parse(data)

    // 최초 1회 기본 템플릿 시드
    const seed: ExerciseTemplate[] = [
      {
        id: 'sq_basic_5x5',
        name: '바벨 스쿼트 5x5',
        type: 'strength',
        defaultSets: 5,
        defaultReps: 5,
        restTime: 90,
        notes: 'StrongLifts 5x5 스타일 기본 스쿼트 세트'
      },
      {
        id: 'bp_basic_5x5',
        name: '벤치프레스 5x5',
        type: 'strength',
        defaultSets: 5,
        defaultReps: 5,
        restTime: 90
      },
      {
        id: 'dl_basic_1x5',
        name: '데드리프트 1x5',
        type: 'strength',
        defaultSets: 1,
        defaultReps: 5,
        restTime: 120
      },
      {
        id: 'run_30min',
        name: '런닝머신 30분',
        type: 'cardio',
        defaultDuration: 30,
        notes: '가벼운 조깅 또는 빠른 걷기'
      }
    ]
    localStorage.setItem(STORAGE_KEYS.EXERCISE_TEMPLATES, JSON.stringify(seed))
    return seed
  },

  saveExerciseTemplates: (templates: ExerciseTemplate[]): void => {
    localStorage.setItem(STORAGE_KEYS.EXERCISE_TEMPLATES, JSON.stringify(templates))
  },

  addExerciseTemplate: (template: ExerciseTemplate): void => {
    const templates = storage.getExerciseTemplates()
    templates.push(template)
    storage.saveExerciseTemplates(templates)
  },
}

