import React, { useEffect, useState } from 'react';
import NavBar from '../../navbar/navbar';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const API_KEY = '80ff9aff7ec44bb8644c249abba9fc74';

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async (query = "") => {
        let url = query
            ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
            : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            document.body.style.backgroundImage = `./public/images/theaterbackground.avif`;
            setMovies(data.results || []);

        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMovies(searchQuery);
    };

    const redirectDetails = (id) => {
        window.location.href = `/movies/${id}`;
    };

    return (
        <div>
            <NavBar />



            <div className="movie-container">
                <h1 className="title bungee-shade-regular">Movies</h1>
                <div className="search-container">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search for a movie..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>
                <ul className="movie-list">
                    {movies.length > 0 ? (
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
                        <p className="loading">No movies found...</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MovieList;
