import React from 'react'
import SliderBanner from '../components/SliderBanner/SliderBanner'
import LatestReleases from '../components/LatestRelese/LatestReleases'
import TrendingMovies from '../components/LatestRelese/TrendingMovies'
import HighestRated from '../components/HighestRated/HighestRated'
import HighestRatedSeries from '../components/HighestRated/HighestRatedSeries'

function Home() {
  return (
    <div>
        <SliderBanner />
        <LatestReleases />

        <TrendingMovies />
        <HighestRated />
        <HighestRatedSeries />
    </div>
  )
}

export default Home