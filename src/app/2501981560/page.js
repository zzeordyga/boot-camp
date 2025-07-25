import Link from 'next/link';
import './2501981560.css'; // Importing styles for the HomePage


const HomePage = () => {
    return (
        <div>
            <h1 style={{ fontSize: '48px', color : 'orange' }}>Welcome to Averina Nurdin's Page</h1>
            <h2>Which project do you like to see ?</h2>
            <div className=''>
                <nav>
                    <ul>
                        <li><Link href="/2501981560/projects/asg-sesi6"> &gt; Breathholding Exercise</Link></li>
                        <li><Link href="/2501981560/projects/asg-sesi8">&gt; Get Some Advice !</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}


export default HomePage