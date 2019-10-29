import React, { Fragment , useState, useEffect } from 'react';

import { ShowListItem } from './ShowsListItem';
import './index.css';

const APIpopular = 'https://api.themoviedb.org/3/tv/popular?api_key=b60f6f3bc0144a49cfbb287ea1f5e215&language=en-US&page=';
const APItopRate = 'https://api.themoviedb.org/3/tv/top_rated?api_key=b60f6f3bc0144a49cfbb287ea1f5e215&language=en-US&page=';
let pageNumber = 1;
let disabled = true;
let flag = 1;

export function ShowList() {
    
    const [ loaded, setLoaded ] = useState( true );
    const [ show, setShow ] = useState( [] );
    
    useEffect( () => {
        
        async function fetchdata(API) {
           
            const res = await fetch( API );
            res
                .json() 
                .then( res => setShow( res ) )
                .then(loaded => setLoaded(false))
                .catch(err => {
                    console.log('Cant get TVshows', err);
                  });
            };
        
        fetchdata(APIpopular);
        
        },[]
        
    );
    async function switchAPI(API) {
          if (API === APIpopular) {
              flag = 1; pageNumber = 1;
            }
          else if(API ===APItopRate) {
              flag = 0; pageNumber = 1;
            } 
        const res = await fetch( API  );
        res
            .json() 
            .then( res => setShow( res ) )
            .then(loaded => setLoaded(false))
            .catch(err => {
                console.log('Cant get TVshows', err);
              });
               
        };
        const nextStep = () => {
           disabled = false;
            pageNumber += 1;
           if (flag === 1){
            switchAPI(APIpopular + pageNumber);
            document.body.scrollTop = document.documentElement.scrollTop = 0; 
        }
            else if (flag === 0){
            switchAPI(APItopRate + pageNumber);
            document.body.scrollTop = document.documentElement.scrollTop = 0;   
            
        }
    }
        const prevStep = () => {
           if( pageNumber === 1 ) {
           disabled = false;
         return disabled = true
        }
            pageNumber -= 1;
           if ( flag === 1 ){
            switchAPI(APIpopular + pageNumber);
         document.body.scrollTop = document.documentElement.scrollTop = 0; 
        }
            else if (flag === 0){
            switchAPI(APItopRate + pageNumber);
            document.body.scrollTop = document.documentElement.scrollTop = 0;    
            }
        }
    return (
        <Fragment>
            <button   className="button" onClick={() =>  switchAPI(APIpopular)}>Popular TV shows</button>
            <button className="button" onClick={() => switchAPI(APItopRate)}>Top Rated TV shows</button>
            <div className='shows'> 
                { !loaded ? show.results.map( show => 
                < ShowListItem { ...show } key={show.id}/> ) : <h3>Loading...</h3>
                }
            </div>
            <button className="button prev" onClick={() => prevStep()} disabled={disabled} >Previous Page</button>
            <button className="button" onClick={() => nextStep()} >Next Page</button>
        </Fragment>
        )
}
