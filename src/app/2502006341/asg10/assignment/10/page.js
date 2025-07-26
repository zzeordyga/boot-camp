"use client"
import { useRouter } from "next/navigation"
import { authGuard } from "./hooks/authGuard";
import { useEffect } from "react";

export default function IndexPage(){
    const router = useRouter();
    const {role} = authGuard();
    const mainRoute = "/2502006341/asg10/assignment/10";

    useEffect(()=>{
        if(!role){
            return;
        }
        if(role=="admin"){
            router.push(`${mainRoute}/admin/dashboard`);
        }
        else if (role=="user") {
            router.push(`${mainRoute}/users/profile`);
        }
    }, [role]);  
}