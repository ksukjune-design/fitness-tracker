import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import TeamMembers from './pages/TeamMembers'
import MemberDetail from './pages/MemberDetail'
import WorkoutPlan from './pages/WorkoutPlan'
import WorkoutLog from './pages/WorkoutLog'
import Statistics from './pages/Statistics'
import TeamProgress from './pages/TeamProgress'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<TeamMembers />} />
          <Route path="/members/:id" element={<MemberDetail />} />
          <Route path="/workout-plan/:id" element={<WorkoutPlan />} />
          <Route path="/workout-log/:id" element={<WorkoutLog />} />
          <Route path="/statistics/:id" element={<Statistics />} />
          <Route path="/team-progress" element={<TeamProgress />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

