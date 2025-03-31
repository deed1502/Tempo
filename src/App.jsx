import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Novedades from './pages/Novedades';
import Generos from './pages/Generos';
import TopGlobales from './pages/TopGlobales';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/generos" element={<Generos />} />
        <Route path="/topGlobales" element={<TopGlobales />} />
      </Routes>
    </Router>
  )
}

export default App
