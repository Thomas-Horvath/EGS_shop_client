import React from 'react';
import './Home.css';
import Carousel from '../../components/Carousel/Carousel';
// import { assets } from '../../assets/assets'

const Home = () => {
    return (
        <div className='home w1400'>
            <div className="banner">
                <div className="carousel-container">
                    <Carousel />
                </div>
                <div className="right-container">
                    <div className="banner-top"></div>
                    <div className="banner-bottom"></div>
                </div>
            </div> 
        </div>
    )
};

export default Home;