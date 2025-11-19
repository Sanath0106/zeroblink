import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Writeups = () => {
  const [text, setText] = useState('');
  const fullText = "INITIALIZING DECRYPTION PROTOCOLS... ERROR: KEY NOT FOUND. SYSTEM LOCKED.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="writeups" style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        border: '1px solid var(--alert-color)',
        padding: '40px',
        backgroundColor: 'rgba(20, 0, 0, 0.8)',
        maxWidth: '800px',
        width: '100%'
      }}>
        <h1 style={{ 
          color: 'var(--alert-color)', 
          fontSize: 'clamp(2rem, 8vw, 3rem)', 
          marginBottom: '20px',
          textShadow: '0 0 10px red'
        }}>
          SYSTEM OFFLINE
        </h1>
        
        <div style={{ 
          fontFamily: 'var(--font-mono)', 
          color: '#fff', 
          fontSize: 'clamp(1rem, 4vw, 1.2rem)',
          minHeight: '3em',
          marginBottom: '30px'
        }}>
          &gt; {text}<span className="blink">_</span>
        </div>

        <p style={{ color: '#888', marginBottom: '40px' }}>
          Our operatives are currently deployed. Mission logs will be uploaded upon their return.
        </p>

        <div style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', color: '#333' }}>
          COMING SOON
        </div>
      </div>

      <div style={{ marginTop: '50px' }}>
        <Link to="/" className="cyber-button">
          [ RETURN_TO_BASE ]
        </Link>
        <style>{`
          .cyber-button {
            color: var(--accent-color);
            text-decoration: none;
            font-family: var(--font-mono);
            font-size: 1.2rem;
            padding: 10px 20px;
            border: 1px solid var(--accent-dim);
            transition: all 0.3s ease;
            background: rgba(0, 20, 0, 0.3);
            letter-spacing: 2px;
          }
          .cyber-button:hover {
            background: var(--accent-color);
            color: #000;
            box-shadow: 0 0 20px var(--accent-color);
            border-color: var(--accent-color);
          }
        `}</style>
      </div>
    </section>
  );
};

export default Writeups;
