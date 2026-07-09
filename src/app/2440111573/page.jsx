'use client'
import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import Layout from '../layout.jsx';
import Link from 'next/link';


import './style.css'; 

export default function myApp() {
  const [data, setData] = useState([]);

  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const backgroundRef = useRef(null);

  const fetchData = async () =>{
    const {data: studentData} = await axios.get("/students.json");   
    setData(studentData.find((dt) => dt.nim === "2440111573"));
  }
  useEffect(()=>{
      fetchData();
      return () => {
          console.log("component unmounted");
      }
  },[]);

  

  const colorStyle = useMemo(() => ({
    backgroundColor: `rgb(${red}, ${green}, ${blue})`,
  }), [red, green, blue]);

  useEffect(() => {
    console.log(`Background color changed to rgb(${red}, ${green}, ${blue})`);
    if (backgroundRef.current) {
      backgroundRef.current.style.backgroundColor = colorStyle.backgroundColor;
    }
  }, [colorStyle]);
  
  return (
   
    <div className="flex flex-col items-center justify-center min-h-screen p-5 w-full">

      <h1 className="text-center mx-auto max-w-md">
        {data.name} - {data.nim}
      </h1>

      <div className="text-left mt-5 max-w-md">
        <h2>{data.studyProgram}</h2>
        <p>
          Game Application and Technology study and practice the process of game development
          <br />
          In which includes: ideation, documentation, unity scripting with C#, assembly, publishing, etc.
        </p>
      </div>

      <div className="flex flex-row justify-center items-center my-5 space-x-5">
        <div
          ref={backgroundRef}
          className="background-box"
          style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
        >
          Background Color
        </div>
        <div className="slider-container">
          {colorSliders({ color: 'red', value: red, setValue: setRed })}
          {colorSliders({ color: 'green', value: green, setValue: setGreen })}
          {colorSliders({ color: 'blue', value: blue, setValue: setBlue })}
        </div>
      </div>

      <div className="text-center mt-5 bg-blue-500 text-white px-4 py-2 rounded">
        <Link href="/2440111573/food">
          Go to Food Generator
        </Link>
      </div>

    </div>
  
  );
}

export function colorSliders({ color, value, setValue }) {
  return (
    <div className="slider-row">
      <label className="slider-label">{color.charAt(0).toUpperCase() + color.slice(1)}:</label>
      <span className="slider-value">{value}</span>
      <input
        className="slider-input"
        type="range"
        min="0"
        max="255"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}