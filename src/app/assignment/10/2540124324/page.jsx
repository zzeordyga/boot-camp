'use client'
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter()

  return (
    <main>
      <h1>Welcome to Firebase Auth App</h1>
      <a href="assignment/10/2540124324/login">Login</a> | <a onClick={()=>router.push('/assignment/10/2540124324/register')}>Register</a>
    </main>
  );
}
