import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import DashboardLayout from "./layouts/DashboardLayout"
import Profile from "./pages/dashboard/Profile"
import Bots from "./pages/dashboard/Bots"
import Settings from "./pages/dashboard/Settings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bots" element={<Bots />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
