import { signOut } from "firebase/auth";
import getFirebase from "../../../../database/config";
import { useRouter } from "next/navigation";

export default function DashboardView({user, usersList}){

    const mainRoute = "/2502006341/asg10/assignment/10";
    const router = useRouter();
    const {auth} = getFirebase();
    
    const logout = async () => {
        await signOut(auth);
        router.push(mainRoute);
    }

    return <div className="hero">
        <h3>Welcome!</h3>
        <h2>{user.name}</h2>
        <p>List of signed-in users</p>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {usersList.map((user)=> (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={logout} className="destruct-btn">Logout</button>
    </div>
}