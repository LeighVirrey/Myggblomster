import React, { useEffect, useState } from 'react';
import NavBar from '../../navbar/navbar';


const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const API_KEY = '80ff9aff7ec44bb8644c249abba9fc74';
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

        fetch(url)
            .then(res => res.json())
            .then(json => setMovies(json.results))
            .catch(err => console.error(err));
    }, []);

    function redirectDetails(id) {
        window.location.href = `/movies/${id}`;
    }

    return (
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap" rel="stylesheet"></link>
            <NavBar />

            <div className="movie-container">

                <h1 className="title bungee-shade-regular">Popular Movies</h1>
                <ul className="movie-list">
                    {movies && movies.length > 0 ? (
                        movies.map(movie => (
                            <li key={movie.id} className="movie-item" onClick={() => redirectDetails(movie.id)}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                                <div className="movie-info">
                                    <h2 className="movie-title">{movie.original_title}</h2>
                                    <p className="movie-overview">{movie.overview}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="loading">...Loading</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MovieList;
