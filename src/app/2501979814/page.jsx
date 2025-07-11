'use client'
import React, {useState, useEffect, useRef, useMemo} from "react";

function ProfilePage(){
    const [count, setCount] = useState(0);
    const inputRef = useRef();

    const doubleAmount = useMemo(() => count * 2, [count]);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div>
            <h1>Sekar Ajeng Suprobo Mukti - 2501979814</h1>
            <p>
                Hi everyone, I am a computer science major, who likes to explore a new design to make your apps not only functional, 
                but also fun to use!
            </p>
            <div style={{display: "flex", justifyContent:"center", marginTop: "5rem"}}>
                <input ref={inputRef} type="text" name="Text" id="inptText" style={{width: "16rem" , borderRadius: "5px" ,paddingLeft: "1rem" ,marginRight: "1rem"}}/>
                
                <button 
                    onClick={() => setCount(count+1)}
                    style={{backgroundColor: "#CD5656", borderRadius: '5px', color: "white", padding: '1rem'}}>
                        Click Here
                </button>
            </div>

            <div style={{display: "flex", justifyContent: "center", marginTop: "5rem"}}>
                <div style={{backgroundColor: "white", width:"128px", color: "black", borderRadius: "5px", padding: "2rem", marginRight: "1rem"}}>
                    <p>Click Amount</p>
                    <h1>{count}</h1>
                </div>

                <div style={{backgroundColor: "white", width:"128px", color: "black", borderRadius: "5px", padding: "2rem"}}>
                    <p>Double Amount</p>
                    <h1>{doubleAmount}</h1>
                </div>
            </div>


        </div>
    )
}

export default ProfilePage;
