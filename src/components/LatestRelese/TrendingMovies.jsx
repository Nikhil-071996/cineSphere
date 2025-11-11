// src/components/TrendingMovies/TrendingMovies.jsx
import React, { useEffect, useState } from "react";
import Slider from "../Slider/Slider";
import Card from "../Card/Card";
import apiClient from "../../api/apiClient";
import { Link } from "react-router-dom";

export default function TrendingMovies() {
  const [trending, setTrending] = useState([]);

  async function getTrendingData() {
    try {
      const res = await apiClient.getTrending("all", "day"); // fetches trending movies & shows of the day
      const data = res.data.results;
      setTrending(data);
    } catch (err) {
      console.error("Error fetching trending data:", err);
    }
  }

  useEffect(() => {
    getTrendingData();
  }, []);

  return (
    <div className="trending-movies">
      <div className="container">
        <div className="heading-container">
          <h2 className="latest-title">Trending Movies & Shows</h2>
          <Link to="/list/movie-and-shows/trending" className="view-more-btn">View More</Link>

        </div>
      </div>

      <Slider
        renderItem={(item) => <Card movie={item} />}
        items={trending}
        numberOfCards={6}
        breakpoints={{
          1024: 3.2,
          768: 2.3,
          480: 1.7,
        }}
      />
    </div>
  );
}
