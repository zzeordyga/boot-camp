// CTRL + P: search & open files


import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]); // destructuring useState to get data and setData

  const fetchData = async () => {
    const { data: studentData } = await axios.get("/students.json");
    setData(studentData);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>NIM</th>
            <th>Study Program</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.nim}</td>
              <td>{student.studyProgram}</td>
            </tr>
          ))}
        </tbody>

      </table>
      
    </div>
  );
}

export default App;
