import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom';
function Card({movie}) {

  const image_path = 'https://image.tmdb.org/t/p/w1280'
    const title = movie?.title || movie?.name;


  return (
        <Link to={`/details/${movie?.media_type}/${movie?.id}`} className="movie-card" key={movie?.id}>
            <img src={image_path + movie.poster_path} alt={movie?.title} className="movie-img" draggable="false" />
            <h3 className="movie-title">{title}</h3>
            {/* <p className="movie-genres">{movie?.genres.join(" • ")}</p> */}
        </Link>
  )
}

export default Card