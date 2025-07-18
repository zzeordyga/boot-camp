import { useRouter } from "next/navigation"
import { useState } from "react";
import getFirebase from "../../../database/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";

export default function RegisView() {
    const mainRoute = "/2502006341/asg10/assignment/10";
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        age: "",
        password: "",
        confirmPass: "",
        role: ""
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
        console.log(e.target.name + " " + e.target.value);
    };

    const validate = () => {
        const errorList = {};
        if(form.age < 13){
            errorList.age = "Age should be at least 13";
        }
        else if(form.password != form.confirmPass){
            errorList.confirmPass = "Password and Confirm Password should be the same";
        }
        return errorList;
    }

    const regisUser = (e) => {
        e.preventDefault();
        const validateField = validate();
        if(Object.keys(validateField).length>0){
            setErrors(validateField);
        }
        else {
            const {auth, db} = getFirebase();
            createUserWithEmailAndPassword(auth, form.email, form.password).then(async(credentials)=> {
                console.log(credentials);
                const user = credentials.user;
                await setDoc(doc(db, "users", user.uid), {
                    name: form.name,
                    email: form.email,
                    age: form.age,
                    role: form.role,
                });
                router.push("/2502006341/asg10/assignment/10/login");
            }).catch((error) => {
                console.log("Caught error");
                console.log(error);
                setErrors({customError: error.message});
            });
        }
    }

    return <div className="hero">
        <h2>Register</h2>
        <form onSubmit={regisUser} method="post">
            <input type="text" placeholder="User Name" name="name" onChange={inputChanges} required/>
            <input type="email" placeholder="Email" name="email" onChange={inputChanges} required />
            <input type="number" placeholder="Age" name="age" onChange={inputChanges} required />
            {errors.age && <div className="error-text">{errors.age}</div>}
            <input type="password" placeholder="Password" name="password" onChange={inputChanges} required/>
            <input type="password" placeholder="Confirm Password" name="confirmPass" onChange={inputChanges} required/>
            {errors.confirmPass && <div className="error-text">{errors.confirmPass}</div>}
            <select name="role" onChange={inputChanges} required>
                <option value="">Select role as:</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            {errors.customError && <div className="error-text">{errors.customError}</div>}
            <button type="submit">Register</button>
            <p>Already have an account? <Link href={`${mainRoute}/login`}>Login</Link></p>
        </form>
    </div>
}