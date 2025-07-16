"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { app } from "../utils/firebase";

const RegisterPage = () => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setErrorMsg("");
    setLoading(true);
    const { username, email, password, confirmPassword, role } = data;

    if (password !== confirmPassword) {
      setErrorMsg("Password not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      const defaultRole = "user";

      await setDoc(doc(db, "users", uid), {
        email: email,
        role: role || defaultRole,
        name: username,
        createdAt: serverTimestamp(),
      });

      if (role === "admin") {
        router.push(`./${role}/dashboard`);
      } else {
        router.push(`./${role}/profile`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat registrasi:", error);

      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("Email already registered. Please use another email!");
      } else if (error.code === "auth/weak-password") {
        setErrorMsg("Password too weak (min 6 length character)");
      } else if (error.code === "auth/invalid-email") {
        setErrorMsg("Email not valid");
      } else {
        setErrorMsg(error.message);
      }

      if (auth.currentUser) {
        await signOut(auth);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <select
          {...register("role", { required: true })}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm">Role is required</p>
        )}

        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (val) =>
              val === watch("password") || "Passwords do not match",
          })}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="./" className="text-blue-600 underline hover:text-blue-800">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
