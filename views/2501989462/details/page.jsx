"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Layout from "../layout";

const DetailsPage = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    if (!name) return;

    const fetchDetails = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setDetails(data);
      setLoading(false);
    };

    fetchDetails();
  }, [name]);

  return (
    <Layout>
      <h2>Pokémon Details</h2>
      {loading || !details ? (
        <p>Loading details...</p>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h3>{details.name.toUpperCase()}</h3>
          <img src={details.sprites.front_default} alt={details.name} />
          <p>Height: {details.height}</p>
          <p>Weight: {details.weight}</p>
        </div>
      )}
    </Layout>
  );
};

export default DetailsPage;
