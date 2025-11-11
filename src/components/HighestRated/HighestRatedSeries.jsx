import React, { useEffect, useState } from 'react'
import './HighestRated.css'
import Slider from '../Slider/Slider';

import LongCard from '../Card/LongCard';
import apiClient, { tvType } from '../../api/apiClient';
import { Link } from 'react-router-dom';


function HighestRatedSeries() {

  const [movies, setMovies] = useState([]);
  
    async function getTopRatedSeries() {
      try {
        const res = await apiClient.getTvList(tvType.top_rated);
        const data = res.data.results.map(item => ({
        ...item,
        media_type: "tv"
      }));
        
        setMovies(data);
      } catch (err) {
        console.error("Error fetching top rated movies:", err);
      }
    }
  
    useEffect(() => {
      getTopRatedSeries();
    }, []);

  return (
    <div className="latest-container">
        <div className="container">
          <div className="heading-container">
            <h2 className="latest-title">Highest Rated Shows</h2>
            <Link to="/list/tv/top_rated" className="view-more-btn">View More</Link>
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
  )
}

export default HighestRatedSeries