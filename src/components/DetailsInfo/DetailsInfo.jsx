import React from 'react'
import './DetailsInfo.css'
function DetailsInfo({movie}) {
  return (
    <div className='container details-info'>
        <h2>Synopsis</h2>

        <p>{movie?.overview}</p>
    </div>
  )
}

export default DetailsInfo