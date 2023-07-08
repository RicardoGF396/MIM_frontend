import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Exhibition from './components/Exhibition/Exhibition'
import Mural from './components/Mural/Mural'
import Garden from './components/Garden/Garden'
import Sculpture from './components/Sculpture/Sculpture'

function App() {
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='' element={<Exhibition />} />
          <Route path='extramuros' element={<Mural />} />
          <Route path='jardines' element={<Garden />} />
          <Route path='esculturas' element={<Sculpture />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
