import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from './ImageSlider';
import ImageSwiper from "./ImageSwiper";

function Home() {
    const [loading, setLoading] = useState(false); 
    const [trendingAnimes, setTrendingAnimes] = useState([]);
    const [latestEpisodeAnimes, setLatestEpisodeAnimes] = useState([]);

    const fetchAnimes = async () => {
        try {
            setLoading(true);
            const resp = await axios.get(`https://vodbackend.vercel.app/anime/home`);
            const data = resp.data;
            setTrendingAnimes(data.trendingAnimes);
            setLatestEpisodeAnimes(data.latestEpisodeAnimes);
            
        } catch (error) {
            console.error("Error fetching anime data:", error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimes();
    }, []);

    return (
        <>
            <Slider />
            <div className="absolute inset-x-0 hidden lg:block lg:-bottom-20 h-1/5 bg-gradient-to-b from-transparent via-slate-950 to-slate-950 z-10"></div>
            <ImageSwiper animes={trendingAnimes} heading="Trending Animes" subHeading="Keep up with the buzz and join the conversation." loading={loading} />
            <div className="lg:mb-28"></div>
            <ImageSwiper animes={latestEpisodeAnimes} heading="Latest Episodes" subHeading="Newest Episodes of your favourite animes!" loading={loading} />
        </>
    );
}

export default Home;
