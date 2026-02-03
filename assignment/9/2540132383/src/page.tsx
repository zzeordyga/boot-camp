import Image from "next/image";
import React from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    addDoc,
    setDoc
} from "firebase/firestore";

export default function Home()
{
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function signUp()
    {
        await signInWithEmailAndPassword()
    }
}