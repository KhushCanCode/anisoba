import React from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import img1 from '../assets/chainsawman.jpg'
import img2 from '../assets/jujutsu.webp'
import img3 from '../assets/blackclover.jpg'
import img4 from '../assets/mha.jpg'
import img5 from '../assets/caseclosed.webp'


function Slider() {
    const animeList = [
        {id: "chainsaw-man-17406",
         name: "Chainsaw Man", 
         poster: img1,
         description: "Denji is a young boy who works as a Devil Hunter with the “Chainsaw Devil” Pochita. One day, as he was living his miserable life trying to pay off the debt he inherited from his parents, he got betrayed and killed. As he was losing his...", 
         episodes: {
                    "sub": 12,
                    "dub": 12
                },
        
        },
        {id: "jujutsu-kaisen-tv-534",
            name: "Jujutsu Kaisen (TV)", 
            poster: img2,
            description: "Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes...", 
            episodes: {
                       "sub": 24,
                       "dub": 24
                   },
           
           },
           {id: "black-clover-2404",
            name: "Black Clover", 
            poster: img3,
            description: "Asta and Yuno were abandoned at the same church on the same day. Raised together as children, they came to know of the \"Wizard King\"—a title given to the strongest mage in the kingdom—and promised that they would compete against each...", 
            episodes: {
                       "sub": 170,
                       "dub": 170
                   },
           
           },
           {id: "my-hero-academia-322",
            name: "My Hero Academia", 
            poster: img4,
            description: "The appearance of quirks, newly discovered super powers, has been steadily increasing over the years, with 80 percent of humanity possessing various abilities from manipulation of elements to shapeshifting. This leaves the remainder ...", 
            episodes: {
                       "sub": 13,
                       "dub": 13
                   },
           
           },
           {id: "case-closed-323",
            name: "Case Closed", 
            poster: img5,
            description: "Shinichi Kudou, a high school student of astounding talent in detective work, is well known for having solved several challenging cases. One day, when Shinichi spots two suspicious men and decides to follow them, he inadvertently becomes...", 
            episodes: {
                       "sub": 1133,
                       "dub": 123
                   },
           
           }
    ]

    const navigate = useNavigate();
    const animeClicked = (animeId) => {
      navigate(`/anime/${animeId}`);
    };


  return (
    <>
  <div className="slide w-full ">
  <Carousel autoPlay={true} infiniteLoop={true} interval={3000} showThumbs={false} showStatus={false}>

    {animeList.map((anime) => (
        
      <div key={anime.id} className="relative w-full h-full">

        <div className="absolute flex items-end md:items-center  lg:items-center justify-center z-20 w-full md:w-2/5 lg:w-2/5 h-full ">
        
        <div className=" md:ml-20 lg:ml-20 text-left flex flex-col justify-center items-center md:block lg:block">

            <h2 className="text-3xl  lg:text-5xl font-bold ">{anime.name}</h2>
            {anime.episodes.sub > 0 && anime.episodes.dub > 0 ? (
                        <p className="text-gray-400 md:mt-4 lg:mt-4">Sub | Dub</p>
                      ) : anime.episodes.sub > 0 ? (
                        <p className="text-gray-400 md:mt-4 lg:mt-4">Sub</p>
                      ) : (
                        anime.episodes.dub > 0 && (
                          <p className="text-gray-400 md:mt-4 lg:mt-4">Dub</p>
                        )
                      )}
            <p className="hidden md:block lg:block mt-3 md:pr-1 pr-10">{anime.description}</p>

            <div className="mt-2 md:mt-4 lg:mt-5 flex gap-2 items-center">
              <button className=" bg-green-500  text-gray-900 text-base lg:text-lg font-semibold py-2 px-3 lg:px-6 rounded hover:bg-gray-500"
              onClick={() => animeClicked(anime.id)}>
              <i class="fa-solid fa-caret-right text-gray-900 mr-3 "></i>
                Watch Now</button>
              <i class="fa-regular fa-bookmark text-lg lg:text-2xl text-green-500  py-1 px-2 rounded  border-green-500 border-2 hover:bg-gray-500 hover:text-white hover:border-gray-500"></i>

            </div>
          
        </div>
            
        </div>

        <img
          src={anime.poster}
          alt={anime.name}
          className="object-cover w-full h-full"
        />

        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r lg:bg-gradient-to-r from-slate-950 md:from-black  lg:from-black to-transparent z-10"></div>
      </div>
    ))}

  </Carousel>
</div>


  </>
  
  );
}

export default Slider;
