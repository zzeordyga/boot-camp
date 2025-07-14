'use client'
import { userLogout } from "../../../firebase/authService";

const Logout = () => {
    return (
        <button onClick={userLogout}>Logout</button>
    );
};

export default Logout;