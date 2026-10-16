import { useState, useEffect, useRef, useMemo } from "react";

export default function StudentPage() {
const [count, setCount] = useState(0);
const [hobby, setHobby] = useState("");

const inputRef = useRef(null);

useEffect(() => {
document.title = "Student Profile";
}, []);

const doubleCount = useMemo(() => {
return count * 2;
}, [count]);

const focusInput = () => {
inputRef.current?.focus();
};

return (
<div
style={{
maxWidth: "700px",
margin: "50px auto",
padding: "30px",
fontFamily: "Arial, sans-serif",
backgroundColor: "#f8fafc",
borderRadius: "16px",
color: "#1e293b",
}}
> <h1>Student Profile</h1>

```
  <h2>Nama: Rendy Hermawan</h2>
  <p>
    <strong>NIM:</strong> 2602069785
  </p>

  <p>
    Saya adalah mahasiswa Program Studi Computer Science.
    Saya tertarik mempelajari teknologi, pengembangan web,
    dan membangun aplikasi menggunakan React.
  </p>

  <hr />

  <h3>React Hooks Playground</h3>

  <section>
    <h4>useState</h4>
    <p>Jumlah klik: {count}</p>
    <button onClick={() => setCount(count + 1)}>
      Tambah Angka
    </button>
  </section>

  <section>
    <h4>useMemo</h4>
    <p>Hasil perkalian count × 2: {doubleCount}</p>
  </section>

  <section>
    <h4>useRef</h4>
    <input
      ref={inputRef}
      type="text"
      value={hobby}
      onChange={(event) => setHobby(event.target.value)}
      placeholder="Coding"
    />

    <button onClick={focusInput}>
      Fokus ke Input
    </button>

    <p>Hobi: {hobby || "Coding"}</p>
  </section>
</div>


);
}
