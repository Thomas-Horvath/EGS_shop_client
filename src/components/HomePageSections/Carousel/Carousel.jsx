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
                    <img src={assets.banner} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={assets.marshall} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                <img src={assets.technic} alt="" />
                </SwiperSlide>

            </Swiper>
        </>
    );
};

export default Slider;