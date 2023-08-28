import { useState, useRef, useMemo } from "react";
import { searchMovies } from "../services/movies.js";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const prevSearch = useRef(search);

  const getMovies = async () => {
    if (prevSearch.current === search) return;
    try {
      prevSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      throw new Error("Problem rendering movies");
    }
  };

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies };
}
