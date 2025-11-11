import React, { useRef, useState } from 'react'
import './DetailsBanner.css'

import playIcon from '../../assets/Home/play-trailer.svg'
import TrailerComponent from '../Trailer/TrailerComponent';



function DetailsBanner({movie, type}) {

    const [trailerMovieId, setTrailerMovieId] = useState(null);
    const btnRef = useRef(null);
  

  const image_path = 'https://image.tmdb.org/t/p/w1280'
    const title = movie?.title || movie?.name;

    const runtime = movie?.runtime
    ? `${Math.floor(movie?.runtime / 60)}h ${movie?.runtime % 60}m`
    : null;

  const genres =
    movie?.genres && movie?.genres.length
      ? movie?.genres.map((g) => g.name).join(" • ")
      : "No genres listed";

  const meta = movie?.number_of_seasons
    ? `${movie?.number_of_seasons} Season${
        movie?.number_of_seasons > 1 ? "s" : ""
      } • ${genres}`
    : runtime
    ? `${runtime} • ${genres}`
    : genres;

    const year =
    movie?.release_date || movie?.first_air_date
      ? new Date(movie?.release_date || movie?.first_air_date).getFullYear()
      : "N/A";

      
  return (
    <div className='details-banner'>
      <TrailerComponent
        movieId={trailerMovieId}
        type={type}
        triggerRef={btnRef}
        onClose={() => setTrailerMovieId(null)}
      />
      <div className="overlay"></div>

        <div className="image-container">
            <img src={image_path + movie?.backdrop_path} alt="Banner1" />
        </div>

        <div className="banner-content">
          {/* Left section */}
          <div className="banner-info">
            <p className="year">{year}</p>
            <h1 className="title">{title}</h1>
            <p className="meta">{meta}</p>

            <div className="buttons">
              <button
                className="btn play-btn"
                onClick={() => setTrailerMovieId(movie?.id)}
              >
                <img src={playIcon} alt="" />
                <span>Watch Trailer</span>
              </button>
            </div>

            
          </div>
        </div>
    </div>
  )
}

export default DetailsBanner