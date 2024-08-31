import React from 'react';
import './Home.css';
import Carousel from '../../components/HomePageSections/Carousel/Carousel';
import BestSelling from '../../components/HomePageSections/BestSelling/BestSelling';
import InfoBlock from '../../components/HomePageSections/InfoBlock/InfoBlock';
import { assets } from '../../assets/assets'
import Brands from '../../components/HomePageSections/Brands/Brands';
import About from '../../components/HomePageSections/About/About';
import NewsLetter from '../../components/HomePageSections/NewsLetter/NewsLetter';

const Home = () => {
    return (
        <div className='home '>
            <div className="banner w1400">
                <div className="carousel-container">
                    <Carousel />
                </div>
                <div className="right-container">
                    <img className="banner-top" src={assets.marshall_2} alt="Akciós termékek" />
                    <img className="banner-bottom" src={assets.ibanez_amp} alt="" />
                </div>
            </div>


            <BestSelling />
            <InfoBlock />
            <Brands />
            <About />
            <NewsLetter />


        </div>
    )
};

export default Home;