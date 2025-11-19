import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="container" style={{ padding: '50px 20px', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '50px', fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}>
        <span className="text-accent">/</span> ESTABLISH CONNECTION
      </h2>
      
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid var(--accent-dim)',
        padding: '40px',
        backgroundColor: 'rgba(5, 5, 5, 0.9)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* SYN Packet Animation Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '50%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)',
          animation: 'scan 2s linear infinite'
        }}></div>

        {/* Bio removed as per request */}

        <div style={{
          border: '1px dashed var(--secondary-color)',
          padding: '20px',
          display: 'inline-block',
          marginBottom: '20px',
          maxWidth: '100%',
          overflowWrap: 'break-word'
        }} >
          <a href="mailto:sansyn69@gmail.com" style={{ fontSize: 'clamp(1rem, 5vw, 1.5rem)', color: 'var(--text-color)' }}>
            sansyn69@gmail.com
          </a>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--accent-dim)' }}>
          <span className="blink">_</span> WAITING FOR ACK
        </div>
      </div>
      
      <style>
        {`
          @keyframes scan {
            0% { left: -100%; }
            100% { left: 200%; }
          }
        `}
      </style>
    </section>
  );
};

export default Contact;
