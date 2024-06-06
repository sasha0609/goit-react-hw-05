import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjg2ZTBiODAyYjViNTIwYTU4NThjZTMxMzRhZWM1NiIsInN1YiI6IjY2NjA0YTJiYTA2NDNiMjUwNzdkOGE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0l9X00BWXkjrQqs-jhBW_nd_9mb3717636WLgKWHh-Q";
const BASE_URL = "https://api.themoviedb.org/3";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});
export const getTrendingMovie = async () => {
  const response = await api.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await api.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`, {
    params: {
      language: "en-US",
    },
  });
  return response.data;
};

export const getCastApi = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};
export const getReviewsApi = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
