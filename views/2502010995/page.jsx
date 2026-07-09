import React, { useState, useEffect, useRef, useMemo } from 'react';

const NAMA = "William Wijaya";
const NIM = "2502010995";
const PROGRAM_STUDI = "Game Application and Technology";
// ------------------------------

const MyPage = () => {
  // 1. Hook useState: Untuk menyimpan dan mengelola state (nilai) yang bisa berubah.
  // Di sini kita membuat state 'counter' dengan nilai awal 0.
  const [counter, setCounter] = useState(0);

  // 2. Hook useRef: Untuk membuat referensi ke elemen DOM.
  // Ini berguna untuk mengakses elemen secara langsung.
  const inputRef = useRef(null);

  // 3. Hook useEffect: Untuk menjalankan "side effects" (efek samping).
  // Efek ini akan berjalan setiap kali nilai 'counter' berubah.
  useEffect(() => {
    // Contoh side effect: mengubah judul halaman browser
    document.title = `Counter di Klik ${counter} kali`;
    
    // Fungsi cleanup: akan dijalankan saat komponen dihilangkan (unmount)
    return () => {
      document.title = 'React App';
    };
  }, [counter]); // Array dependensi: efek hanya berjalan jika 'counter' berubah.

  // 4. Hook useMemo: Untuk optimasi. Menghindari kalkulasi berat di setiap render.
  // Kalkulasi ini hanya akan dijalankan ulang jika nilai 'counter' berubah.
  const complexCalculation = useMemo(() => {
    console.log('Menjalankan kalkulasi berat...');
    let result = 0;
    // Ini hanya contoh simulasi kalkulasi yang butuh waktu lama
    for (let i = 0; i < counter * 1000000; i++) {
      result++;
    }
    return result;
  }, [counter]);

  const handleFocusClick = () => {
    // Menggunakan ref untuk memberikan fokus pada elemen input
    inputRef.current.focus();
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>

      <h1>{NAMA}</h1>
      <h2>{NIM}</h2>

      <p>{PROGRAM_STUDI}</p>
      
      <hr style={{ margin: '20px 0' }} />
      
      <h3>Contoh Penggunaan Hooks</h3>

      {/* Contoh useState */}
      <div>
        <h4>1. useState</h4>
        <p>Nilai counter saat ini: <strong>{counter}</strong></p>
        <button onClick={() => setCounter(counter + 1)}>Tambah Counter</button>
      </div>

      {/* Contoh useEffect */}
      <div style={{ marginTop: '20px' }}>
        <h4>2. useEffect</h4>
        <p>Setiap kali Anda menekan tombol counter, judul tab browser ini akan berubah.</p>
      </div>
      
      {/* Contoh useRef */}
      <div style={{ marginTop: '20px' }}>
        <h4>3. useRef</h4>
        <input ref={inputRef} type="text" placeholder="Field input" />
        <button onClick={handleFocusClick} style={{ marginLeft: '10px' }}>Fokus ke Input</button>
      </div>

      {/* Contoh useMemo */}
      <div style={{ marginTop: '20px' }}>
        <h4>4. useMemo</h4>
        <p>Hasil Kalkulasi "Berat" (hanya dihitung ulang saat counter berubah): <strong>{complexCalculation}</strong></p>
        <p>(Buka console browser untuk melihat kapan kalkulasi ini dijalankan)</p>
      </div>
    </div>
  );
};

export default MyPage;