import axios from "axios";
import type { AxiosResponse } from "axios";
import type { MoviesResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

// 🔑 Твій токен авторизації з .env
// .env: VITE_TMDB_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesParams {
  query: string;
  page?: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<MoviesResponse> {
  if (!query.trim()) {
    throw new Error("Порожній запит");
  }

  try {
    const response: AxiosResponse<MoviesResponse> = await axios.get(BASE_URL, {
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
