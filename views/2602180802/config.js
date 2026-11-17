export const NIM = "2602180802";
export const STUDENT_NAME = "Muhammad Evran Khadafi";

export const API_BASE = "https://pokeapi.co/api/v2";

export const artwork = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const idFromUrl = (url) => Number(url.split("/").filter(Boolean).pop());
