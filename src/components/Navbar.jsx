import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      padding: '20px 0',
      borderBottom: '1px solid var(--secondary-color)',
      position: 'sticky',
      top: 0,
      backgroundColor: 'rgba(5, 5, 5, 0.9)',
      backdropFilter: 'blur(5px)',
      zIndex: 100
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '3px', color: 'var(--text-color)' }}>
          ZER<span className="text-accent">0</span>BLINK
        </Link>
        <div className="links">
          {/* <Link to="/writeups" style={{ marginLeft: '20px' }} className="glitch-hover">WRITEUPS</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
