import { LoginPage } from './pages/LoginPage'
import './App.css'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import { PublicLayout } from './layout/PublicLayout'
function App() {


  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

export default App
