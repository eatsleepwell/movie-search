import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";

const searchImage =
  "https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg";
const API_KEY = "ee269a0a";
const API_URL = `http://www.omdbapi.com?apikey=${API_KEY}`;

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();

    setMovies(data.Search);
  };

  const handleKeyDown = (event) => {
    event.key === "Enter" && searchMovies(search);
  };

  return (
    <div className="app">
      <h1>Movie test</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search movie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={searchImage}
          alt="search"
          onClick={() => searchMovies(search)}
        />
      </div>

      {movies?.length > 0 ? (
        <article className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </article>
      ) : (
        <div className="empty">
          <h2>No movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
