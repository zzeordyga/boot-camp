import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import './myStyle.css'; 

function myApp() {
  const [data, setData] = useState([]);

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

  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const backgroundRef = useRef(null);

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
    <div>

      <h1>{data.name} - {data.nim}</h1>

      <div style={{
        textAlign:"left",
      }}>
        <h2>{data.studyProgram}</h2>
        <p>
          Game Application and Technology study and practice the process of game development
          <br />
          In which includes: ideation, documentation, unity scripting with C#, assembly, publishing, etc.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '20px 0' }}>
        <div ref={backgroundRef} className="background-box">
          Background Color
        </div>
        <div className="slider-container">
          <div className="slider-row">
            <label className="slider-label">Red:</label>
            <span className="slider-value">{red}</span>
            <input className="slider-input" type="range" min="0" max="255" value={red} onChange={(e) => setRed(e.target.value)} />
          </div>
          <div className="slider-row">
            <label className="slider-label">Green:</label>
            <span className="slider-value">{green}</span>
            <input className="slider-input" type="range" min="0" max="255" value={green} onChange={(e) => setGreen(e.target.value)} />
          </div>
          <div className="slider-row">
            <label className="slider-label">Blue:</label>
            <span className="slider-value">{blue}</span>
            <input className="slider-input" type="range" min="0" max="255" value={blue} onChange={(e) => setBlue(e.target.value)} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default myApp;
