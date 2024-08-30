import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

function Stream() {
  const { episodeId } = useParams();
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('sub');
  const [captions, setCaptions] = useState([]);
  const [selectedCaption, setSelectedCaption] = useState(null);
  const playerRef = useRef(null);
  const [played, setPlayed] = useState(0);

  const fetchVideoData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://vodbackend.vercel.app/anime/episode-srcs?id=${encodeURIComponent(episodeId)}&server=hd-1&category=${category}`
      );
      if (response.data.sources && response.data.sources.length > 0) {
        setVideoSrc(response.data.sources[0].url);
        setCaptions(response.data.tracks || []);
        setSelectedCaption(response.data.tracks?.find(track => track.default)?.file || null); // Set default caption
      } else {
        setError('No video source found in the response');
      }
    } catch (error) {
      setError(`Error fetching video data: ${error.message}`);
      
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [episodeId, category]);

  const handleCategoryChange = (event) => {
    if (playerRef.current) {
      setPlayed(playerRef.current.getCurrentTime());
    }
    setCategory(event.target.value);
  };

  const handleCaptionChange = (event) => {
    if (playerRef.current) {
      setPlayed(playerRef.current.getCurrentTime());
    }
    setSelectedCaption(event.target.value);
  };

  useEffect(() => {
    if (playerRef.current && played > 0) {
      playerRef.current.seekTo(played);
    }
  }, [videoSrc]);


  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 px-4 lg:px-6">
      {error && 
        <div className='text-white h-screen flex justify-center items-center gap-3'>
          <i className="fa-solid fa-circle-exclamation"></i>
          <p className='text-lg'>{error}</p>
        </div>
      }

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
                tracks: [
                  { kind: "subtitles", src: "https://www.w3schools.com/html/mov_bbb_subtitles.vtt", srcLang: "en", default: true }
                ]
              }
            }}
            onProgress={({ playedSeconds }) => setPlayed(playedSeconds)}
          />


        {/*Category Option*/}
          <div className="flex justify-between mt-4">
            <select 
              value={category} 
              onChange={handleCategoryChange}
              className="px-2 py-2 bg-slate-800 text-white rounded"
            >
              <option value="sub">Sub</option>
              <option value="dub">Dub</option>
            </select>

            {/*Captions Option*/}
            {captions.length > 0 && (
              <select 
                value={selectedCaption}
                onChange={handleCaptionChange}
                className="px-2 py-2 bg-slate-800 text-white rounded"
              >
                {captions.map((track, index) => (
                  <option key={index} value={track.file}>
                    {track.label || `Track ${index + 1}`}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Download Button */}
          {videoSrc && (
            <div className="mt-4">
              <a 
                href={videoSrc} 
                download="video.mp4" 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Download Video
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Stream;
