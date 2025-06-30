'use client'
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2/"

export default function Home() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const { data: { results } } = await axios.get(`${POKEAPI_BASE_URL}/pokemon`, {
      params: {
        limit: 500,
      }
    })

    setData(results);
  }

  const capitilize = (name) => {
    const cappedName = name.at(0).toUpperCase() + name.slice(1); 
    
    return cappedName;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3 p-5">
      {
        data.map((pokemon) => (
          <Card key={pokemon.name}>
            <CardContent>
              <Link href={pokemon.name}>
                {capitilize(pokemon.name)}
              </Link>
            </CardContent>
          </Card>
        ))
      }
    </div>
  );
}
