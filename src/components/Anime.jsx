import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Anime = () => {

  //We have to get the anime id from the parameter so we can fetch related details.
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const [animeData, setAnimeData] = useState(null);
  const [animeEpisodes, setAnimeEpisodes] = useState([]);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [mostPopularAnimes, setMostPopularAnimes] = useState([]);
  const [relatedAnimes, setrelatedAnimes] = useState([]);
  
  
  //More and less feature for description
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  //Fetching Anime Info like Poster, Name, Description, etc..
  const fetchAnimeData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`https://vodbackend.vercel.app/anime/info?id=${id}`);
      setAnimeData(resp.data);
      setMostPopularAnimes(resp.data.mostPopularAnimes);
      setrelatedAnimes(resp.data.relatedAnimes);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }finally {
      setLoading(false);
    }
  };

  //Fetching Anime Episodes, Streaming links and total number of episodes.
  const fetchAnimeEpisodes = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`https://vodbackend.vercel.app/anime/episodes/${id}`);
      const data = resp.data;
      setAnimeEpisodes(data.episodes);
      setTotalEpisodes(data.totalEpisodes);
    } catch (error) {
      console.error("Error fetching anime episodes:", error);
    }finally {
      setLoading(false);
    }
  };

  //Whenever the id changes Anime Data and Episodes should be fetched.
  useEffect(() => {
    fetchAnimeData();
    fetchAnimeEpisodes();
  }, [id]);

  //When episode is clicked, user will be sent to Streaming page. 
  const episodeClicked = (episodeId) => {
    navigate(`/stream/${encodeURIComponent(episodeId)}`);
  };

  //When anime is clicked, user will be sent to Anime page.
  const animeClicked = (animeId) => {
    navigate(`/anime/${animeId}`);
  };

  //When genre is clicked, user will be sent to Genres page.
  const genreClicked = (genreId) => {
    navigate(`/genres/${genreId}`);
  };

  //When loading is true, a green-dashed loader will appear on screen.
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-green-500"></div>
      </div>
    );
  }

  //from anime data we are taking two objects info and moreInfo.
  const { info, moreInfo } = animeData?.anime || {}

  return (
    
    <div className="container mx-auto mt-16">
      
      {/* Anime Data */}
      <div className="flex flex-col lg:flex-row items-start p-2 bg-slate-900 ">

        <img src={info?.poster} alt={info?.name} className="w-full lg:w-80 rounded" />
        
        <div className="ml-2 lg:ml-10 lg:p-2 mt-2">

          <h1 className="text-2xl flex-wrap lg:text-4xl font-semibold lg:font-bold">{info?.name}</h1>
          <div className="flex text-sm lg:text-base text-gray-500 mt-1 lg:mt-3 gap-1">
            <p className="">{moreInfo?.aired} | </p>
            <p className="">{moreInfo?.status}</p>
          </div>

          <div className="flex items-center mt-2 gap-2">
          <p className="text-md lg:text-xl text-gray-400 ">Rating : <span className="text-green-500">{moreInfo?.malscore}</span></p>
          </div>
          
          <p className="text-base lg:text-lg mt-3 text-gray-400">
          {isExpanded ? info?.description : `${info?.description?.substring(0, 300)}...`}
          </p>
          <button className="text-green-500 hover:underline text-base" onClick={toggleDescription}>
            {isExpanded ? "Less" : "More"}
          </button>
           
            
          <ul className="flex flex-wrap gap-2 mt-4">
          {moreInfo?.genres?.map((genre, index) => (
              <li 
                  key={index} 
                  className="p-2 bg-green-700 cursor-pointer" 
                  onClick={() =>  genreClicked(genre.toLowerCase())}
              >
                  {genre}
              </li>
          ))}
          </ul>

        {
          (info?.stats?.episodes?.sub && info?.stats?.episodes?.dub) ? (
              <p className="text-gray-500 mt-5 lg:text-lg">Sub | Dub</p>
          ) : info?.stats?.episodes?.sub ? (
              <p className="text-gray-500 mt-5 lg:text-lg">Sub</p>
          ) : info?.stats?.episodes?.dub ? (
              <p className="text-gray-500 mt-5 lg:text-lg">Dub</p>
          ) : (
              <p className="text-gray-500 mt-5 lg:text-lg">Not Available</p>
          )
        }
       
                   
      </div>
    </div>
        
      {/* Anime Episodes */}
      <div className="px-3 lg:px-0 py-5 lg:py-10"> 
      <h2 className="text-green-500 text-lg lg:text-xl font-bold">Episodes | Total - {totalEpisodes}</h2>
        <ul className="mt-4">
          {animeEpisodes.map((episode) => (
            <li key={episode.episodeId}
            onClick={() => episodeClicked(episode.episodeId)}
            className="cursor-pointer bg-slate-900 my-2 px-2 py-4 rounded gap-2 lg:w-1/2 flex justify-between items-center"
            >
              <p>Ep-{episode.number} {episode.title}</p>
              <i class="fa-solid fa-caret-right text-green-500 pr-2"></i>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Animes */}
      <div>
        {relatedAnimes && relatedAnimes.length > 0 && (
          <>
            <h2 className="text-green-500 text-lg lg:text-xl px-4 lg:px-0 mt-4 font-bold">
              Related Animes
            </h2>
            <div className="flex flex-col items-center">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-20 p-4 lg:px-0 lg:py-4">
              {relatedAnimes.map((anime) => (
                <li
                  key={anime.id}
                  className="cursor-pointer w-40 md:w-60 lg:w-64 h-90 mb-5"
                  onClick={() => animeClicked(anime.id)}
                >
                  <img
                    src={anime.poster}
                    alt={anime.name}
                    className="rounded h-60 lg:h-80 w-40 lg:w-full hover:opacity-80 transition"
                  />
                  <h2 className="text-base lg:text-lg font-bold ">
                    {anime.name.length > 53
                      ? `${anime.name.slice(0, 50)}...`
                      : anime.name}
                  </h2>

                  
                    {anime.episodes.sub > 0 && anime.episodes.dub > 0 ? (
                      <p className="text-gray-500">Sub | Dub</p>
                    ) : anime.episodes.sub > 0 ? (
                      <p className="text-gray-500">Sub</p>
                    ) : (
                      anime.episodes.dub > 0 && (
                        <p className="text-gray-500">Dub</p>
                      )
                    )}
                </li>
              ))}
            </ul>
            </div>
          </>
        )}
      </div>

          {/* Most Popular Animes */}
      <div>
        {mostPopularAnimes && mostPopularAnimes.length > 0 && (
          <>
            <h2 className="text-green-500 text-lg lg:text-xl px-4 lg:px-4 mt-4 font-bold">
              Most Popular Animes
            </h2>
            <div className="flex flex-col items-center">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-20 p-4 lg:p-4">
              {mostPopularAnimes.map((anime) => (
                <li
                  key={anime.id}
                  className="cursor-pointer w-40 md:w-60 lg:w-64 h-90 mb-5"
                  onClick={() => animeClicked(anime.id)}
                >
                  <img
                    src={anime.poster}
                    alt={anime.name}
                    className="rounded h-60 lg:h-80 w-40 lg:w-full hover:opacity-80 transition"
                  />
                  <h2 className="text-base lg:text-lg font-bold ">
                    {anime.name.length > 53
                      ? `${anime.name.slice(0, 50)}...`
                      : anime.name}
                  </h2>

                  
                    {anime.episodes.sub > 0 && anime.episodes.dub > 0 ? (
                      <p className="text-gray-500">Sub | Dub</p>
                    ) : anime.episodes.sub > 0 ? (
                      <p className="text-gray-500">Sub</p>
                    ) : (
                      anime.episodes.dub > 0 && (
                        <p className="text-gray-500">Dub</p>
                      )
                    )}
                </li>
              ))}
            </ul>
            </div>
          </>
        )}
      </div>


   
    </div>
  );
};

export default Anime;
