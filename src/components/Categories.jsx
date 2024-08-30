import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageSwiper from "./ImageSwiper";

const categories = [
    { id: 'tv', heading: 'TV', subHeading: 'Most popular on TV' },
    { id: 'most-favorite', heading: 'Most Favorite', subHeading: 'Fan favorites' },
    { id: 'most-popular', heading: 'Most Popular', subHeading: 'You have heard about these ones before' },
    { id:'subbed-anime' , heading: 'Subbed Anime', subHeading: "Subtitles animes for Japanese lovers "},
    { id:'dubbed-anime' , heading: 'Dubbed Anime', subHeading: "Dubbed ones for Dub lovers"},
    { id:'top-upcoming' , heading: 'Top Upcoming', subHeading: "Keep an eye out for these!"},
    { id:'movie' , heading: 'Movie', subHeading: "Movies are underrated."},
    { id:'special' , heading: 'Special', subHeading: "Special something for special you"},
    { id:'completed' , heading: 'Completed', subHeading: "Don't have to wait a week for an episode"},
    { id:'ova' , heading: 'OVA', subHeading: "Original Video Animation"},
    { id:'ona' , heading: 'ONA', subHeading: "Original Net Animation"},
];

function Categories() {

    const [animeData, setAnimeData] = useState({});
    const [loading, setLoading] = useState({}); 

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

    //from the category array we will fetch data for each category
    useEffect(() => {
        categories.forEach(category => fetchCategoryAnimes(category.id));
    }, []);

    return (
        <>
            <div className="w-full flex justify-center mt-5 lg:mt-12">
                <h1 className="text-4xl font-semibold">Categories</h1>
            </div>
            
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
        </>
    );
}

export default Categories;
