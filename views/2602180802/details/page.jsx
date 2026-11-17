"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { API_BASE, NIM, artwork } from "../config";
import useFavorites from "../useFavorites";
import styles from "../styles.module.css";

const STAT_LABEL = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

function Details() {
  const name = (useSearchParams().get("name") || "pikachu").toLowerCase();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const { favorites, toggle } = useFavorites();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/pokemon/${encodeURIComponent(name)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (res.status === 404) throw new Error(`Pokémon “${name}” tidak ditemukan`);
        if (!res.ok) throw new Error(`Request gagal (${res.status})`);
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [name]);

  const stats = useMemo(() => {
    if (!data) return null;
    const list = data.stats.map((s) => ({
      label: STAT_LABEL[s.stat.name] ?? s.stat.name,
      value: s.base_stat,
    }));
    return { list, total: list.reduce((sum, s) => sum + s.value, 0) };
  }, [data]);

  const playCry = () => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  if (loading) return <div className={`${styles.detail} ${styles.skeleton}`} style={{ minHeight: 360 }} />;

  if (error)
    return (
      <div className={styles.notice} role="alert">
        <p>{error}</p>
        <Link href={`/${NIM}`} className={styles.btn}>
          ← Kembali ke daftar
        </Link>
      </div>
    );

  const isFav = favorites.includes(data.id);

  return (
    <article className={styles.detail}>
      <Link href={`/${NIM}`} className={styles.back}>
        ← Kembali
      </Link>

      <div className={styles.detailTop}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={artwork(data.id)} alt={data.name} className={styles.detailArt} />

        <div>
          <span className={styles.num}>#{String(data.id).padStart(3, "0")}</span>
          <h2 className={styles.detailName}>{data.name}</h2>

          <div className={styles.tags}>
            {data.types.map((t) => (
              <span key={t.type.name} className={styles.tag}>
                {t.type.name}
              </span>
            ))}
          </div>

          <dl className={styles.facts}>
            <div>
              <dt>Tinggi</dt>
              <dd>{data.height / 10} m</dd>
            </div>
            <div>
              <dt>Berat</dt>
              <dd>{data.weight / 10} kg</dd>
            </div>
            <div>
              <dt>Base EXP</dt>
              <dd>{data.base_experience ?? "-"}</dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <button type="button" className={styles.btn} onClick={playCry}>
              🔊 Putar suara
            </button>
            <button
              type="button"
              className={`${styles.btn} ${isFav ? styles.btnOn : ""}`}
              onClick={() => toggle(data.id)}
              aria-pressed={isFav}
            >
              {isFav ? "★ Favorit" : "☆ Tambah favorit"}
            </button>
          </div>

          {data.cries?.latest && (
            <audio ref={audioRef} src={data.cries.latest} preload="none" />
          )}
        </div>
      </div>

      <h3 className={styles.h3}>Base stats</h3>
      <ul className={styles.stats}>
        {stats.list.map((s) => (
          <li key={s.label}>
            <span className={styles.statLabel}>{s.label}</span>
            <span className={styles.statVal}>{s.value}</span>
            <span className={styles.bar}>
              <span
                className={styles.barFill}
                style={{ width: `${Math.min(100, (s.value / 160) * 100)}%` }}
              />
            </span>
          </li>
        ))}
        <li className={styles.total}>
          <span className={styles.statLabel}>Total</span>
          <span className={styles.statVal}>{stats.total}</span>
        </li>
      </ul>

      <h3 className={styles.h3}>Abilities</h3>
      <div className={styles.tags}>
        {data.abilities.map((a) => (
          <span key={a.ability.name} className={styles.tagSoft}>
            {a.ability.name.replace("-", " ")}
            {a.is_hidden ? " (hidden)" : ""}
          </span>
        ))}
      </div>

      <div className={styles.pager}>
        {data.id > 1 ? (
          <Link href={`/${NIM}/details?name=${data.id - 1}`} className={styles.btn}>
            ← #{data.id - 1}
          </Link>
        ) : (
          <span />
        )}
        {data.id < 151 && (
          <Link href={`/${NIM}/details?name=${data.id + 1}`} className={styles.btn}>
            #{data.id + 1} →
          </Link>
        )}
      </div>
    </article>
  );
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<p>Memuat…</p>}>
      <Details />
    </Suspense>
  );
}
