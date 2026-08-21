"use client"

import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import AdminDashboard from "./components/AdminDashboard";

function MainContent() {
    const { user, role, loading } = useAuth();
    const [authView, setAuthView] = useState<"register" | "login">("login");
    const [currentTab, setCurrentTab] = useState<"profile" | "admin">("profile");

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 animate-pulse font-medium">Verifying authorization parameters...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-md mx-auto text-center mb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900">Assignment 10 - Auth & RBAC</h1>
                </div>
                {authView === "register" ? (
                    <Register onSwitchToLogin={() => setAuthView("login")} />
                ) : (
                    <Login onSwitchToRegister={() => setAuthView("register")} />
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-md mx-auto px-4 flex justify-around h-14 items-center">
                    <button
                        onClick={() => setCurrentTab("profile")}
                        className={`font-medium text-sm pb-1 border-b-2 transition ${currentTab === "profile" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
                            }`}
                    >
                        User Profile
                    </button>
                    <button
                        onClick={() => setCurrentTab("admin")}
                        className={`font-medium text-sm pb-1 border-b-2 transition ${currentTab === "admin" ? "border-green-600 text-green-600" : "border-transparent text-gray-500"
                            }`}
                    >
                        Admin Dashboard
                    </button>
                </div>
            </nav>

            <div className="py-8 px-4">
                {currentTab === "profile" && <UserProfile />}

                {currentTab === "admin" && (
                    role === "admin" ? (
                        <AdminDashboard />
                    ) : (
                        <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
                            <h3 className="text-lg font-bold text-red-800 mb-2">403 - Access Denied</h3>
                            <p className="text-sm text-red-600 mb-4">
                                Your account role is currently set to <code className="bg-red-100 px-1 rounded font-bold">{role}</code>.
                                You must possess the "admin" role to view this terminal dashboard.
                            </p>
                            <button
                                onClick={() => setCurrentTab("profile")}
                                className="text-xs font-semibold text-blue-600 hover:underline"
                            >
                                Return safely to Profile View
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default function MainPage() {
    return (
        <AuthProvider>
            <MainContent />
        </AuthProvider>
    );
}