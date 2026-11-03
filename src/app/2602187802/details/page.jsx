"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../styles.module.css";

function DetailContent() {
  const name = useSearchParams().get("name");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;
    setData(null);
    setError(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokémon tidak ditemukan");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [name]);

  const maxStat = useMemo(
    () => (data ? Math.max(...data.stats.map((x) => x.base_stat)) : 1),
    [data]
  );

  if (!name) return <p className={styles.message}>Pilih Pokémon dari halaman Home.</p>;
  if (error) return <p className={styles.message}>{error}</p>;
  if (!data) return <p className={styles.message}>Memuat...</p>;

  return (
    <section className={styles.detail}>
      <img src={data.sprites.front_default} alt={data.name} className={styles.detailImg} />
      <h2>{data.name}</h2>
      <p>Type: {data.types.map((t) => t.type.name).join(", ")}</p>
      <p>Height: {data.height / 10} m · Weight: {data.weight / 10} kg</p>
      <div className={styles.stats}>
        {data.stats.map((x) => (
          <div key={x.stat.name} className={styles.stat}>
            <span>{x.stat.name}</span>
            <div
              className={styles.bar}
              style={{ width: `${(x.base_stat / maxStat) * 100}%` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<p className={styles.message}>Loading...</p>}>
      <DetailContent />
    </Suspense>
  );
}