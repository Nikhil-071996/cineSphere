import React from 'react'
import './Card.css'
import starIcon from '../../assets/Home/star-icon.svg'
import { Link } from 'react-router-dom';

function LongCard({movie}) {

  const image_path = 'https://image.tmdb.org/t/p/w1280'
    const title = movie?.title || movie?.name;
    const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A';


  return (
        <Link to={`/details/${movie?.media_type}/${movie?.id}`} className="movie-long-card" key={movie?.id}>
            <img src={image_path + movie.backdrop_path} alt={movie?.title} className="movie-img" draggable="false" />
            <h3 className="movie-title">{title}</h3>
            <div className='rating-container'>
                <div className="stardiv">
                    <img src={starIcon} alt="starIcon" />
                    <span>{rating}</span>
                </div>
                <span>|</span>
                {/* <p className="movie-genres">{movie?.genres.join(" • ")}</p> */}
            </div>
        </Link>
  )
}

export default LongCard