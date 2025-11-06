import styles from "./App.module.css";
import { Toaster, toast } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";

import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(false);
      //  Очищаємо попередній список фільмів при новому запиті
      setMovies([]);
      setSelectedMovie(null); // скидаємо обраний фільм при новому пошуку

      const data = await fetchMovies({ query });

      if (!data.results || data.results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      //  Якщо фільми знайдені — оновлюємо стан
      setMovies(data.results);
    } catch (error) {
      setError(true);
      toast.error("Something went wrong while fetching movies.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //  Викликається при кліку на фільм у гріді
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  //  Закриває модалку
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-center" />
      {loading && <p className={styles.text}>Loading movies, please wait...</p>}
      {/* Рендеримо MovieGrid лише якщо є фільми */}
      {error && <ErrorMessage />}
      {!error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
