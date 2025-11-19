import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [isEntering, setIsEntering] = useState(false);
  const navigate = useNavigate();

  const handleEnter = (e) => {
    e.preventDefault();
    setIsEntering(true);
    
    // Play a sound effect here if we had one
    
    setTimeout(() => {
      navigate('/archives');
    }, 2000); // Wait for animation
  };

  return (
    <section id="home" style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {isEntering && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          animation: 'flash 0.1s infinite'
        }}>
          <h1 style={{ 
            color: 'red', 
            fontSize: 'clamp(2rem, 8vw, 5rem)', 
            fontFamily: 'var(--font-mono)',
            animation: 'glitch 0.2s infinite',
            textAlign: 'center',
            padding: '0 20px'
          }}>
            SYSTEM BREACH
          </h1>
          <div style={{
            color: '#fff',
            fontSize: 'clamp(1rem, 4vw, 1.5rem)',
            marginTop: '20px',
            fontFamily: 'var(--font-mono)',
            textAlign: 'center',
            padding: '0 20px'
          }}>
            ACCESSING SECURE FILES...
          </div>
        </div>
      )}

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(5rem, 20vw, 15rem)',
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.02)',
        zIndex: 0,
        whiteSpace: 'nowrap',
        pointerEvents: 'none'
      }}>
        SILENT
      </div>
      
      <div style={{ zIndex: 1, textAlign: 'center', width: '100%', padding: '0 20px' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', marginBottom: '10px', textShadow: '0 0 10px var(--accent-dim)' }}>
          ZER<span className="text-accent blink">0</span>BLINK
        </h1>
        <p style={{ fontSize: 'clamp(0.8rem, 4vw, 1.5rem)', letterSpacing: 'clamp(2px, 1vw, 5px)', color: '#888' }}>
          &lt; <span className="text-accent">SILENT KILLERS</span> /&gt;
        </p>
        
        <div style={{ marginTop: '30px' }}>
          <button 
            onClick={handleEnter}
            style={{
              padding: '15px 40px',
              border: '1px solid var(--accent-color)',
              color: 'var(--accent-color)',
              fontSize: '1.2rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-block',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)'
            }} 
            className="glitch-hover"
          >
            Enter System
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes flash {
            0% { background-color: #000; }
            50% { background-color: #110000; }
            100% { background-color: #000; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
