import React from "react";
import LongCard from "../Card/LongCard";
import Slider from "../Slider/Slider";

function SimilarShows({ similar = [], type }) {
  const hasSimilar = similar && similar.length > 0;

  return (
    <div className="latest-container">
      <div className="container">
        <h2 className="latest-title">
          Similar {type === "movie" ? "Movies" : "Shows"} for You
        </h2>
      </div>

      {hasSimilar ? (
        <Slider
          renderItem={(item) => <LongCard movie={item} />}
          items={similar}
          numberOfCards={3.5}
          breakpoints={{
            1024: 3.2,
            768: 2.3,
            480: 1.5,
          }}
        />
      ) : (
        
        <div className="container no-similar-msg">
          <p>No similar {type === "movie" ? "movies" : "shows"} found.</p>
        </div>
      )}
    </div>
  );
}

export default SimilarShows;
