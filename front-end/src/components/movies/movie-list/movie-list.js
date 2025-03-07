import React, { useEffect, useState } from 'react';
import NavBar from '../../navbar/navbar';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const API_KEY = '80ff9aff7ec44bb8644c249abba9fc74';

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);

    const fetchMovies = async (query = "") => {
        let genreQuery = selectedGenres.length ? `&with_genres=${selectedGenres.join(',')}` : "";
        let url = query
            ? `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
            : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc${genreQuery}`;

        try {
            setLoading(true);
            const res = await fetch(url);
            const data = await res.json();

            if (query) {
                setSearchResults(data.results.filter(item => item.media_type !== "tv") || []);
            } else {
                setMovies(data.results || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(searchQuery);
    }, [selectedGenres]);

    const fetchGenres = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
            const data = await res.json();
            setGenres(data.genres || []);
        } catch (err) {
            console.error("Error fetching genres:", err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMovies(searchQuery);
    };

    const handleGenreChange = (genreId) => {
        setSelectedGenres(prev =>
            prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
        );
    };

    const redirectDetails = (id, type) => {
        window.location.href = `/movies/${id}/${type}`;
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
                            placeholder="Search for a movie or actor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>

                <div className="movie-genre-container">
                    <div className="genre-filter">
                        <h3>Filter by Genre</h3>
                        {genres.map((genre) => (
                            <label key={genre.id} className="genre-checkbox">
                                <input
                                    type="checkbox"
                                    value={genre.id}
                                    checked={selectedGenres.includes(genre.id)}
                                    onChange={() => handleGenreChange(genre.id)}
                                />
                                {genre.name}
                            </label>
                        ))}
                    </div>

                    <div className="movie-list-container">
                        <ul className="movie-list">
                            {loading ? (
                                <p>Loading...</p>
                            ) : searchQuery ? (
                                searchResults.length > 0 ? (
                                    searchResults.map(item => (
                                        <li key={item.id} className="movie-item" onClick={() => redirectDetails(item.id, item.media_type)}>
                                            <img
                                                src={item.profile_path ? `https://image.tmdb.org/t/p/w185/${item.profile_path}` : item.poster_path ? `https://image.tmdb.org/t/p/w185/${item.poster_path}` : 'https://via.placeholder.com/185'}
                                                alt={item.title || item.name}
                                                className="movie-poster"
                                            />
                                            <div className="movie-info">
                                                <h2 className="movie-title">{item.title || item.name}</h2>
                                                <p className="movie-overview">{item.overview}</p>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p>No results found...</p>
                                )
                            ) : (
                                movies.length > 0 ? (
                                    movies.map(movie => (
                                        <li key={movie.id} className="movie-item" onClick={() => redirectDetails(movie.id, "movie")}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                                                alt={movie.title}
                                                className="movie-poster"
                                            />
                                            <div className="movie-info">
                                                <h2 className="movie-title">{movie.title}</h2>
                                                <p className="movie-overview">{movie.overview}</p>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p>No movies found...</p>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieList;
