import React from 'react';
import './index.css';



export function ShowListItem(show) {
    const posterURL = 'http://image.tmdb.org/t/p/w185'
    return (
        <div className= 'show'>
             <h4 className='name'>{show.name}</h4>
             <img src={posterURL + show.poster_path} alt='pic'></img>
             <h5> Overview: {show.overview}</h5>
        </div>
    )
    }