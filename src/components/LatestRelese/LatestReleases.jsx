import "./LatestReleases.css";
import Card from "../Card/Card";
import Slider from "../Slider/Slider";
import { useEffect, useState } from "react";
import apiClient, { movieType } from "../../api/apiClient";
import { Link } from "react-router-dom";

export default function LatestReleases() {
  const [movies, setMovies] = useState([])

  async function getMovies() {
  try {
    const res = await apiClient.getMoviesList(movieType.upcoming);
    const data = res.data.results.map(item => ({
      ...item,
      media_type: "movie"
    }));
    setMovies(data);
  } catch (err) {
    console.error("Error fetching movies:", err);
  }
}


  useEffect(() => {
    getMovies();
  },[])

  return (
    <div className="latest-container">
      <div className="container">
        <div className="heading-container">
          <h2 className="latest-title">Latest Releases</h2>
          <Link to="/list/movie/upcoming" className="view-more-btn">View More</Link>

        </div>


      </div>

      <Slider
        renderItem={(movie) => <Card movie={movie} />}
        items={movies}
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
