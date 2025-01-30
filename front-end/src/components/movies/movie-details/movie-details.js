import React, { use } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// heres the keys and stuff
//api read access
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGZmOWFmZjdlYzQ0YmI4NjQ0YzI0OWFiYmE5ZmM3NCIsIm5iZiI6MTczNzk5NTQwOC40NTEsInN1YiI6IjY3OTdiNDkwMGUxZTA0ODZkNjJiNDc2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCu2m8iw8_11DaUtIG4zkMZ9o02KHgTDpt1xYXr-Y0I
//api key
//80ff9aff7ec44bb8644c249abba9fc74

const MovieDetails = () => {
    const [movie, setMovie] = useState({});
    const { id } = useParams();
    useEffect(() => {
        let API_KEY = '80ff9aff7ec44bb8644c249abba9fc74';
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
        fetch(url)
          .then(res => res.json())
          .then(json => setMovie(json))
          .catch(err => console.error(err));
    }, []);

    return (
        <div class="DetailBox">
            <div class="TopDetails">
            <h2>Movie Details</h2>
            <h1>{movie.original_title}</h1>
            <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
            {
                movie.tagline ? <h3 class="MovieTagline">{movie.tagline}</h3> : ""
            }
            </div>
            <div class="GenreBox">
                <h3>Genres</h3>
                <ul>
                    {
                        movie.genres && movie.genres.length > 0 ?
                        movie.genres.map(genre => (
                            <li>{genre.name}</li>
                        )) : "...Loading"
                    }
                </ul>
            </div>
            <div class="ProductionBox">
                <h3>Production Companies</h3>
                <ul>
                    {
                        movie.production_companies && movie.production_companies.length > 0 ?
                        movie.production_companies.map(company => (
                            <li>
                                <img src={`https://image.tmdb.org/t/p/w185/${company.logo_path}`} class="CompanyLogo" alt={company.name} />
                                {company.name}
                            </li>
                        )) : "...Loading"
                    }
                </ul>
            </div>

            <Link to="/movies">Back to Movie List</Link>
        </div>
    );
};

export default MovieDetails;