import React, { useState, useEffect, useRef, useMemo } from 'react';

const HalamanProfilSaya = () => {
  const namaMahasiswa = 'Riezky rizawardana';
  const nimMahasiswa = '2540131696';

  const [pesan, setPesan] = useState('');
  const [counter, setCounter] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const kalkulasiKompleks = useMemo(() => {
    console.log('Melakukan kalkulasi kompleks...');
    return counter * 2;
  }, [counter]);

  useEffect(() => {
    document.title = `Counter: ${counter}`;
  }, [counter]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', lineHeight: '1.5' }}>
      
      <h1 style={{ color: '#007bff' }}>{namaMahasiswa} - {nimMahasiswa}</h1>
      
      <p>
        Saya adalah mahasiswa dari program studi Computer Science yang memiliki ketertarikan pada Penggunaan React.
      </p>

      <hr style={{ margin: '2rem 0' }} />

      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>Contoh Penggunaan Hooks</h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{color: '#555'}}>Hook: useState & useRef</h3>
        <label htmlFor="pesan">Tinggalkan Pesan: </label>
        <input
          ref={inputRef}
          id="pesan"
          type="text"
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          style={{ padding: '0.5rem', marginLeft: '0.5rem', width: '250px' }}
        />
        {pesan && <p>Pesanmu: <strong>{pesan}</strong></p>}
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{color: '#555'}}>Hook: useEffect & useMemo</h3>
        <p>Nilai Counter: {counter}</p>
        <p>Hasil Kalkulasi (di-cache oleh useMemo): {kalkulasiKompleks}</p>
        <button onClick={() => setCounter(c => c + 1)} style={{ padding: '0.5rem 1rem' }}>
          Tambah Counter
        </button>
        <p style={{fontSize: '0.9em', color: '#666'}}>
          <i>(Perhatikan judul tab browser dan konsol saat tombol ini diklik)</i>
        </p>
      </div>

    </div>
  );
};

export default HalamanProfilSaya;