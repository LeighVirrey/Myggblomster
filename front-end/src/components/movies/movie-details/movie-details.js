import React from 'react';
import { useParams } from 'react-router-dom';

// heres the keys and stuff
//api read access
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGZmOWFmZjdlYzQ0YmI4NjQ0YzI0OWFiYmE5ZmM3NCIsIm5iZiI6MTczNzk5NTQwOC40NTEsInN1YiI6IjY3OTdiNDkwMGUxZTA0ODZkNjJiNDc2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCu2m8iw8_11DaUtIG4zkMZ9o02KHgTDpt1xYXr-Y0I
//api key
//80ff9aff7ec44bb8644c249abba9fc74

const MovieDetails = ({ movies }) => {
    const { id } = useParams();
    //idk get it, haven't seen the api yet

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div>

        </div>
    );
};

export default MovieDetails;