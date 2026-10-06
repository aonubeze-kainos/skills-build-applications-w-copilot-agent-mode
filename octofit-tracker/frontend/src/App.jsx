import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <nav className="navbar navbar-expand-lg container py-3" aria-label="Main navigation">
          <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/activities">
            <img src="/octofitapp-small.png" alt="" width="42" height="42" />
            <span>OctoFit Tracker</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-navigation"
            aria-controls="main-navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="main-navigation">
            <div className="navbar-nav ms-auto">
              {navigation.map(({ label, path }) => (
                <NavLink
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  key={path}
                  to={path}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="container py-4 py-lg-5">
        <Routes>
          <Route path="/" element={<Navigate replace to="/activities" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/activities" />} />
        </Routes>
      </main>
      <footer className="app-footer py-4">
        <div className="container small text-center">
          Move a little. Celebrate a lot.
        </div>
      </footer>
    </div>
  )
}

export default App
