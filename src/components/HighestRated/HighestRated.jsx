// src/components/HighestRated/HighestRated.jsx
import React, { useEffect, useState } from "react";
import "./HighestRated.css";
import Slider from "../Slider/Slider";
import LongCard from "../Card/LongCard";
import apiClient, { movieType } from "../../api/apiClient";
import { Link } from "react-router-dom";

export default function HighestRated() {
  const [movies, setMovies] = useState([]);

  async function getTopRatedMovies() {
    try {
      const res = await apiClient.getMoviesList(movieType.top_rated);
      const data = res.data.results.map(item => ({
        ...item,
        media_type: "movie"
      }));
      setMovies(data);
    } catch (err) {
      console.error("Error fetching top rated movies:", err);
    }
  }

  useEffect(() => {
    getTopRatedMovies();
  }, []);

  return (
    <div className="latest-container">
      <div className="container">
        <div className="heading-container">
          <h2 className="latest-title">Highest Rated Movies</h2>
          <Link to="/list/movie/top_rated" className="view-more-btn">View More</Link>
        </div>
      </div>

      <Slider
        renderItem={(movie) => <LongCard movie={movie} />}
        items={movies}
        numberOfCards={3.5}
        breakpoints={{
          1024: 3.2,
          768: 2.3,
          480: 1.5,
        }}
      />
    </div>
  );
}
