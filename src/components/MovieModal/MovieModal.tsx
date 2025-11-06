import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;

  // Закриваємо по натисканню Escape
  useEffect(() => {
    //  Забороняємо скролінг тіла сторінки
    document.body.style.overflow = "hidden";

    //  Додаємо слухач клавіші Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    //  При розмонтуванні компонента:
    return () => {
      // Відновлюємо прокручування
      document.body.style.overflow = "auto";
      // Прибираємо слухач
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  // Закриваємо по кліку на фон (backdrop)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Якщо немає контейнера — нічого не рендеримо
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={styles.image}
        />
        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
