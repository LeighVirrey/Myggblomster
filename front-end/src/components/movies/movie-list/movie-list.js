import React, { useEffect, useState } from 'react';

// heres the keys and stuff
//api read access
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGZmOWFmZjdlYzQ0YmI4NjQ0YzI0OWFiYmE5ZmM3NCIsIm5iZiI6MTczNzk5NTQwOC40NTEsInN1YiI6IjY3OTdiNDkwMGUxZTA0ODZkNjJiNDc2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCu2m8iw8_11DaUtIG4zkMZ9o02KHgTDpt1xYXr-Y0I
//api key
//80ff9aff7ec44bb8644c249abba9fc74

//remember this: https://developer.themoviedb.org/reference/genre-movie-list

//here's this one https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc


  
const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [pages, setPages] = useState(1);
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGZmOWFmZjdlYzQ0YmI4NjQ0YzI0OWFiYmE5ZmM3NCIsIm5iZiI6MTczNzk5NTQwOC40NTEsInN1YiI6IjY3OTdiNDkwMGUxZTA0ODZkNjJiNDc2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCu2m8iw8_11DaUtIG4zkMZ9o02KHgTDpt1xYXr-Y0I'
      }
    };
    useEffect(() => {
            fetch(url, options)
              .then(res => res.json())
              .then(json => setMovies(json.results))
              .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Movie List</h1>
            <ul>
                {
                    movies && movies.length > 0 ? 
                    movies.map(movie => (
                        <li>
                            <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
                            <h2>{movie.original_title}</h2>
                            <p>{movie.overview}</p>
                        </li>
                    )) : "...Loading"
                }
            </ul>
        </div>
    );
};

export default MovieList;