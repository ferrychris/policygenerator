import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Framework from './pages/Framework';
import Launchpad from './pages/Launchpad';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/framework" element={<Framework />} />
            <Route path="/launchpad" element={<Launchpad />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
