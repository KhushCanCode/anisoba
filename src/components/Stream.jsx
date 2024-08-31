import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

function Stream() {
  const { episodeId } = useParams();
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("sub");
  const [captions, setCaptions] = useState([]);
  const playerRef = useRef(null);
  const [played, setPlayed] = useState(0);
  const [animeData, setAnimeData] = useState(null);
  const [animeEpisodes, setAnimeEpisodes] = useState([]);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const navigate = useNavigate();
  const animeId = episodeId.split("?")[0];

  // Fetch Video Data with English Captions Only
  const fetchVideoData = async () => {
    try {
      const response = await axios.get(
        `https://vodbackend.vercel.app/anime/episode-srcs?id=${encodeURIComponent(
          episodeId
        )}&server=hd-1&category=${category}`
      );
      if (response.data.sources && response.data.sources.length > 0) {
        setVideoSrc(response.data.sources[0].url);

        // Filter to get only the English track
        const englishTrack = response.data.tracks?.find(
          (track) => track.label === "english"
        );

        setCaptions(englishTrack ? [englishTrack] : []);
      } else {
        setError("No video source found in the response");
      }
    } catch (error) {
      setError(`Error fetching video data: ${error.message}`);
    }
  };

  // Fetch Anime Info
  const fetchAnimeData = async () => {
    try {
      const resp = await axios.get(
        `https://vodbackend.vercel.app/anime/info?id=${animeId}`
      );
      setAnimeData(resp.data);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  };

  // Fetch Anime Episodes
  const fetchAnimeEpisodes = async () => {
    try {
      const resp = await axios.get(
        `https://vodbackend.vercel.app/anime/episodes/${animeId}`
      );
      const data = resp.data;
      setAnimeEpisodes(data.episodes);
      setTotalEpisodes(data.totalEpisodes);
    } catch (error) {
      console.error("Error fetching anime episodes:", error);
    }
  };

  // Fetch All Data in Parallel
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchAnimeEpisodes(), fetchVideoData(), fetchAnimeData()]);
      setLoading(false);
    };
    fetchAllData();
  }, [episodeId, category]);

  // Navigate to Anime Page
  const animeClicked = useCallback(
    (animeId) => {
      navigate(`/anime/${animeId}`);
    },
    [navigate]
  );

  // Handle Category Change (Sub/Dub)
  const handleCategoryChange = useCallback((event) => {
    if (playerRef.current) {
      setPlayed(playerRef.current.getCurrentTime());
    }
    setCategory(event.target.value);
  }, []);

  // Navigate to Another Episode
  const episodeClicked = useCallback(
    (episodeId) => {
      navigate(`/stream/${encodeURIComponent(episodeId)}`);
    },
    [navigate]
  );

  // Seek to the Last Played Time When Video Source Changes
  useEffect(() => {
    if (playerRef.current && played > 0) {
      playerRef.current.seekTo(played);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSrc]); // Removed 'played' from dependencies to prevent infinite loop

  const currentEpisode = animeEpisodes.find((ep) => ep.episodeId === episodeId);
  const nextEpisode = animeEpisodes.find(
    (ep) => ep.number === (currentEpisode?.number || 0) + 1
  );

  const { info } = animeData?.anime || {};

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 px-4 lg:px-6 mt-16">
      {error && (
        <div className="text-white h-screen flex justify-center items-center gap-3">
          <i className="fa-solid fa-circle-exclamation"></i>
          <p className="text-lg">{error}</p>
        </div>
      )}

      {!loading && !error && videoSrc && (
        <div className="lg:p-4 shadow-lg">
          <ReactPlayer
            ref={playerRef}
            url={videoSrc}
            controls={true}
            playing={false}
            width="100%"
            height="auto"
            className="rounded"
            config={{
              file: {
                attributes: {
                  crossOrigin: "anonymous",
                },
                tracks: captions.map((track) => ({
                  kind: track.kind,
                  src: track.file,
                  srcLang: track.label,
                  default: true,
                })),
              },
            }}
            onProgress={({ playedSeconds }) => setPlayed(playedSeconds)}
          />

          <div className="mb-5">
            <div className="mt-1 lg:mt-4">
              <div className="titleandSub flex justify-between gap-2">
                <h1 className="text-xl lg:text-3xl font-semibold">
                  Episode {currentEpisode?.number} | {currentEpisode?.title}
                </h1>

                <div className="text-sm mt-1">
                  <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="p-1 mt-1 lg:p-2 bg-slate-800 text-white rounded"
                  >
                    <option value="sub">Sub</option>
                    <option value="dub">Dub</option>
                  </select>
                </div>
              </div>

              <button
                className="text-base lg:text-xl text-gray-500 mt-1 border-b border-slate-950 hover:border-green-500 hover:border-b hover:text-green-500"
                onClick={() => animeClicked(animeId)}
              >
                {info?.name}
              </button>

              {info?.stats?.episodes?.sub && info?.stats?.episodes?.dub ? (
                <p className="text-gray-500 text-xs">Sub | Dub</p>
              ) : info?.stats?.episodes?.sub ? (
                <p className="text-gray-500 text-xs">Sub</p>
              ) : info?.stats?.episodes?.dub ? (
                <p className="text-gray-500 text-xs">Dub</p>
              ) : (
                <p className="text-gray-500 text-xs">Not Available</p>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-green-500 text-lg lg:text-xl font-bold">
              Next Episode
            </h2>
            {nextEpisode && (
              <li
                key={nextEpisode.episodeId}
                onClick={() => episodeClicked(nextEpisode.episodeId)}
                className="cursor-pointer bg-slate-900 my-2 px-2 py-4 rounded gap-2 flex justify-between items-center hover:bg-green-700"
              >
                <p>
                  Ep-{nextEpisode.number} {nextEpisode.title}
                </p>
                <i className="fa-solid fa-caret-right text-green-500 pr-2"></i>
              </li>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Stream;
