'use client'
import {useThemeContext} from "../../context/theme-context";
import {useRoleContext} from "../../context/role-context";
import {useRouter} from 'next/navigation'
import './globals.css';

export default function Home() {
    const {theme, setTheme} = useThemeContext();
    const {role, setRole} = useRoleContext();
    const router = useRouter();

    const background = {
        width : '100vw',
        height : '100vh',
        backgroundColor : theme === 'light' ? '#FFFFFF' : '#2d3748',
        color : theme === 'dark' ? '#FFFFFF' : '#2d3748'
    }

    const handleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }
    const handleRole = () => {
        role === 'consumer' ? setRole('admin') : setRole('consumer');
    }

    return (
        <div style={background}>
            <main>
                <div>
                    <button className="buttonStyle" onClick={handleTheme}>
                        Change Theme
                    </button>
                    <label>Current Theme : {theme}</label>
                </div>
                <div>
                    <button className="buttonStyle" onClick={handleRole}>
                        Change Role
                    </button>
                    <label>Current Role : {role}</label>
                </div>
                <div>
                    <button className="buttonStyle" onClick={() => {
                        router.push('/store');
                    }}>
                        Go to store
                    </button>
                </div>
            </main>
        </div>
    );
}
