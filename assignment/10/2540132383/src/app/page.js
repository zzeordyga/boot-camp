'use client'
import base from '../lib/clientApp'
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { signOut } from 'firebase/auth';
import Link from "next/link";

export default function Main() {
    const {role, loading} = useAuthGuard();
    if (loading)
    {
        return <div className="listContainer">Loading...</div>
    }
    const logoutUser = async () => {
        await signOut(base.auth);
    }

    const isLogged = role !== "";

    return (
        <div className="listContainer">
            <label>Welcome {role}</label>
            <br></br>
            <div>
                <Link className='buttonStyle' href='/login'>Login</Link>
                <br></br>
                <br></br>
                <Link className='buttonStyle' href='/register'>Register</Link>
                <br></br>
                <br></br>
                {isLogged === true &&(
                    <button className='buttonStyle' onClick={logoutUser}>Logout</button>
                )}
            </div>
            <br></br>
            <div>
                {role === "admin" && (
                    <>
                        <div>
                            <Link className='buttonStyle' href='/admin/dashboard'>Admin Dashboard</Link>
                        </div>
                    </>
                )}
            </div>
            <div>
                {role === "user" &&(
                    <>
                        <div>
                            <Link className='buttonStyle' href='/user/profile'>User Profile</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
