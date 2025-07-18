import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import getFirebase from "../../../database/config";
import Link from "next/link";

export default function LoginView(){
    const mainRoute = "/2502006341/asg10/assignment/10";
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const inputChanges = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    const loginUser = (e) => {
        e.preventDefault();
        const {auth} = getFirebase();
        signInWithEmailAndPassword(auth, form.email, form.password).then(()=> {
            router.push("/2502006341/asg10/assignment/10/");
        }).catch((error) => {
            console.log("Caught error");
            console.log(error);
            setErrors({customError: error.message});
        });
    }

    return <div className="hero">
        <h2>Login</h2>
        <form onSubmit={loginUser} method="post">
            <input type="email" placeholder="Email" name="email" onChange={inputChanges} required />
            <input type="password" placeholder="Password" name="password" onChange={inputChanges} required/>
            {errors.customError && <div className="error-text">{errors.customError}</div>}
            <button type="submit">Login</button>
            <p>Don&apos;t have an account? <Link href={`${mainRoute}/register`}>Register</Link></p>
        </form>
    </div>
}