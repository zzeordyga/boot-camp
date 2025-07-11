const API_URL = "https://api.jikan.moe/v4";

const api = {
  getTopAnime: `${API_URL}/top/anime`,
  getAnimeFullById: (id) => `${API_URL}/anime/${id}/full`,
};

export default api;
