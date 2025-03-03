import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaStar } from 'react-icons/fa';
import NavBar from '../../navbar/navbar';

const MovieDetails = () => {
    const [movie, setMovie] = useState({});
    const { id } = useParams();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [userRar, setUserRAR] = useState({ ratingAndReviews: [] });
    const [allRar, setAllRAR] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let API_KEY = '80ff9aff7ec44bb8644c249abba9fc74';
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

        fetch(url)
            .then(res => res.json())
            .then(json => {
                setMovie(json);
                document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${json.backdrop_path})`;
            })
            .catch(err => console.error(err));

        return () => {
            document.body.style.backgroundImage = "";
        };
    }, [id]);

    useEffect(() => {
        if (!Cookies.get("userId")) return;
        let url = `http://localhost:9000/rarUser/${Cookies.get("userId")}`;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                setUserRAR(json || { ratingAndReviews: [] });
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        let url = `http://localhost:9000/rarMovie/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                setAllRAR(json.ratingAndReviews || []);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    async function createRAR() {
        if (review === "" || rating === 0 || review.length > 255) {
            alert("Please fill out all fields and make sure your review is less than 255 characters.");
            return;
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

        await fetch(url, fetchOptions);
        window.location.reload();
    }

    async function adminDeleteRar(reviewId) {
        let url = `http://localhost:9000/rarDelete/${reviewId}`;
        await fetch(url, { method: "DELETE" });
        window.location.reload();
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        movie.genres && movie.production_companies && allRar ? (
            <div>
                <NavBar />
                <div className="DetailBox">
                    <div className="TopDetails">
                        <h2>Movie Details</h2>
                        <h1>{movie.original_title}</h1>
                        <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
                        <p>{movie.overview}</p>
                        {movie.tagline && <h3 className="MovieTagline">{movie.tagline}</h3>}
                    </div>

                    <div className="GenreBox">
                        <h3>Genres</h3>
                        <ul>
                            {movie.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
                        </ul>
                    </div>

                    <div className="ProductionBox">
                        <h3>Production Companies</h3>
                        <ul>
                            {movie.production_companies.map(company => (
                                <li key={company.id}>
                                    <img src={`https://image.tmdb.org/t/p/w185/${company.logo_path}`} className="CompanyLogo" alt={company.name} />
                                    {company.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {Cookies.get("userId") ? (
                        userRar?.ratingAndReviews?.some(item => item.movieId === id) ? (
                            userRar.ratingAndReviews.map(indivRar => (
                                indivRar.movieId === id && (
                                    <div className="RARBox" key={indivRar.id}>
                                        <h3>Your Review</h3>
                                        <p>{indivRar.movieReview}</p>
                                        <p>
                                            {Array.from({ length: indivRar.starRating }, (_, index) => (
                                                <FaStar key={index} color="gold" />
                                            ))}
                                        </p>
                                        <button onClick={() => adminDeleteRar(indivRar.id)}>Delete</button>
                                    </div>
                                )
                            ))
                        ) : (
                            <div className="ReviewInputContainer">
                                <label className='review-label'>Review:</label>
                                <textarea
                                    className="review-input"
                                    rows="4"
                                    cols="50"
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Write your review here..."
                                ></textarea>

                                <div className="RatingContainer">
                                    <label>Rating:</label>
                                    {[1, 2, 3, 4, 5].map(value => (
                                        <FaStar
                                            key={value}
                                            size={30}
                                            color={value <= rating ? "gold" : "gray"}
                                            onClick={() => setRating(value)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    ))}
                                </div>
                                <button onClick={createRAR}>Add Review</button>
                            </div>
                        )
                    ) : null}

                    <div className="RARContainer">
                        {allRar.length > 0 &&
                            allRar.map(indivRar =>
                                indivRar.movieId === id && indivRar.userId !== Cookies.get('userId') ? (
                                    <div className="RARBox" key={indivRar.id}>
                                        <h3>Review</h3>
                                        <p>{indivRar.movieReview}</p>
                                        <p>
                                            {Array.from({ length: indivRar.starRating }, (_, index) => (
                                                <FaStar key={index} color="gold" />
                                            ))}
                                        </p>
                                        {Cookies.get("isAdmin") === "true" && (
                                            <button onClick={() => adminDeleteRar(indivRar.id)}>Delete</button>
                                        )}
                                    </div>
                                ) : null
                            )
                        }
                    </div>

                    <Link className='backtomovielist' to="/">Back to Movie List</Link>
                </div>
            </div>
        ) : "Loading..."
    );
};

export default MovieDetails;
