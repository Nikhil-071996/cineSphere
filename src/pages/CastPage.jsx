import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PersonPage.css";
import apiClient from "../api/apiClient";
import Slider from "../components/Slider/Slider";
import Card from "../components/Card/Card";

const imageBase = "https://image.tmdb.org/t/p/w300";

export default function CastPage() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPerson() {
      try {
        setLoading(true);
        setError(false);

        const [personRes, creditsRes] = await Promise.all([
          apiClient.getPerson(id),
          apiClient.getPersonCredits(id),
        ]);

        if (!personRes.data || personRes.status !== 200) {
          throw new Error("Person not found");
        }

        setPerson(personRes.data);
        setCredits(creditsRes.data?.cast?.slice(0, 10) || []);
      } catch (err) {
        console.error("Error fetching person details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPerson();
  }, [id]);

  if (loading) return <p className="loading-text">Loading...</p>;

  if (error || !person)
    return (
      <div className="not-found container">
        <h2>😕 Person Not Found</h2>
        <p>We couldn’t find details for this cast member. Try again later.</p>
        <Link to="/" className="back-btn">Go Home</Link>
      </div>
    );

  return (
    <div className="person-page">
      <div className="person-header container">
        <img
          src={
            person.profile_path
              ? imageBase + person.profile_path
              : "/no-avatar.png"
          }
          alt={person.name}
          className="person-image"
        />

        <div className="person-info">
          <h1>{person.name}</h1>
          <p>
            <strong>Known For:</strong> {person.known_for_department || "N/A"}
          </p>
          <p>
            <strong>Birthday:</strong> {person.birthday || "N/A"}
          </p>
          {person.place_of_birth && (
            <p>
              <strong>Place of Birth:</strong> {person.place_of_birth}
            </p>
          )}
          {person.biography && (
            <p className="biography">{person.biography}</p>
          )}
        </div>
      </div>

      <div className="latest-container">
        <div className="container">
          <div className="heading-container">
            <h2 className="latest-title">Famous Roles</h2>
          </div>
        </div>

        {credits.length > 0 ? (
          <Slider
            renderItem={(movie) => <Card movie={movie} />}
            items={credits}
            numberOfCards={6}
            breakpoints={{
              1024: 3.2,
              768: 2.3,
              480: 1.7,
            }}
          />
        ) : (
          <p className="no-credits-text">No roles found for this person.</p>
        )}
      </div>
    </div>
  );
}
