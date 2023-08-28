function ListMovie({ movies }) {
  return (
    <ul className="list-movie">
      {movies.map((movie) => (
        <li className="list-movie-item" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  );
}

function NoMovie() {
  return <p>No movies found</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <ListMovie movies={movies} /> : <NoMovie />;
}
