import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { FreeMode, Navigation } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import  { SkeletonTheme } from 'react-loading-skeleton';

function ImageSwiper({ animes, heading, subHeading, loading }) {
    const navigate = useNavigate();

    const animeClicked = (animeId) => {
        navigate(`/anime/${animeId}`);
    };

    
    return (
        <SkeletonTheme baseColor="#070E2A" highlightColor="#111A43">
            <div className="px-3 lg:px-16 relative mt-12 lg:mt-0">
                <div className="lg:absolute lg:-top-20 z-10 mb-3">
                    <h2 className="text-xl lg:text-3xl font-semibold">{heading}</h2>
                    <p className="text-sm text-gray-500 mb-3">{subHeading }</p>
                </div>
                <Swiper
                    spaceBetween={20}
                    loop={true}
                    freeMode={true}
                    navigation={true}
                    modules={[FreeMode, Navigation]}
                    className="mySwiper h-64 md:h-96 lg:h-96 cursor-grab custom-swiper-navigation"
                    breakpoints={{
                        0: {
                            slidesPerView: 2.2,
                        },
                        600: {
                            slidesPerView: 3.2,
                        },
                        1024: {
                            slidesPerView: 5.2,
                        },
                    }}
                >
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <SwiperSlide key={index} className="h-64 md:h-96 lg:h-96 cursor-pointer">
                                <Skeleton className="h-full w-full rounded" />
                            </SwiperSlide>
                        ))
                    ) : (
                        animes.map((anime) => (
                            <SwiperSlide
                                key={anime.id}
                                onClick={() => animeClicked(anime.id)}
                                className="h-64 md:h-96 lg:h-96 cursor-grab"
                            >
                                <div className="h-5/6 w-full">
                                    {anime.poster ? (
                                        <img src={anime.poster} alt={anime.name} className="rounded h-full w-full object-cover" />
                                    ) : (
                                        <Skeleton className="rounded h-full w-full" />
                                    )}
                                </div>
                                <div className="1/6">
                                    <h2 className="text-sm lg:text-base font-medium flex-wrap">
                                        {anime.name.length > 57 ? anime.name.substring(0, 57) + "..." : anime.name}
                                    </h2>
                                    {anime?.episodes?.sub && anime.episodes.sub > 0 && anime?.episodes?.dub && anime.episodes.dub > 0 ? (
                                        <p className="text-gray-500 text-sm">Sub | Dub</p>
                                    ) : anime?.episodes?.sub && anime.episodes.sub > 0 ? (
                                        <p className="text-gray-500 text-sm">Subtitled</p>
                                    ) : anime?.episodes?.dub && anime.episodes.dub > 0 ? (
                                        <p className="text-gray-500 text-sm">Dubbed</p>
                                    ) : null}
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </SkeletonTheme>
    );
}

export default ImageSwiper;
