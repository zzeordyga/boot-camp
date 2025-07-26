import { signOut } from "firebase/auth";
import getFirebase from "../../../../database/config"
import { useRouter } from "next/navigation";

export default function UserProfile({user}){

    const mainRoute = "/2502006341/asg10/assignment/10";
    const router = useRouter();
    const {db, auth} = getFirebase();

    const logout = async () => {
        await signOut(auth);
        router.push(mainRoute);
    }

    return <div className="hero">
        <h3>Welcome!</h3>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
        <button onClick={logout} className="destruct-btn">Logout</button>
    </div>
}