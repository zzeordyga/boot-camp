'use client'
// CTRL + P: search & open file by name
// ALT + Shift + Up/Down Arrow: copy current line to another line
'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';

function App() {
  const [data, setData] = useState([]); // destructuring also
  const [filter, setFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const input = useRef();
  const router = useRouter();

  const filteredData = useMemo(() => {
    if(filter.length === 0 && programFilter.length === 0) return data;

    return data.filter((student) => {
      const condition = (filter.length !== 0 && (student.name.toLowerCase().includes(filter.toLowerCase()) 
                      || student.nim.includes(filter.toLowerCase())))
                      || (programFilter.length !== 0 && student.studyProgram === programFilter);

      return condition;
    });
  }, [data, filter, programFilter])

  const programList = useMemo(() => {
    // const list = data.map((student) => {
    //   const logic = true;
    //   return student.studyProgram;
    // });
    const list = data.map((student) => student.studyProgram);

    return [...new Set(list)];
  }, [data]);

  const fetchData = async () => {
    // const res = await axios.get("/students.json");
    // console.log(res.data)

    const { data: studentData } = await axios.get("/students.json"); // destructuring

    setData(studentData);
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const handleProgramChange = (e) => {
    setProgramFilter(e.target.value);
  }

  const redirectToStudentPage = (str) => {
      router.push(`/${str}`)
  } 

  useEffect(() => {
    console.log("Filter here:", filter);
  }, [filter]);

  useEffect(() => {
    fetchData();

    input.current.focus();

    return () => {
    }
  }, []);

  return (
    <div>
      <h1>Ziggy's List Of Future Accomplices</h1>
      <input type='text' onChange={handleFilterChange} placeholder='Search here..' ref={input}/>
      <select onChange={handleProgramChange}>
        <option value={""}></option>
        {
          programList.map((program, i) => (
            <option value={program} key={i}>{program}</option>
          ))
        }
      </select>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>NIM</th>
            <th>Study Program</th>
            <th>Additional Data</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData.map((student, i) => {
              return (
                <tr>
                  <td>{student.name}</td>
                  <td>{student.nim}</td>
                  <td>{student.studyProgram}</td>
                  <td>{student.additionalData ? JSON.stringify(student.additionalData) : ''}</td>
                  <td>
                    <button onClick={() => redirectToStudentPage(student.nim)}>View</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
