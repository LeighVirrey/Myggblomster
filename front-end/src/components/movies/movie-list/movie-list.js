import React, { useEffect, useState } from 'react';

// heres the keys and stuff
//api read access
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGZmOWFmZjdlYzQ0YmI4NjQ0YzI0OWFiYmE5ZmM3NCIsIm5iZiI6MTczNzk5NTQwOC40NTEsInN1YiI6IjY3OTdiNDkwMGUxZTA0ODZkNjJiNDc2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCu2m8iw8_11DaUtIG4zkMZ9o02KHgTDpt1xYXr-Y0I
//api key
//80ff9aff7ec44bb8644c249abba9fc74

//remember this: https://developer.themoviedb.org/reference/genre-movie-list

//here's this one https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc

//arranging the fetch
// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGZmOWFmZjdlYzQ0YmI4NjQ0YzI0OWFiYmE5ZmM3NCIsIm5iZiI6MTczNzk5NTQwOC40NTEsInN1YiI6IjY3OTdiNDkwMGUxZTA0ODZkNjJiNDc2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCu2m8iw8_11DaUtIG4zkMZ9o02KHgTDpt1xYXr-Y0I'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
  
const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('urlhere');
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
    }, []);

    return (
        <div>
            <h1>Movie List</h1>
            <ul>
                {movies.map(movie => (
                    <li>
                        <p>RAH</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;