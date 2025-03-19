
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Culture from './pages/Culture';
import CultureDetail from './pages/CultureDetail';
import States from './pages/States';
import StateDetails from './pages/StateDetails';
import Login from './pages/Login';
import Food from './pages/Food';
import Festivals from './pages/Festivals';
import RegionPage from './components/RegionPage';
import Navbar from './components/Navbar';
import NeoBackground from './components/NeoBackground';
import PageTransition from './components/PageTransition';
import { ThemeProvider } from './components/ThemeProvider';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-bg dark:bg-gray-900 text-light-text dark:text-white relative overflow-hidden">
        <NeoBackground />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/culture" element={<PageTransition><Culture /></PageTransition>} />
            <Route path="/culture/:id/:state" element={<PageTransition><CultureDetail /></PageTransition>} />
            <Route path="/states" element={<PageTransition><States /></PageTransition>} />
            <Route path="/states/:state" element={<PageTransition><StateDetails /></PageTransition>} />
            <Route path="/regions/:region" element={<PageTransition><RegionPage /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/food" element={<PageTransition><Food /></PageTransition>} />
            <Route path="/festivals" element={<PageTransition><Festivals /></PageTransition>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
