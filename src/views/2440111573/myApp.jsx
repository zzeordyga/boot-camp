import axios from 'axios';
import React, { useEffect, useState } from 'react';


function myApp() {
  const handleClick = () => {
    alert('Clicked');
  };

  const [data, setData] = useState([]);

  const fetchData = async () =>{
    const {data: studentData} = await axios.get("/students.json");
    const myData = studentData.find((dt) => dt.nim === "2440111573");
    
    setData(myData);
  }

  

  useEffect(()=>{
      fetchData();
      return () => {
          console.log("component unmounted");
      }
  },[]);
  
  return (
    <div>
      <div
        style={{
          //backgroundColor: 'green',
          padding: '20px',
          minHeight: '750px'
          
        }}
      >
        <h1>{data.name}</h1>
        <h2>{data.studyProgram}</h2>
        <h3>{data.additionalData?.favoriteLanguage || 'Not specified'}</h3>
        
        <div
          style={{
            width: '500px',
            height: '250px',
            backgroundColor: '#FFFF00',
            marginTop: '20px',
            border: '2px solid #000000',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          
        </div>
      </div>
    </div>
  );
}

export default myApp;
