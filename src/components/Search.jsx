import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from 'lodash.debounce';

const Search = () => {

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostPopularAnimes, setMostPopularAnimes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const fetchAnimeData = debounce(async (value) => {
    try {
        if (value.trim() !== "") {
          const resp = await axios.get(
            `https://vodbackend.vercel.app/anime/search?q=${value}`
          );
          const data = resp.data;

          setAnimes(data.animes);
          setMostPopularAnimes(data.mostPopularAnimes);
        } else {
          setAnimes([]);
          setMostPopularAnimes([]);
        }
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
    finally{
      setLoading(false);
    }
  }, 300); 


  useEffect(() => {
    fetchAnimeData(searchValue);
  }, [searchValue]);

  const animeClicked = (animeId) => {
    navigate(`/anime/${animeId}`);
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-green-500"></div>
      </div>
    );
  }
  return (
    <div className="mt-5 flex justify-center items-center flex-col">
      {/* Search Input */}
      <div className="flex justify-center items-center h-fit w-11/12 lg:w-1/2 relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="What are you Looking For? "
          className="p-3 h-fit w-11/12 bg-slate-950 border-b-2 border-green-500 text-xl lg:text-2xl outline-none text-gray-300"
        />
        <i className="fa-solid fa-magnifying-glass w-1/12 absolute right-6"></i>
      </div>

      {/* Search Results */}
      <div className="mt-5">
        {searchValue && (
          <>
           <h2 className="text-green-500 text-lg lg:text-xl px-4 lg:px-4 mt-4 font-bold">
              Top Results
            </h2>
            <div className="flex flex-col items-center">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-20 p-4 lg:p-4">
              {animes?.map((anime) => (
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
                      ? `${anime.name.substring(0, 50)}...`
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
                      ? `${anime.name.substring(0, 50)}...`
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

export default Search;
