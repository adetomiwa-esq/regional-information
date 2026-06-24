import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import RegionDetails from './pages/RegionDetails'
import Regions from './pages/Region'
import Dashboard from './pages/Dashboard'
import CreateRegion from './pages/CreateRegion'
import EditRegion from './pages/EditREgion'
import Institutions from './pages/Institutions'
import HealthInstitutions from './pages/HealthInstitutions'
import GeographyPopulation from './pages/GeographyPopulation'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/create-region"
          element={<CreateRegion />}
        />
        <Route
          path="/regions"
          element={<Regions />}
        />
        <Route
          path="/edit-region"
          element={<EditRegion />}
        />
        <Route
          path="/institutions"
          element={<Institutions />}
        />
        <Route
  path="/health-institutions"
  element={<HealthInstitutions />}
/>
        <Route
  path="/geography-population"
  element={<GeographyPopulation />}
/>
        <Route
          path="/regions/:id"
          element={<RegionDetails />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
