import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movie";
import { useMovies } from "./hooks/useMovies.js";

//Custom hook
function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  //useRef hook
  const isFirstInput = useRef(true);

  useEffect(() => {
    //As the first time isFirstInput is true it will return without any error. As soon as user input something it will go into search and the flag willbe false
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("Field cannot be empty");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("Movie must have a name");
      return;
    }

    if (search.length < 3) {
      setError("Search must have at least 3 characters");
      return;
    }

    setError(null);
  }, [search]);
  return { search, setSearch, error };
}

function App() {
  //Calling custom hook from hooks folder

  const { search, setSearch, error } = useSearch();
  const [sort, setSort] = useState(false);
  const { movies, getMovies } = useMovies({ search, sort });

  //Update search everytime an user input something on the form
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  //Submit button handler from form
  const submitHandler = (event) => {
    event.preventDefault();
    getMovies();
  };

  return (
    <div className="page">
      <header>
        <h1
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          Movie Founder
        </h1>

        <form onSubmit={submitHandler}>
          <input
            className="form-input"
            placeholder="Avengers, Harry Potter, Matrix ...."
            onChange={searchHandler}
            value={search}
          />
          <input
            onChange={handleSort}
            checked={sort}
            type="checkbox"
            name="sorting"
          />
          <label htmlforor="sorting">Sort by name</label>
          <button>Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
