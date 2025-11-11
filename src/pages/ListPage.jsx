import React from 'react'
import MovieLists from '../components/Lists/MovieLists';
import { useParams } from 'react-router-dom';

function ListPage() {
    const { mediaType, category } = useParams();
    
  return (
    <div>
        <MovieLists 
            mediaType={mediaType}
            category={category}
        />
    </div>
  )
}

export default ListPage