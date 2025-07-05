'use client'
import React from "react";
import { useState, useEffect, useMemo, useRef } from 'react'

const index = () => {
  const [count, setCount] = useState(0);                
  const ref = useRef(0);                              

  useEffect(() => {                                      
    console.log("Component mounted or count updated:", count);
  }, [count]);

  useEffect(() => {
    ref.current = count;
  }, [count]);

  const prevCount = ref.current;

  const doubled = useMemo(() => count * 2, [count]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Nama: Febrian Surya Hartono</h1>
      <h2>NIM: 2540118851</h2>
      <div style={{display: "flex", justifyContent: "center"}}>
        <p style={{maxWidth: "500px"}}>
          Adalah seorang mahasiswa jurusan Computer Science di Universitas Bina Nusantara. Tidak pernah berhenti untuk belajar teknologi pengembangan web mulai dari techstack hingga server.
        </p>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <p>Counter: {count}</p>
        <p>Nilai sebelumnya: {prevCount ? prevCount : 0}</p>
        <p>Nilai dobel dengan useMemo: {doubled}</p>
        <div style={{display: "flex", gap: "5px", justifyContent: "center", marginTop: '20px'}}>
          <button onClick={() => setCount(count + 1)}>Tambah</button>
          <button 
            onClick={() => {
              if(count > 0){
                setCount(count - 1)
              }
            }
          }>Kurang</button>
          <button
            onClick={() => {
              setCount(0);
              ref.current = 0
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default index
