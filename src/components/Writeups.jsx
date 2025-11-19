import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Writeups = () => {
  // Check unlock state immediately before any rendering
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem('zb_unlocked') === 'true';
  });
  
  const [flagInput, setFlagInput] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // SHA-256 hash of ZB{s1l3nt_k1ll3rs}
  const CORRECT_HASH = 'e86c4a5223da3c91f73669d1f74427749cbf57f1b9ac96ca696b94f13df6d1ba';
  
  const fullText = '> INITIALIZING DECRYPTION PROTOCOLS... ERROR: KEY NOT FOUND.\n> SYSTEM LOCKED_';

  useEffect(() => {
    // Skip animations if already unlocked
    if (isUnlocked) return;

    // Typing animation
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Fake API call - flag hidden in Network tab!
    const fetchFakeData = async () => {
      try {
        // Create a fake API endpoint response
        const fakeResponse = {
          status: 'locked',
          message: 'System access denied',
          timestamp: new Date().toISOString(),
          server: 'zeroblink-secure-01',
          debug: false,
          // Hidden in plain sight in the response
          access_key: 'ZB{s1l3nt_k1ll3rs}',
          metadata: {
            version: '2.1.4',
            encryption: 'AES-256',
            auth_required: true
          }
        };

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Make an actual fetch to a data URL so it shows in Network tab
        const blob = new Blob([JSON.stringify(fakeResponse, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        fetch(url, {
          method: 'GET',
          headers: {
            'X-API-Key': 'zeroblink_v1',
            'X-Request-ID': Math.random().toString(36).substring(7)
          }
        }).then(response => response.json())
          .then(data => {
            // This will show in Network tab
            URL.revokeObjectURL(url);
          });

      } catch (error) {
        // Silent fail
      }
    };

    // Trigger fake API call after page load
    setTimeout(fetchFakeData, 1200);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  // SHA-256 hash function
  const sha256 = async (message) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsChecking(true);
    setError('');

    // Simulate checking delay for effect
    await new Promise((resolve) => setTimeout(resolve, 800));

    const inputHash = await sha256(flagInput);

    if (inputHash === CORRECT_HASH) {
      setIsUnlocked(true);
      localStorage.setItem('zb_unlocked', 'true');
    } else {
      setError('ACCESS DENIED: INVALID KEY');
    }

    setIsChecking(false);
    setFlagInput('');
  };

  if (!isUnlocked) {
    return (
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        <div style={{
          border: '3px solid var(--alert-color)',
          padding: '50px 60px',
          maxWidth: '900px',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          boxShadow: '0 0 50px rgba(255, 0, 60, 0.3)',
          position: 'relative'
        }}>
          {/* Animated corner brackets */}
          <div style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            width: '30px',
            height: '30px',
            borderTop: '3px solid var(--accent-color)',
            borderLeft: '3px solid var(--accent-color)',
            animation: 'pulse 2s infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '30px',
            height: '30px',
            borderTop: '3px solid var(--accent-color)',
            borderRight: '3px solid var(--accent-color)',
            animation: 'pulse 2s infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-2px',
            left: '-2px',
            width: '30px',
            height: '30px',
            borderBottom: '3px solid var(--accent-color)',
            borderLeft: '3px solid var(--accent-color)',
            animation: 'pulse 2s infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: '30px',
            height: '30px',
            borderBottom: '3px solid var(--accent-color)',
            borderRight: '3px solid var(--accent-color)',
            animation: 'pulse 2s infinite'
          }}></div>

          <h1 style={{
            color: 'var(--alert-color)',
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            marginBottom: '30px',
            textAlign: 'center',
            textShadow: '0 0 20px rgba(255, 0, 60, 0.5)',
            letterSpacing: '5px'
          }}>
            SYSTEM OFFLINE
          </h1>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            color: '#00ff41',
            marginBottom: '30px',
            textAlign: 'left',
            minHeight: '200px',
            lineHeight: '1.8'
          }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word', minHeight: '60px' }}>
              {typedText}{showCursor && typedText.length < fullText.length ? '█' : ''}
            </pre>
            <br />
            <p style={{ color: '#888', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', marginTop: '20px' }}>
              Our operatives are currently deployed. Mission logs will be uploaded upon their return.
            </p>
          </div>

          <div style={{
            borderTop: '2px dashed var(--secondary-color)',
            paddingTop: '30px',
            marginTop: '30px'
          }}>
            <p style={{
              color: 'var(--accent-color)',
              marginBottom: '20px',
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
            }}>
              &gt; ENTER ACCESS KEY TO UNLOCK:
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="ZB{...}"
                disabled={isChecking}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: '#000',
                  border: '2px solid var(--accent-dim)',
                  color: 'var(--accent-color)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                  outline: 'none',
                  marginBottom: '20px',
                  boxShadow: 'inset 0 0 20px rgba(0, 255, 65, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--accent-dim)'}
              />

              <button
                type="submit"
                disabled={isChecking || !flagInput}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: 'transparent',
                  border: '2px solid var(--accent-color)',
                  color: 'var(--accent-color)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                  cursor: isChecking || !flagInput ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  fontWeight: 'bold',
                  opacity: isChecking || !flagInput ? 0.5 : 1,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)'
                }}
                className={!isChecking && flagInput ? 'glitch-hover' : ''}
                onMouseEnter={(e) => {
                  if (!isChecking && flagInput) {
                    e.target.style.backgroundColor = 'var(--accent-color)';
                    e.target.style.color = '#000';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--accent-color)';
                }}
              >
                {isChecking ? '⟳ VERIFYING...' : '▶ AUTHENTICATE'}
              </button>
            </form>

            {error && (
              <div style={{
                marginTop: '25px',
                padding: '20px',
                backgroundColor: 'rgba(255, 0, 60, 0.15)',
                border: '2px solid var(--alert-color)',
                color: 'var(--alert-color)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                animation: 'glitch 0.3s ease',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                ⚠ {error}
              </div>
            )}

            <div style={{
              marginTop: '30px',
              fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
              color: '#666',
              textAlign: 'center',
              padding: '15px',
              border: '1px dashed #333',
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}>
              💡 <span style={{ color: '#888' }}>Hint: Monitor network traffic for system diagnostics...</span>
            </div>
          </div>
        </div>

        <Link to="/" style={{
          marginTop: '40px',
          padding: '15px 40px',
          border: '2px solid var(--accent-dim)',
          color: 'var(--accent-color)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
          transition: 'all 0.3s ease',
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }} 
        className="glitch-hover"
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'var(--accent-color)';
          e.target.style.color = '#000';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
          e.target.style.color = 'var(--accent-color)';
        }}>
          ← RETURN TO BASE
        </Link>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </section>
    );
  }

  // Unlocked content - Achievements and Writeups
  return (
    <section className="container" style={{ padding: '50px 20px', minHeight: '80vh' }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '50px',
        animation: 'fadeIn 1s ease'
      }}>
        <h1 style={{
          color: 'var(--accent-color)',
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          marginBottom: '10px'
        }}>
          ACCESS GRANTED
        </h1>
        <p style={{ color: '#888', fontFamily: 'var(--font-mono)' }}>
          &gt; MISSION ARCHIVES UNLOCKED<span className="blink">_</span>
        </p>
      </div>

      {/* Achievements Section */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '30px',
          borderBottom: '2px solid var(--accent-dim)',
          paddingBottom: '10px'
        }}>
          <span className="text-accent">/</span> ACHIEVEMENTS
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          <AchievementCard
            title="DECODEX 2025"
            date="January 2025"
            description="BMS Institute of Technology and Management. Ranked 12th out of 30 teams in this cybersecurity challenge."
            rank="12th Place"
          />

          <AchievementCard
            title="CYBERTEA 3.0 CTF"
            date="2025"
            description="Indian Institute of Information Technology (IIIT), Sri City. Ranked 8th out of 100 teams in this competitive CTF event."
            rank="8th Place"
          />

          <AchievementCard
            title="CRYOVAULT PES"
            date="2025"
            description="PES University CTF Challenge. Ranked 46th out of 300 teams in advanced cryptography and vault-breaking challenges."
            rank="46th Place"
          />
        </div>
      </div>

      {/* Writeups Section */}
      <div>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '30px',
          borderBottom: '2px solid var(--accent-dim)',
          paddingBottom: '10px'
        }}>
          <span className="text-accent">/</span> MISSION REPORTS
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <WriteupCard
            title="CyberTEA 3.0 - Web Exploitation Challenge"
            category="Web Exploitation"
            difficulty="Medium"
            description="Exploiting authentication bypass and SQL injection vulnerabilities to capture the flag. Detailed walkthrough of our 8th place solution."
            githubLink="https://github.com/zeroblink/writeups/cybertea-web"
          />

          <WriteupCard
            title="DecodeX 2025 - Cryptography Challenge"
            category="Cryptography"
            difficulty="Hard"
            description="Breaking custom encryption schemes and analyzing cipher weaknesses. Our approach to securing 12th place at BMS Institute."
            githubLink="https://github.com/zeroblink/writeups/decodex-crypto"
          />

          <WriteupCard
            title="CryoVault PES - Vault Breaking"
            category="Reverse Engineering"
            difficulty="Medium"
            description="Reverse engineering the vault mechanism and exploiting logic flaws to extract encrypted data from PES University's challenge."
            githubLink="https://github.com/zeroblink/writeups/cryovault-pes"
          />
        </div>
      </div>

      <div style={{
        marginTop: '50px',
        textAlign: 'center',
        padding: '20px',
        border: '1px dashed var(--secondary-color)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          More writeups coming soon. Our operatives are documenting their latest missions.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

const AchievementCard = ({ title, date, description, rank }) => (
  <div style={{
    border: '1px solid var(--accent-dim)',
    padding: '25px',
    backgroundColor: 'rgba(0, 255, 65, 0.03)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  }}
  className="wanted-card">
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      padding: '5px 10px',
      backgroundColor: 'var(--accent-color)',
      color: '#000',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      letterSpacing: '1px'
    }}>
      {rank}
    </div>

    <h3 style={{
      color: 'var(--accent-color)',
      fontSize: '1.3rem',
      marginBottom: '10px',
      textTransform: 'uppercase'
    }}>
      {title}
    </h3>

    <div style={{
      color: '#888',
      fontSize: '0.85rem',
      marginBottom: '15px',
      fontFamily: 'var(--font-mono)'
    }}>
      {date}
    </div>

    <p style={{
      color: '#ccc',
      fontSize: '0.95rem',
      lineHeight: '1.6'
    }}>
      {description}
    </p>
  </div>
);

const WriteupCard = ({ title, category, difficulty, description, githubLink }) => {
  const difficultyColors = {
    Easy: '#00ff41',
    Medium: '#ffaa00',
    Hard: '#ff003c',
  };

  return (
    <div
      style={{
        border: '1px solid var(--secondary-color)',
        padding: '25px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      className="wanted-card"
      onClick={() => githubLink && window.open(githubLink, '_blank')}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '15px',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <h3
          style={{
            color: '#fff',
            fontSize: '1.4rem',
            flex: '1 1 auto',
          }}
        >
          {title}
        </h3>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              padding: '5px 12px',
              backgroundColor: 'rgba(0, 255, 65, 0.1)',
              border: '1px solid var(--accent-dim)',
              color: 'var(--accent-color)',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}
          >
            {category}
          </span>

          <span
            style={{
              padding: '5px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              border: `1px solid ${difficultyColors[difficulty]}`,
              color: difficultyColors[difficulty],
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}
          >
            {difficulty}
          </span>
        </div>
      </div>

      <p
        style={{
          color: '#aaa',
          fontSize: '0.95rem',
          lineHeight: '1.6',
          marginBottom: '15px',
        }}
      >
        {description}
      </p>

      {githubLink && (
        <div
          style={{
            marginTop: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--accent-color)',
            fontSize: '0.9rem',
            fontWeight: 'bold',
          }}
        >
          <span>→</span>
          <span>Read full writeup on GitHub</span>
        </div>
      )}
    </div>
  );
};

export default Writeups;
