'use client'
import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react'

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2/"

const PokemonDetailPage = ({ params }) => {
    const [sprite, setSprite] = useState("");
    const POKEMON_NAME = params.name;

    const fetchPokemon = useCallback(async () => {
        const { data }  = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${POKEMON_NAME}`);

        setSprite(data.sprites.front_default);
    }, [POKEMON_NAME])

    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon])

    return (
        <div>
            <img
                src={sprite}
                alt={POKEMON_NAME}
            />
            {POKEMON_NAME}
        </div>
    )
}

export default PokemonDetailPage