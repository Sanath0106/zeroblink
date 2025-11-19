import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [glitchText, setGlitchText] = useState('404');
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    // Glitch effect for 404
    const glitchChars = ['4', '0', '4', '@', '#', '$', '%', '&'];
    const glitchInterval = setInterval(() => {
      const randomGlitch = Array(3)
        .fill(0)
        .map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)])
        .join('');
      setGlitchText(randomGlitch);

      setTimeout(() => setGlitchText('404'), 100);
    }, 2000);

    // Scanning line animation
    const scanInterval = setInterval(() => {
      setScanLine((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <section
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Scanning line effect */}
      <div
        style={{
          position: 'absolute',
          top: `${scanLine}%`,
          left: 0,
          width: '100%',
          height: '2px',
          background:
            'linear-gradient(90deg, transparent, var(--accent-color), transparent)',
          boxShadow: '0 0 20px var(--accent-color)',
          transition: 'top 0.05s linear',
        }}
      ></div>

      {/* Main content */}
      <div
        style={{
          textAlign: 'center',
          zIndex: 1,
          maxWidth: '800px',
        }}
      >
        {/* 404 Glitch */}
        <h1
          style={{
            fontSize: 'clamp(8rem, 20vw, 15rem)',
            fontWeight: 'bold',
            color: 'var(--alert-color)',
            textShadow: `
              0 0 20px var(--alert-color),
              0 0 40px var(--alert-color),
              2px 2px 0 var(--accent-color),
              -2px -2px 0 #00ffff
            `,
            marginBottom: '20px',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '10px',
            animation: 'glitchShake 0.3s infinite',
          }}
        >
          {glitchText}
        </h1>

        {/* Error message */}
        <div
          style={{
            border: '2px solid var(--alert-color)',
            padding: '30px',
            backgroundColor: 'rgba(255, 0, 60, 0.05)',
            marginBottom: '40px',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#000',
              padding: '0 15px',
              color: 'var(--alert-color)',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: '0.9rem',
            }}
          >
            ERROR
          </div>

          <h2
            style={{
              color: '#fff',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              marginBottom: '15px',
              textTransform: 'uppercase',
            }}
          >
            ACCESS DENIED
          </h2>

          <p
            style={{
              color: '#888',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              fontFamily: 'var(--font-mono)',
              lineHeight: '1.8',
            }}
          >
            &gt; LOCATION NOT FOUND IN DATABASE
            <br />
            &gt; REQUESTED PATH DOES NOT EXIST
            <br />
            &gt; POSSIBLE SECURITY BREACH DETECTED
          </p>
        </div>

        {/* Action button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link
            to="/"
            style={{
              padding: '15px 40px',
              border: '2px solid var(--accent-color)',
              color: 'var(--accent-color)',
              backgroundColor: 'transparent',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              display: 'inline-block',
            }}
            className="glitch-hover"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--accent-color)';
              e.target.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'var(--accent-color)';
            }}
          >
            ← RETURN HOME
          </Link>
        </div>


      </div>

      <style>
        {`
          @keyframes glitchShake {
            0%, 100% { transform: translate(0); }
            10% { transform: translate(-5px, 5px); }
            20% { transform: translate(5px, -5px); }
            30% { transform: translate(-5px, -5px); }
            40% { transform: translate(5px, 5px); }
            50% { transform: translate(-5px, 0); }
            60% { transform: translate(5px, 0); }
            70% { transform: translate(0, -5px); }
            80% { transform: translate(0, 5px); }
            90% { transform: translate(-5px, 5px); }
          }
        `}
      </style>
    </section>
  );
};

export default NotFound;
