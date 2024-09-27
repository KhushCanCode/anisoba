import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageSwiper from "./ImageSwiper";

const genres = [
    { id: 'action', heading: 'Action', subHeading: 'High-energy, intense anime with thrilling scenes' },
    { id: 'adventure', heading: 'Adventure', subHeading: 'Epic journeys and exciting expeditions' },
    { id: 'cars', heading: 'Cars', subHeading: 'Speed, engines, and racing adventures' },
    { id: 'comedy', heading: 'Comedy', subHeading: 'Laughs and light-hearted moments' },
    { id: 'dementia', heading: 'Dementia', subHeading: 'Mind-bending and surreal experiences' },
    { id: 'demons', heading: 'Demons', subHeading: 'Battles with supernatural beings' },
    { id: 'drama', heading: 'Drama', subHeading: 'Emotional and gripping stories' },
    { id: 'ecchi', heading: 'Ecchi', subHeading: 'Playful, suggestive content' },
    { id: 'fantasy', heading: 'Fantasy', subHeading: 'Magic, mythical creatures, and otherworldly realms' },
    { id: 'game', heading: 'Game', subHeading: 'Anime centered around games and competitions' },
    { id: 'harem', heading: 'Harem', subHeading: 'One character surrounded by multiple admirers' },
    { id: 'historical', heading: 'Historical', subHeading: 'Stories set in a specific historical period' },
    { id: 'horror', heading: 'Horror', subHeading: 'Terrifying tales and spine-chilling moments' },
    { id: 'isekai', heading: 'Isekai', subHeading: 'Transported to another world' },
    { id: 'josei', heading: 'Josei', subHeading: 'Anime aimed at adult women' },
    { id: 'kids', heading: 'Kids', subHeading: 'Family-friendly, child-focused content' },
    { id: 'magic', heading: 'Magic', subHeading: 'Wizards, spells, and mystical powers' },
    { id: 'martial-arts', heading: 'Martial Arts', subHeading: 'Fights, combat, and discipline' },
    { id: 'mecha', heading: 'Mecha', subHeading: 'Giant robots and mechanical marvels' },
    { id: 'military', heading: 'Military', subHeading: 'War, strategy, and military life' },
    { id: 'music', heading: 'Music', subHeading: 'Tunes, bands, and musical adventures' },
    { id: 'mystery', heading: 'Mystery', subHeading: 'Puzzles, secrets, and thrilling revelations' },
    { id: 'parody', heading: 'Parody', subHeading: 'Humorous takes on popular tropes' },
    { id: 'police', heading: 'Police', subHeading: 'Law enforcement and crime-solving' },
    { id: 'psychological', heading: 'Psychological', subHeading: 'Mind games and deep psychological themes' },
    { id: 'romance', heading: 'Romance', subHeading: 'Love stories and romantic relationships' },
    { id: 'samurai', heading: 'Samurai', subHeading: 'Feudal Japan and honorable warriors' },
    { id: 'school', heading: 'School', subHeading: 'Life in and around the classroom' },
    { id: 'sci-fi', heading: 'Sci-Fi', subHeading: 'Futuristic tech and science fiction worlds' },
    { id: 'seinen', heading: 'Seinen', subHeading: 'Anime for adult men' },
    { id: 'shoujo', heading: 'Shoujo', subHeading: 'Anime for young girls' },
    { id: 'shoujo-ai', heading: 'Shoujo Ai', subHeading: 'Romantic relationships between girls' },
    { id: 'shounen', heading: 'Shounen', subHeading: 'Anime for young boys' },
    { id: 'shounen-ai', heading: 'Shounen Ai', subHeading: 'Romantic relationships between boys' },
    { id: 'slice-of-life', heading: 'Slice of Life', subHeading: 'Everyday experiences and real-life stories' },
    { id: 'space', heading: 'Space', subHeading: 'Adventures in the cosmos and beyond' },
    { id: 'sports', heading: 'Sports', subHeading: 'Competition, teamwork, and athleticism' },
    { id: 'super-power', heading: 'Super Power', subHeading: 'Extraordinary abilities and superhuman feats' },
    { id: 'supernatural', heading: 'Supernatural', subHeading: 'Beyond the natural world, with ghosts and spirits' },
    { id: 'thriller', heading: 'Thriller', subHeading: 'Edge-of-your-seat suspense and tension' },
    { id: 'vampire', heading: 'Vampire', subHeading: 'Bloodsuckers and night dwellers' },
];

function Genres() {

    const { genreId } = useParams();
    const [animeData, setAnimeData] = useState({});
    const [loading, setLoading] = useState({}); 

    const fetchGenresAnimes = async (genreId) => {
        try {
            setLoading(prevState => ({...prevState, [genreId]: true}));

            const resp = await axios.get(`https://vodbackend.vercel.app/anime/genre/${genreId}?page=1`);
            const data = resp.data;

            setAnimeData(prevState => ({...prevState,[genreId]: data.animes || []}));

        } catch (error) {
            console.error(`Error fetching anime data for ${genreId}:`, error);

        } finally {
            setLoading(prevState => ({...prevState,[genreId]: false}));
        }
    };

    // from the genres array we will fetch data for each genre
    useEffect(() => {
        genres.forEach(genre => fetchGenresAnimes(genre.id));
    }, []);

    //When someone clicks on genre on Anime page they will be forwarded to genre page and 
    //on the genre they clicked on
    useEffect(() => {
        if (genreId) {
            const selectedGenreElement = document.getElementById(genreId);
            if (selectedGenreElement) {
                const rect = selectedGenreElement.getBoundingClientRect();
                const offset = rect.top + window.scrollY - (window.innerHeight / 2) + (rect.height / 2);
                
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        }
    }, [genreId]);
    

   

   

    return (
        <>
            <div className="w-full flex justify-center mt-20">
                <h1 className="text-2xl lg:text-4xl font-semibold">Genres</h1>
            </div>
            
            
            {genres.map(genre => (
                <div key={genre.id} id={genre.id} className="my-8">
                    <div className="-mt-4 lg:mt-28"></div>
                   
                        <ImageSwiper
                            animes={animeData[genre.id] || []}
                            heading={genre.heading}
                            subHeading={genre.subHeading}
                            loading={loading[genre.id]}
                        />
                </div>
            ))}
        </>
    );
}

export default Genres;
