import React from "react";
import "./CastDetails.css";
import { useNavigate } from "react-router-dom";

const imageBase = "https://image.tmdb.org/t/p/w185";

function CastDetails({ credits }) {
  const navigate = useNavigate();

  if (!credits || credits.length === 0) return null;

  const handleClick = (id) => {
    navigate(`/person/${id}`);
  };

  return (
    <div className="container">
      <h2>Cast</h2>

      <div className="cast-container">
        {credits.slice(0, 12).map((member) => (
          <div
            className="cast"
            key={member.id}
            onClick={() => handleClick(member.id)}
          >
            <div className="image-container">
              <img
                src={
                  member.profile_path
                    ? imageBase + member.profile_path
                    : "/no-avatar.png"
                }
                alt={member.name}
              />
            </div>
            <p className="actor-name">{member.name}</p>
            <p className="character-name">{member.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CastDetails;
