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
    const [userRar, setUserRAR] = useState([]);
    const [allRar, setAllRAR] = useState([]);
    useEffect(() => {
        let API_KEY = '80ff9aff7ec44bb8644c249abba9fc74';
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
        fetch(url)
            .then(res => res.json())
            .then(json => setMovie(json))
            .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        if (!Cookies.get("userId")) return;
        let url = `http://localhost:9000/rarUser/${Cookies.get("userId")}`;
        fetch(url)
            .then(res => res.json())
            .then(json => setUserRAR(json))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        let url = `http://localhost:9000/rarMovie/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(json => setAllRAR(json.ratingAndReviews))
            .catch(err => console.error(err));
    }, []);

    async function createRAR() {
        if(review === "" || rating === 0 || rating.length > 255) {
            alert("Please fill out all fields and make sure your review is less than 255 characters.")
            return
        }
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

        let response = await fetch(url, fetchOptions)
        let data = await response.json()
        window.location.reload()
    }


    async function adminDeleteRar(id) {
        let url = `http://localhost:9000/rarDelete/${id}`;
        let response = await fetch(url, { method: "DELETE" })
        let data = await response.json()
        window.location.reload()
    }

    console.log(userRar)
    return (
        userRar.ratingAndReviews && movie.genres && movie.production_companies && allRar ?
        <div>
            <NavBar />
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
                {Cookies.get("userId") ? (
                    userRar.ratingAndReviews.some(item => item.movieId === id)? (
                        userRar.ratingAndReviews.map(indivRar => (
                            indivRar.movieId === id ? (
                                <div className="RARBox" key={indivRar.id}>
                                    <h3>Your Review</h3>
                                    <p>{indivRar.movieReview}</p>
                                    <p>Rating: {indivRar.starRating}</p>
                                    <button onClick={() => adminDeleteRar(indivRar.ID)}>Delete</button>
                                </div>
                            ) : null
                        ))
                    ) : (
                        <div>
                            <label className='review-label'>Review:</label>
                            <br />
                            <textarea
                                className="review-input"
                                name="review"
                                rows="4"
                                cols="50"
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Write your review here..."
                            ></textarea>
                            <br />
                            <div className="RatingContainer">
                                <label>Rating:</label>
                                {[0, 1, 2, 3, 4, 5].map((value) => (
                                    <label key={value} className="RatingLabel">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={value}
                                            onChange={(e) => setRating(e.target.value)}
                                        />
                                        {value}
                                    </label>
                                ))}
                            </div>
                            <br />
                            <button onClick={createRAR}>Add Review</button>
                        </div>
                    )
                ) : null}
                <div className="RARContainer">
                    {allRar.length > 0 && 
                        allRar.map(indivRar =>
                            indivRar.movieId === id && indivRar.userId !== Cookies.get('userId') ? (
                                <div className="RARBox">
                                    <h3>Review</h3>
                                    <p>{indivRar.movieReview}</p>
                                    <p>Rating: {indivRar.starRating}</p>
                                    {Cookies.get("isAdmin") === "true" ? 
                                        <button onClick={() => adminDeleteRar(indivRar.ID)}>Delete</button>
                                     : null}
                                </div>
                            ) : null
                        )
                    }
                </div>

                <Link to="/">Back to Movie List</Link>
            </div>
        </div>
        : "Loading..."
    );
};

export default MovieDetails;