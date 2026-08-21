import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth"
import { auth } from "../lib/firebase";


export default function AdminDashboard() {
    const { user, role } = useAuth();

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border-t-4 border-green-500">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">🔒 Admin Dashboard</h2>
            <p className="text-sm text-green-600 font-semibold mb-6">Welcome to Admin Dashboard</p>

            <div className="space-y-3 bg-green-50 p-4 rounded mb-6 text-sm border border-green-100">
                <div><span className="font-medium text-gray-600">Admin Email:</span> {user?.email}</div>
                <div><span className="font-medium text-gray-600">System Role:</span> <span className="px-2 py-0.5 bg-green-200 text-green-800 rounded font-bold">{role}</span></div>
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