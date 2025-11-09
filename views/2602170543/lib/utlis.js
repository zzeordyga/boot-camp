export function formatPokemonId(id) {
  return id.toString().padStart(3, "0");
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatStatName(statName) {
  return statName.replace("-", " ");
}
