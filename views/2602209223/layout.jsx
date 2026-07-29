export default function Layout({ children, isDarkMode, setIsDarkMode }) {
    return (
        <div style={{
            padding: '40px 30px',
            margin: '50px auto',
            width: '90%',
            boxSizing: "border-box",
            maxWidth: '400px',
            borderRadius: '16px',
            boxShadow: isDarkMode ? '0 8px 25px rgba(255,255,255,0.05)' : '0 8px 25px rgba(0,0,0,0.1)',
            backgroundColor: isDarkMode ? '#2d2d2d' : '#fdfdfdff',
            color: isDarkMode ? '#fdfdfdff' : '#333333',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            textAlign: 'center',
            transition: 'all 0.4s ease'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <h1>
                    Student Page
                </h1>
                <div style={{ textAlign: 'right' }}>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        style={{
                            padding: '12px 20px', cursor: 'pointer',
                            backgroundColor: isDarkMode ? '#f4f4f9' : '#111',
                            color: isDarkMode ? '#000' : '#fff',
                            border: 'none', borderRadius: '8px', fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'

                        }}
                    >
                        <i className={isDarkMode ? 'fa-solid fa-moon' : 'fa-solid fa-sun'}></i>
                    </button>
                </div>
            </div>

            <main>{children}</main>
        </div>
    );
}