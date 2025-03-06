import { useEffect } from "react";
import React from "react";
import {Link, useParams} from "react-router-dom";

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

    return (
        <div>
            <h1>{actor.name}</h1>
            <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
            <p>{actor.biography}</p>

            {
                movies ? (
                    <>
                    <h2>Known For</h2>
                    <ul>
                        {movies.map(movie => (
                            <li key={movie.id}>
                                <Link to={`/movies/${movie.id}/movie`}>
                                    <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
                                    <h3>{movie.title}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
                ) : 
                <p>No movies found</p>
            }
            </div>
    );
}

export default ActorMovies;