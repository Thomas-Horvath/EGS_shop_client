// import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';

import { assets } from '../../../assets/assets'

const Slider = () => {
    return (
        <>
            <Swiper
                cssMode={true}
               
                navigation={true}
                pagination={true}
                mousewheel={true}
                loop={true}
                keyboard={true}
                autoplay={{ delay: 4000 }}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={assets.banner} alt="gitárok" />
                    {/* <p className='text text1-pos'>Üdvözlünk Az EGS shoppban!</p> */}
                </SwiperSlide>
                <SwiperSlide>
                    <img src={assets.red_guitar} alt="fender" />
                    <p className='text text2-pos'>Fender akció!</p>
                </SwiperSlide>
                <SwiperSlide>
                <img src={assets.technic} alt="pedálok" />
                {/* <p className='text text3-pos'>Fender akció!</p> */}
                </SwiperSlide>

            </Swiper>
        </>
    );
};

export default Slider;