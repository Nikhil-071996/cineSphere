import React, { useEffect, useState } from 'react'
import DetailsBanner from '../components/DetailsBanner/DetailsBanner'
import DetailsInfo from '../components/DetailsInfo/DetailsInfo'
import CastDetails from '../components/CastDetails/CastDetails'
import SimilarShows from '../components/SimilarShows/SimilarShows'
import { useParams } from 'react-router-dom'
import apiClient from '../api/apiClient'

function MovieDetails() {

  const { id, category } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [similar, setSimilar] = useState([]);

  async function fetchMovie() {
    try {
      const [detailsRes, creditsRes, similarRes] = await Promise.all([
        apiClient.getDetails(category, id),
        apiClient.getCredits(category, id),
        apiClient.getSimilar(category, id),
      ]);
      setMovie(detailsRes.data);
      setCredits(creditsRes.data.cast);
      setSimilar(similarRes.data.results.map(item => ({
      ...item,
      media_type: category
    })));
    } catch (err) {
      console.error("Error fetching movie details:", err);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, [id]);

  return (
    <>
        <DetailsBanner movie={movie} type={category} />
        <DetailsInfo movie={movie} />
        <CastDetails credits={credits} />

        <SimilarShows similar={similar} type={category} />
    </>
  )
}

export default MovieDetails