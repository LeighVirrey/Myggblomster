import { useEffect } from "react";
import React from "react";
import {Link, useParams} from "react-router-dom";
import NavBar from "../../navbar/navbar";

const ActorMovies = () => {
    let API_KEY = '80ff9aff7ec44bb8644c249abba9fc74'
    const {id} = useParams();
    const [actor, setActor] = React.useState({});
    const [movies, setMovies] = React.useState([]);

    useEffect(() => {
        let url = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`
        fetch(url)
            .then(res => res.json())
            .then(json => {
                setActor(json);
            })
            .catch(err => console.error(err));
    }, [id])

    useEffect(() => {
        let url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`
        fetch(url)
            .then(res => res.json())
            .then(json => {
                setMovies(json.cast);
            })
            .catch(err => console.error(err));
    }, [id])

    const redirectDetails = (id, type) => {
        window.location.href = `/movies/${id}/${type}`;
    };

    return (
        <div>
    <NavBar />
    <div className="actor-profile">
        <h1 className="actor-name">{actor.name}</h1>
        <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
        <p className="bio">{actor.biography}</p>

        {movies && movies.length > 0 ? (
            <>
                <h2 className="search-results-title">Known For</h2>
                <ul className="movie-list">
                    {movies.map(movie => (
                        <li 
                            key={movie.id} 
                            className="movie-item" 
                            onClick={() => redirectDetails(movie.id, "movie")}
                        >
                            <img 
                                src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} 
                                alt={movie.title} 
                                className="movie-poster" 
                            />
                            <div className="movie-info">
                                <h2 className="movie-title">{movie.title}</h2>
                            </div>
                        </li>
                    ))}
                </ul>
            </>
        ) : (
            <p>No movies found...</p>
        )}
    </div>
</div>

    );
}

export default ActorMovies;

