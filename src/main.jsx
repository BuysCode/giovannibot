import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './Map'
import Region from './Region'
import LandingPage from './landingPage.jsx'

const root = document.getElementById('root')

createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index path='/' element={<LandingPage />} />
      <Route path='/map' element={<App />} />
      <Route path='/region/:regionName' element={<Region />} />
    </Routes>
  </BrowserRouter>
);
