import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth"
import { auth } from "../lib/firebase";


export default function UserProfile() {
    const { user, role } = useAuth();

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border-t-4 border-blue-500">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">User Profile Route</h2>
            <p className="text-sm text-green-600 font-semibold mb-6">Accessible to Authenticated Users</p>

            <div className="space-y-3 bg-gray-50 p-4 rounded mb-6 text-sm">
                <div><span className="font-medium text-gray-500">Email:</span> {user?.email}</div>
                <div><span className="font-medium text-gray-500">UID:</span> {user?.uid}</div>
                <div><span className="font-medium text-gray-500">Assigned Role:</span> <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">{role}</span></div>
            </div>

            <button
                onClick={() => signOut(auth)}
                className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded transition"
            >
                Sign Out
            </button>
        </div>
    );
}