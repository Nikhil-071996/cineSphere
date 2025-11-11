import React, { useEffect, useState, useRef } from "react";
import "./SliderBanner.css";
import playIcon from '../../assets/Home/play-trailer.svg'
import apiClient, { movieType } from "../../api/apiClient";
import TrailerComponent from "../Trailer/TrailerComponent";
import { Link } from "react-router-dom";

function SliderBanner() {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([]);
  const [trailerMovieId, setTrailerMovieId] = useState(null);
  const btnRef = useRef(null);
  const timerRef = useRef(null);
  const image_path = 'https://image.tmdb.org/t/p/w1280';

  const startAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(timerRef.current);
  }, [slides]);

  const handleDotClick = (index) => {
    setCurrent(index);
    startAutoSlide();
  };

  const getPositionClass = (index) => {
    if (index === current) return "active";
    if (index === (current - 1 + slides.length) % slides.length) return "after-active";
    return "before-active";
  };

  const getMovies = async () => {
    try {
      const res = await apiClient.getMoviesList(movieType.popular);
      const firstFive = res.data.results.slice(0, 5);
      setSlides(firstFive);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    if (trailerMovieId) {
      clearInterval(timerRef.current); 
    } else {
      startAutoSlide(); 
    }

    return () => clearInterval(timerRef.current);
  }, [trailerMovieId]);


  return (
    <div className="banner">

      <TrailerComponent
        movieId={trailerMovieId}
        type="movie"
        triggerRef={btnRef}
        onClose={() => setTrailerMovieId(null)}
      />

      <div className="overlay"></div>

      {/* Background Images */}
      <div className="image-container">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`bg-image ${index === current ? "active" : ""}`}>
            <img src={image_path + slide.backdrop_path} alt={slide.title} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="content-container container">
        <div className="heading">
          {slides.map((slide, index) => (
            <h1 key={`title-${slide.id}`} className={getPositionClass(index)}>
              {slide.title}
            </h1>
          ))}
        </div>

        <div className="heading small">
          {slides.map((slide, index) => (
            <p key={`subtitle-${slide.id}`} className={getPositionClass(index)}>
              {slide.overview}
            </p>
          ))}
        </div>

        <div className="heading btn-container">
          {slides.map((slide, index) => (
            <div key={`btns-${slide.id}`} className={`buttons ${getPositionClass(index)}`}>
              <Link to={`/details/movie/${slide?.id}`} className="btn explore">Explore</Link>
              <button
                className="btn play-btn"
                onClick={() => setTrailerMovieId(slide?.id)}
              >
                <img src={playIcon} alt="" />
                <span>Watch Trailer</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="nav-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default SliderBanner;
