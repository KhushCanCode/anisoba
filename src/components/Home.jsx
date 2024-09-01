import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from './ImageSlider';
import ImageSwiper from "./ImageSwiper";
import demonslayer from '../assets/demonslayer.jpg'
import { useNavigate } from "react-router-dom";

function Home() {
    const [loading, setLoading] = useState(false); 
    const [trendingAnimes, setTrendingAnimes] = useState([]);
    const [latestEpisodeAnimes, setLatestEpisodeAnimes] = useState([]);
    const [animeData, setAnimeData] = useState({});
    const navigate = useNavigate();
    const categories = [
        
        { id:'subbed-anime' , heading: 'Subbed Anime', subHeading: "Subtitles animes for Japanese lovers "},
        { id:'dubbed-anime' , heading: 'Dubbed Anime', subHeading: "Dubbed ones for Dub lovers"},
       
    ];

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

    const fetchCategoryAnimes = async (categoryId) => {
        try {
            setLoading(prevState => ({...prevState,[categoryId]: true}));

            const resp = await axios.get(`https://vodbackend.vercel.app/anime/${categoryId}?page=1`);
            const data = resp.data;

            setAnimeData(prevState => ({...prevState,[categoryId]: data.animes || []}));

        } catch (error) {
            console.error(`Error fetching anime data for ${categoryId}:`, error);

        }finally{
            setLoading(prevState => ({...prevState,[categoryId]: false}));
        }
    };
    useEffect(() => {
        fetchAnimes();
        categories.forEach(category => fetchCategoryAnimes(category.id));
    }, []);

    const animeClicked = (animeId) => {
        navigate(`/anime/${animeId}`);
    };
    return (
        <div className="bg-slate-950">
            
            <Slider />
            <div className="absolute inset-x-0 hidden  lg:block lg:-bottom-16 h-1/5 bg-gradient-to-b from-transparent via-slate-950 to-slate-950 z-10"></div>
            <div className="lg:mb-20"></div>
            <ImageSwiper animes={trendingAnimes} heading="Trending Animes" subHeading="Keep up with the buzz and join the conversation." loading={loading} />
            <div className="lg:mb-28"></div>
            <ImageSwiper animes={latestEpisodeAnimes} heading="Latest Episodes" subHeading="Newest Episodes of your favourite animes!" loading={loading} />

            <div className="lg:h-96  mt-12 w-full lg:flex lg:px-16 gap-5 lg:mb-3">
                <img src={demonslayer} alt="demonslayer" className="h-full  object-contain rounded" />
                <div className="px-6">
                <h2 className="mt-2 text-xl lg:text-3xl font-semibold">Demon Slayer : Kimetsu No Yaiba</h2>
                <p className="text-gray-500 lg:text-lg lg:mt-2">Sub | Dub</p>
                <p className="text-gray-400 hidden md:block lg:block">Ever since the death of his father, the burden of supporting the family has fallen upon Tanjirou Kamado's shoulders. Though living impoverished on a remote mountain, the Kamado family are able to enjoy a relatively peaceful and happy life. One day, Tanjirou decides to go down to the local village to make a little money selling charcoal. On his way back, night falls, forcing Tanjirou to take shelter in the house of a strange man, who warns him of the existence of flesh-eating demons that lurk in the woods at night...</p>
                <div className="lg:flex gap-2 hidden md:flex  mt-1 lg:mt-4">
                <p className="p-1 lg:p-2 bg-gray-700">Shounen</p>
                <p className="p-1 lg:p-2 bg-gray-700">Demon</p>
                <p className="p-1 lg:p-2 bg-gray-700">Supernatural</p>
                <p className="p-1 lg:p-2 bg-gray-700">Action</p>
                </div>
                <div className="w-full">
                <button className="bg-green-500 p-2 mt-4 w-full md:w-1/3 lg:w-1/2 text-slate-950 font-semibold rounded hover:bg-green-300"
               onClick={() => animeClicked("demon-slayer-kimetsu-no-yaiba-47")}>Watch Now</button>
                </div>
               
               
                </div>
               
            </div>
            <div className=" lg:mb-24"></div>
            {categories.map(category => (
                <div key={category.id}>
                    <div className="-mt-4 lg:mt-28"></div>
                    <ImageSwiper
                        animes={animeData[category.id] || []}
                        heading={category.heading}
                        subHeading={category.subHeading}
                        loading={loading[category.id]}
                    />
                </div>
            ))}
        </div>
    );
}

export default Home;
