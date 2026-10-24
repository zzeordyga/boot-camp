'use client'
import { useState, useEffect, useRef, useMemo } from 'react';
import styles from '../cats.module.css';

const coatGroups = ['All', 'Short', 'Long', 'Mixed', 'Hairless', 'Rex', 'Unknown'];

const getCoatGroup = (coat) => {
  const value = coat.toLowerCase();
  if (!value) return 'Unknown';
  if (value.includes('hairless')) return 'Hairless';
  if (value.includes('rex')) return 'Rex';
  if (value === 'all' || (value.includes('short') && value.includes('long'))) return 'Mixed';
  if (value.includes('long') || value.includes('medium')) return 'Long';
  if (value.includes('short')) return 'Short';
  return 'Unknown';
};

export default function BreedsPage() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [query, setQuery] = useState('');
  const [coat, setCoat] = useState('All');
  const [sortBy, setSortBy] = useState('breed');
  const searchRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    fetch('https://catfact.ninja/breeds?limit=100', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setBreeds(data.data.map((breed) => ({ ...breed, coatGroup: getCoatGroup(breed.coat) })));
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    searchRef.current.focus();
    const onKeyDown = (event) => {
      if (event.key === '/' && document.activeElement !== searchRef.current) {
        event.preventDefault();
        searchRef.current.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const coatCounts = useMemo(() => {
    const counts = { All: breeds.length };
    breeds.forEach((breed) => {
      counts[breed.coatGroup] = (counts[breed.coatGroup] || 0) + 1;
    });
    return counts;
  }, [breeds]);

  const visibleBreeds = useMemo(() => {
    const term = query.trim().toLowerCase();
    return breeds
      .filter((breed) => coat === 'All' || breed.coatGroup === coat)
      .filter(
        (breed) =>
          !term ||
          breed.breed.toLowerCase().includes(term) ||
          breed.country.toLowerCase().includes(term)
      )
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [breeds, query, coat, sortBy]);

  return (
    <>
      <h2 className={styles.title}>Cat breeds</h2>

      <div className={styles.toolbar}>
        <input
          ref={searchRef}
          className={styles.search}
          type="search"
          placeholder="Search breed or country…  ( / )"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className={styles.select}
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Sort by"
        >
          <option value="breed">Sort by name</option>
          <option value="country">Sort by country</option>
        </select>
      </div>

      <div className={styles.chips}>
        {coatGroups
          .filter((group) => coatCounts[group])
          .map((group) => (
            <button
              key={group}
              className={`${styles.chip} ${coat === group ? styles.chipActive : ''}`}
              onClick={() => setCoat(group)}
            >
              {group}
              <span className={styles.chipCount}>{coatCounts[group]}</span>
            </button>
          ))}
      </div>

      {error && (
        <div className={styles.error}>
          {error}{' '}
          <button className={styles.ghostButton} onClick={() => setReloadKey((key) => key + 1)}>
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className={styles.skeleton} />
          ))}
        </div>
      ) : (
        <>
          <p className={styles.resultCount}>
            Showing {visibleBreeds.length} of {breeds.length} breeds
          </p>
          {visibleBreeds.length === 0 ? (
            <div className={styles.empty}>No breeds match “{query}”.</div>
          ) : (
            <div className={styles.grid}>
              {visibleBreeds.map((breed) => (
                <article key={breed.breed} className={styles.breedCard}>
                  <h3 className={styles.breedName}>{breed.breed}</h3>
                  <p className={styles.breedCountry}>{breed.country || 'Unknown origin'}</p>
                  <div className={styles.tags}>
                    {[breed.coat, breed.pattern, breed.origin]
                      .filter(Boolean)
                      .map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
