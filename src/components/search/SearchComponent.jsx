import React from "react";
import "./search-component.css";
import Card from "../Card/Card";

export default function SearchComponent({ 
  showSearch,
  results,
  loading,
  searched,
  closeSearch,
}) {

  // ✅ Filter only movies and TV
  const filteredResults = results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );

  return (
    <section className={`search-div ${showSearch ? "active" : ""}`}>
      <div className="container">

        {loading && <p className="loading-text">Searching...</p>}

        {!loading && searched && filteredResults.length === 0 && (
          <p className="no-results">No movies or TV shows found.</p>
        )}

        {!loading && filteredResults.length > 0 && (
          <div className="results-container">
            <h2 className="results-title">Search Results</h2>

            <div className="search-card-container" onClick={closeSearch} >
              {filteredResults.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
