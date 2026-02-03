'use client'

import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import base from "../../lib/clientApp";
import {useRouter} from "next/navigation";

export default function LoginPage()
{
    const router = useRouter()
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [errorMessage, setErrorMessage] = useState([]);

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
        setErrorMessage({...errorMessage, [event.target.name]: ""})
    };
    const validateData = () => {
        const newErrors = {};
        if (!form.email) newErrors.email = "Email is required";
        if (!form.password) newErrors.password = "Password is required";

        return newErrors;
    }

    const loginUser = () => {
        const validationError = validateData();
        if(Object.keys(validationError).length > 0)
        {
            setErrorMessage(validationError);
        }
        else
        {
            setErrorMessage([])
            signInWithEmailAndPassword(base.auth, form.email, form.password)
                .then(async () =>
                {
                    router.push("/")
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                })
        }
    }

    return (
        <div className="listContainer">
            <h2>Login Page</h2>
            <br></br>
            <div>
                <label>Email:</label>
                <input style={{ backgroundColor: 'white'}} type="email" name="email" onChange={handleChange} />
                {errorMessage.email &&(
                    <div>{errorMessage.email}</div>
                )}
            </div>
            <div>
                <br></br>
                <label>Password:</label>
                <input style={{ backgroundColor: 'white'}} type="password" name="password" onChange={handleChange} />
                {errorMessage.password &&(
                    <div>{errorMessage.password}</div>
                )}
            </div>
            <br></br>
            <button className="buttonStyle" type="submit" onClick={loginUser}>
                Login
            </button>
            <Link className="buttonStyle" href="/register">
                Register Here
            </Link>
        </div>
    )
}