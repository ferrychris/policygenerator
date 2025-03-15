import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Framework from './pages/Framework';
import Templates from './pages/Templates';
import Generator from './pages/Generator';
import Testimonials from './pages/Testimonials';
import Launchpad from './pages/Launchpad';
import Install from './pages/Install';
import Pricing from './pages/Pricing';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/framework" element={<Framework />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/launchpad" element={<Launchpad />} />
            <Route path="/install" element={<Install />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;