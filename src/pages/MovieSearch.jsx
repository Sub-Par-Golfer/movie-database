import React, { useState } from "react";
import "./MovieSearch.css";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const fetchMovies = async (title) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=67b7f307&s=${title}`
        );
        const data = await response.json();
        setMovies(data.Search || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const handleSearchChange = (event) => {
    const input = event.target.value;
    setQuery(input);

    if (input.trim()) {
      fetchMovies(input.trim());
    } else {
      setMovies([]);
    }
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    const sortedMovies = [...movies];
    switch (option) {
      case "a-z":
        sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case "z-a":
        sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
        break;
      case "year-asc":
        sortedMovies.sort((a, b) => a.Year - b.Year);
        break;
      case "year-desc":
        sortedMovies.sort((a, b) => b.Year - a.Year);
        break;
      default:
        break;
    }

    setMovies(sortedMovies);
  };

  return (
    <div className="movie-search">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={handleSearchChange}
      />
      <div className="sort-container">
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="a-z">Alphabetical (A-Z)</option>
          <option value="z-a">Alphabetical (Z-A)</option>
          <option value="year-asc">Year (Oldest to Newest)</option>
          <option value="year-desc">Year (Newest to Oldest)</option>
        </select>
      </div>
      {loading ? (
        <div className="movie-list">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="movie-card skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-year"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/150"
                }
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;