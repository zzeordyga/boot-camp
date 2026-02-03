'use client'

import base from '../../lib/clientApp'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function RegisterPage()
{
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: false,
    });
    const [errorMessage, setErrorMessage] = useState([]);

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
        setErrorMessage({...errorMessage, [event.target.name]: ""})
    };
    const validateData = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = "Name is required";
        if (!form.email) newErrors.email = "Email is required";
        if (!form.password) newErrors.password = "Password is required";

        return newErrors;
    }

    const registerUser = () => {
        setLoading(true);
        const validationError = validateData();
        if(Object.keys(validationError).length > 0)
        {
            setErrorMessage(validationError);
            setLoading(false);
        }
        else
        {
            setErrorMessage([])
            createUserWithEmailAndPassword(base.auth, form.email, form.password)
                .then(async (userCredential) =>
                {
                    const user = userCredential.user
                    let userRole = "user"
                    if (form.role)
                    {
                        userRole = "admin"
                    }
                    await setDoc(doc(base.db, "users", user.uid),{
                            name: form.name,
                            email: user.email,
                            role: userRole
                        })

                    signInWithEmailAndPassword(base.auth, form.email, form.password)
                        .then(async () =>
                        {
                            router.push("/")
                            setLoading(false);
                        })
                        .catch((error) => {
                            setErrorMessage(error.message);
                            setLoading(false);
                        })
                })
            .catch((error) => {
                setErrorMessage(error.message);
                setLoading(false);
            })
        }
        setLoading(false);
    }

    if (loading)
    {
        return <div className="listContainer">Loading...</div>
    }

    return(
        <div className="listContainer">
            <h2>Register Page</h2>
            <br></br>
            <div>
                <label>Name:</label>
                <input style={{ backgroundColor: 'white'}} type="text" name="name" onChange={handleChange} />
                {errorMessage.name &&(
                    <div>{errorMessage.name}</div>
                )}
            </div>
            <div>
                <br></br>
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
            <div>
                <br></br>
                <label>Admin Role?</label>
                <input style={{ backgroundColor: 'white'}} type="checkbox" name="role" onChange={handleChange} />
            </div>
            <br></br>
            <button className="buttonStyle" type="submit" onClick={registerUser}>
                Register
            </button>
            <Link className="buttonStyle" href="/login">
                Login Here
            </Link>
        </div>
    )
}