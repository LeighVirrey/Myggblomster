import React, { use } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import NavBar from '../../navbar/navbar';

// heres the keys and stuff
//api read access
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGZmOWFmZjdlYzQ0YmI4NjQ0YzI0OWFiYmE5ZmM3NCIsIm5iZiI6MTczNzk5NTQwOC40NTEsInN1YiI6IjY3OTdiNDkwMGUxZTA0ODZkNjJiNDc2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCu2m8iw8_11DaUtIG4zkMZ9o02KHgTDpt1xYXr-Y0I
//api key
//80ff9aff7ec44bb8644c249abba9fc74

const MovieDetails = () => {
    const [movie, setMovie] = useState({});
    const { id } = useParams();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [rar, setRAR] = useState({});
    useEffect(() => {
        let API_KEY = '80ff9aff7ec44bb8644c249abba9fc74';
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
        fetch(url)
            .then(res => res.json())
            .then(json => setMovie(json))
            .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        let url = `http://localhost:9000/rar/${Cookies.get("userId")}`;
        fetch(url)
            .then(res => res.json())
            .then(json => setRAR(json))
            .catch(err => console.error(err));
    }, []);

    function createRAR() {
        let url = "http://localhost:9000/rarCreate";
        let theBody = {
            movieId: id,
            userId: Cookies.get("userId"),
            rating: rating,
            review: review,
        };

        let fetchOptions = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Credentials": "true",
            },
            body: JSON.stringify(theBody),
        };

        fetch(url, fetchOptions)
            .then((r) => r.json())
            .then((data) => {
                console.log("DATA RES: ", data);
                // Instead of reloading, update the state
                setRAR([...rar, data]); // Assuming `data` is the new review
            })
            .catch((err) => console.error("Error:", err));
    }


    return (
        <div>
            <div className='nav'><NavBar /></div>
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
                {
                    Cookies.get("userId") ?
                        rar && rar.length > 0 ?
                            rar.map(rar => (
                                rar.movieId == id ?
                                    <div class="RARBox">
                                        <h3>Your Review</h3>
                                        <p>{rar.review}</p>
                                        <p>Rating: {rar.rating}</p>
                                    </div> : ""
                            )) :
                            <div>
                                <label>Review:</label>
                                <input type="text" name="review" onChange={(e) => { setReview(e.target.value) }} />
                                <br />
                                <label>Rating:</label>
                                <input type="radio" name="rating" value="0" onChange={(e) => { setRating(e.target.value) }} />
                                <input type="radio" name="rating" value="1" onChange={(e) => { setRating(e.target.value) }} />
                                <input type="radio" name="rating" value="2" onChange={(e) => { setRating(e.target.value) }} />
                                <input type="radio" name="rating" value="3" onChange={(e) => { setRating(e.target.value) }} />
                                <input type="radio" name="rating" value="4" onChange={(e) => { setRating(e.target.value) }} />
                                <input type="radio" name="rating" value="5" onChange={(e) => { setRating(e.target.value) }} />
                                <br />
                                <button onClick={createRAR}>Add Review</button>
                            </div> : ""
                }

                <Link to="/">Back to Movie List</Link>
            </div>
        </div>
    );
};

export default MovieDetails;