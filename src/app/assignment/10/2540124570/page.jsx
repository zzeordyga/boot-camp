"use client";

import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "./utils/firebase";

const MyPage = () => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data) => {
    setErrorMsg("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const uid = user.uid;

      console.log(uid);

      const userDocRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        setErrorMsg("user's profile not found in database");
        await signOut(auth);
        return;
      }

      const userDocData = userSnapshot.data();
      const role = userDocData.role;
      console.log(role);

      if (role === "admin") {
        router.push(`./2540124570/${role}/dashboard`);
      } else if (role === "user") {
        router.push(`./2540124570/${role}/profile`);
      } else {
        setErrorMsg("Unauthorized access");
        await signOut(auth); // Log out unauthorized users
      }
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        setErrorMsg("Wrong email or password");
      } else if (error.code === "auth/invalid-email") {
        setErrorMsg("Email not valid.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMsg("too many requests for login. Please try again!");
      } else {
        setErrorMsg(`${error.message}`);
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
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          placeholder="Email"
          {...register("email", { required: true })}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}

        <input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">Password is required</p>
        )}

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <a
            href="./2540124570/register"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default MyPage;
