// CTRL + P: search & open file by name
// ALT + Shift + Up/Down Arrow: copy current line to another line
'use client'
import '../tailwind.css';
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
      <table className='table-fixed border-collapse border border-gray-400'>
        <thead>
          <tr>
            <th className='border border-gray-300 px-4 py-2'>Name</th>
            <th className='border border-gray-300 px-4 py-2'>NIM</th>
            <th className='border border-gray-300 px-4 py-2'>Study Program</th>
            <th className='border border-gray-300 px-4 py-2'>Additional Data</th>
            <th className='border border-gray-300 px-4 py-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData.map((student, i) => {
              return (
                <tr key={student.nim}>
                  <td className='border border-gray-300 px-2'>{student.name}</td>
                  <td className='border border-gray-300 px-2'>{student.nim}</td>
                  <td className='border border-gray-300 px-2'>{student.studyProgram}</td>
                  <td className='border border-gray-300 px-2'>{student.additionalData ? JSON.stringify(student.additionalData) : ''}</td>
                  <td className='border border-gray-300 px-2 py-1'>
                    <button className='rounded-lg p-1 bg-indigo-400 transition ease-in duration-100 hover:bg-indigo-500' onClick={() => redirectToStudentPage(student.nim)}>View</button>
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
