
import Link from 'next/link'

export default function ProjectLayout({ children }) {

    return (
        <section className={styles.container}>
            <div className={styles.nav}>
                <Link style={{ 
                        color : 'white',
                        padding: '8px 16px',
                        backgroundColor: '#800080',
                        borderRadius: '4px', }} 
                    href="/2501981560" >&lt; Back</Link>
            </div>
            {children}
        </section>

    )
}

const styles = {
    container: {
        width: '100%',
        height: '100vh',
        display: 'flex',
    },
    nav : {
        position : 'absolute',
        top: '0px',
        left : '0px',
        width : '100%',
    },
    Link: { 
        color : 'white',
        padding: '4px 8px',
        backgroundColor: 'purple',
        borderRadius: '4px',
    }
}