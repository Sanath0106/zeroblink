import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Writeups from './components/Writeups';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="scanlines"></div>
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Contact />
            </>
          } />
          <Route path="/writeups" element={<Writeups />} />
        </Routes>

        <footer className="text-center" style={{ padding: '20px', color: '#444', fontSize: '0.8rem' }}>
          &copy; {new Date().getFullYear()} ZER0BLINK. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </Router>
  );
}

export default App;
