import { LoginPage } from './pages/LoginPage'
import './App.css'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import { PublicLayout } from './layout/PublicLayout'
import PrivateLayout from './layout/PrivateLayout'
import { RegisterPage } from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
function App() {

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
      <Route element={<PrivateLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

export default App
