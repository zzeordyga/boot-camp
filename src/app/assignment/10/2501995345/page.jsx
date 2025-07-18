"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import useAuth from "./_hooks/useAuth";
import getFirebase from "./_libs/firebase";
import { valueOrDefault } from "./_libs/utils";

import Login from "./_components/Login";
import Register from "./_components/Register";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export default function Home() {
  const router = useRouter();

  const { user, loading } = useAuth();

  const { auth, db } = getFirebase();

  const [formType, setFormType] = useState("LOGIN");

  const [isLoading, setIsLoading] = useState(false);

  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  useEffect(() => {
    if (user && !loading) {
      router.push("/assignment/10/2501995345/user/profile");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;

  if (user) return null;

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      const { email, password } = formData;
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/assignment/10/2501995345/user/profile");
    } catch (error) {
      console.error(error);
      setLoginError(
        valueOrDefault(error.message, "Something went wrong. Please try again.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    try {
      setIsLoading(true);
      const { email, password } = formData;
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (user) => {
          const userCollectionRef = doc(db, "users", user.user.uid);
          await setDoc(userCollectionRef, {
            id: user.user.uid,
            email,
            role: "USER",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      );

      await signInWithEmailAndPassword(auth, email, password);
      router.push("/assignment/10/2501995345/user/profile");
    } catch (error) {
      console.error(error);
      setRegisterError(
        valueOrDefault(error.message, "Something went wrong. Please try again.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormTypeChange = (type) => {
    setFormType(type);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col justify-center w-[80%] h-full">
        <div
          className={`flex ${
            formType === "LOGIN" ? "flex-row" : "flex-row-reverse"
          } border-2 border-gray-300 rounded-md min-h-[500px]`}
        >
          {formType === "LOGIN" && (
            <Login
              isLoading={isLoading}
              error={loginError}
              onSubmitForm={handleLogin}
              onFormTypeChange={handleFormTypeChange}
            />
          )}
          {formType === "REGISTER" && (
            <Register
              isLoading={isLoading}
              error={registerError}
              onSubmitForm={handleRegister}
              onFormTypeChange={handleFormTypeChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
