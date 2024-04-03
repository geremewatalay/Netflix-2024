import React, { useEffect, useState } from 'react';
import axios from "../../utils/axios";
import requests from '../../utils/requests';
import "./banner.css";

const Banner = () => {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                const randomIndex = Math.floor(Math.random() * request.data.results.length);
                setMovie(request.data.results[randomIndex]);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchMovie();

    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button play" onClick={() => handlePlayClick(movie)}>Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner__fadeBottom" />
        </div>
    );
};

const handlePlayClick = (movie) => {
    // Implement your play functionality here, for example, redirect to a video player page.
};

export default Banner;
