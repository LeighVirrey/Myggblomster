import React, { useEffect, useState } from 'react';
import NavBar from '../../navbar/navbar';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const API_KEY = '80ff9aff7ec44bb8644c249abba9fc74';

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async (query = "") => {
        let url = query
            ? `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
            : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

        try {
            setLoading(true);
            const res = await fetch(url);
            const data = await res.json();
            document.body.style.backgroundImage = `./public/images/theaterbackground.avif`;

            // Handle search results based on query
            if (query) {
                setSearchResults(data.results || []);
            } else {
                setMovies(data.results || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMovies(searchQuery);
    };

    const redirectDetails = (id, type) => {
        window.location.href = `/movies/${id}/${type}`;
    };

    const renderSearchResults = (results) => {
        return results.map(item => (
            <li key={item.id} className="movie-item" onClick={() => redirectDetails(item.id, item.media_type)}>
                {item.media_type === "movie" ? (
                    <div className="movie-info">
                        <img
                            src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
                            alt={item.title || item.name}
                            className="movie-poster"
                        />
                        <h2 className="movie-title">{item.title || item.name}</h2>
                        <p className="movie-overview">{item.overview}</p>
                    </div>
                ) : item.media_type === "person" ? (
                    <div className="actor-info">
                        <img
                            src={`https://image.tmdb.org/t/p/w185/${item.profile_path}`}
                            alt={item.name}
                            className="actor-image"
                        />
                        <h2 className='movie-title'>{item.name}</h2>
                        <p>{item.known_for_department}</p>
                        <button onClick={() => redirectDetails(item.id, 'person')}>View Movies</button>
                    </div>
                ) : item.media_type === "tv" ? (
                    <div className="tv-show-info">
                        <h2>{item.name}</h2>
                        <p>{item.overview}</p>
                    </div>
                ) : null}
            </li>
        ));
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
                            placeholder="Search for a movie, actor, or director..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>

                <h2 className="search-results-title">Search Results</h2>
                <ul className="movie-list">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        searchQuery ? (
                            renderSearchResults(searchResults)
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
                                            <h2 className="movie-title">{movie.original_title}</h2>
                                            <p className="movie-overview">{movie.overview}</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>No movies found...</p>
                            )
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MovieList;
