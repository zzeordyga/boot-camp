
import { useState, useEffect, useRef } from 'react'

function Profile() {
  const [showInterests, setShowInterests] = useState(false)
  const profileRef = useRef(null)

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'My Profile | React Bootcamp'

    return () => {
      document.title = previousTitle
    }
  }, [])

  const handleFocusProfile = () => {
    profileRef.current?.focus()
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#f4f6fb',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <section
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '600px',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <p
          style={{
            color: '#2563eb',
            fontWeight: 'bold',
            fontSize: '14px',
            letterSpacing: '1px',
          }}
        >
          PERSONAL PROFILE
        </p>

        <h1
          ref={profileRef}
          tabIndex={-1}
          style={{
            fontSize: '32px',
            color: '#1e293b',
            marginBottom: '8px',
            outline: 'none',
          }}
        >
          Hello, I'm Randy Fernanda!
        </h1>

        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          NIM: YOUR_NIM
        </p>

        <hr style={{ border: '1px solid #e2e8f0' }} />

        <h2 style={{ color: '#1e293b', marginTop: '24px' }}>
          About My Study
        </h2>

        <p
          style={{
            color: '#475569',
            lineHeight: '1.7',
            fontSize: '15px',
          }}
        >
          I am a Mobile Application & Technology student at
          BINUS University. I am interested in mobile application
          development, web development, and exploring new
          technologies. I enjoy learning new skills and building
          applications that solve real-world problems.
        </p>

        <button
          onClick={() => setShowInterests(!showInterests)}
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '16px',
            fontWeight: 'bold',
          }}
        >
          {showInterests ? 'Hide My Interests' : 'Show My Interests'}
        </button>

        {showInterests && (
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: '#eff6ff',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ color: '#1e40af', marginTop: '0' }}>
              My Interests
            </h3>

            <ul style={{ color: '#475569', lineHeight: '1.8' }}>
              <li>Mobile Application Development</li>
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Exploring New Technologies</li>
            </ul>
          </div>
        )}

        <button
          onClick={handleFocusProfile}
          style={{
            display: 'block',
            marginTop: '16px',
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            color: '#334155',
            cursor: 'pointer',
          }}
        >
          Focus on My Profile
        </button>
      </section>
    </main>
  )
}

export default Profile
