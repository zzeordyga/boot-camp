"use client";
import React, {useState, useEffect, useMemo} from "react";
import Layout from "../layout";
const myPage=()=>{
    const [count, setCount]=useState(0);
    const tripled=useMemo(()=>count*3,[count]);
    return(
        <Layout>
        <div className="p-5 font-normal">
            <h1>
                Abhiniwesa Pinandita Acandrakasthayi - 2201803396
            </h1>
            <p>
                I am a Computer Science student at Binus University. I am dual majoring in Computer Science and Statistics
            </p>
            <button onClick={()=>setCount(count+1)} className="m-1 p-0.5 bg-indigo-600 hover:bg-indigo-900 text-white">
                Click Me!
            </button>
            <p>Current Click Value: {count}</p>
            <p>Current Click Value Tripled: {tripled}</p>
        </div>
        </Layout>
    );
};
export default myPage;