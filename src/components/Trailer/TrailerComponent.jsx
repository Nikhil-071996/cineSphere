import React, { useState, useEffect, useRef } from "react";
import closebtn from "../../assets/Home/close.png";
import "./TrailerComponent.css";
import apiClient from "../../api/apiClient";

function TrailerComponent({ type, movieId, onClose, triggerRef }) {
  const [trailerUrl, setTrailerUrl] = useState(null);
  const overlayRef = useRef(null);

  const fetchTrailer = async (id) => {
    try {
      const res = await apiClient.getVideo(type, id);
      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
      } else {
        alert("Trailer not available");
        onClose();
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
      onClose();
    }
  };

  const handleEnterFullscreen = async () => {
    const trailerContainer = overlayRef.current;

    if (trailerContainer && trailerContainer.requestFullscreen) {
      await trailerContainer.requestFullscreen();
    } else if (trailerContainer && trailerContainer.webkitRequestFullscreen) {
      trailerContainer.webkitRequestFullscreen(); // Safari
    }

    // Try locking to landscape
    if (screen.orientation && screen.orientation.lock) {
      try {
        await screen.orientation.lock("landscape");
      } catch (err) {
        console.warn("Orientation lock failed:", err);
      }
    }
  };


  useEffect(() => {
    if (movieId) fetchTrailer(movieId);
  }, [movieId]);

  useEffect(() => {
    if (trailerUrl) {
      handleEnterFullscreen();
    }
  }, [trailerUrl]);


  // Prevent scrolling while active
  useEffect(() => {
    if (movieId) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [movieId]);

  const handleClose = async () => {
    setTrailerUrl(null);
    onClose();

    // Exit fullscreen and unlock orientation
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }

    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
  };


  return (
    <div
      className={`trailer-overlay ${movieId ? "active" : ""}`}
      ref={overlayRef}
    >
      <button className="close-trailer-btn" onClick={handleClose}>
        <img src={closebtn} alt="close" />
      </button>

      <div className="trailer-container">
        {trailerUrl ? (
          <iframe
            width="100%"
            height="100%"
            src={trailerUrl}
            title="Movie Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        ) : (
          // optional loader placeholder
          <p className="loading-trailer">Loading trailer...</p>
        )}
      </div>
    </div>
  );
}

export default TrailerComponent;
