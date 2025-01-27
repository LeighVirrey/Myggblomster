import React, { useEffect, useState } from 'react';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('urlhere');
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
    }, []);

    return (
        <div>
            <h1>Movie List</h1>
            <ul>
                {movies.map(movie => (
                    <li>
                        <p>RAH</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;