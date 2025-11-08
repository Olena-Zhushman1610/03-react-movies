import axios from "axios";

import type { Movie } from "../types/movie";
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesParams {
  query: string;
  page?: number;
}

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<MoviesResponse> {
  if (!query.trim()) {
    throw new Error("Порожній запит");
  }

  try {
    const response = await axios.get<MoviesResponse>(BASE_URL, {
      params: {
        query,
        page,
        include_adult: false,
        language: "en-US",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Помилка запиту до TMDB:", error);
    throw new Error("Не вдалося завантажити фільми");
  }
}
