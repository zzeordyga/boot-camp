"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const DetailsPage = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    if (!name) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        setDetails(data);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [name]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Link
          href="/2501989462"
          style={{
            backgroundColor: "#2c3e50",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          ← Back to Home
        </Link>
        <h2 style={{ flex: 1, textAlign: "center", margin: 0 }}>
          Pokémon Details
        </h2>
        <div style={{ width: "125px" }}></div>
      </div>

      {loading || !details ? (
        <p>Loading details...</p>
      ) : (
        <div style={{ textAlign: "center", textTransform: "capitalize" }}>
          <h3>{details.name}</h3>
          <img src={details.sprites.front_default} alt={details.name} />
          <p>
            <strong>Height:</strong> {details.height}
          </p>
          <p>
            <strong>Weight:</strong> {details.weight}
          </p>
        </div>
      )}
    </>
  );
};

export default DetailsPage;
