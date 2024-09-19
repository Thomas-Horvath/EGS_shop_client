import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import './NewsLetter.css';
import {assets } from '../../../assets/assets';



const NewsLetter = () => {
 

  useEffect((e) => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const message = e.target.email.value.trim();

    // TODO itt lesz a fetch küldés.

    e.target.reset();
    console.log(message);
  }


  return (
    <div>
      <div className="newsletter w1400">
        <h2 className='home-sections-heading'>EGS Hírlevél</h2>
        <div className="newsletter-container">

          <div className="newsletter-left">
            <p>Íratkozz fel az <strong>EGS</strong> hírlevélre, és kis szerencsével értékes ajándékokat nyerhetsz!</p>
            <ul>
              <li><TiTick /> Akciók</li>
              <li><TiTick /> Nyeremények</li>
              <li><TiTick /> Újdonságok</li>
            </ul>
            <img className='newsletter-icon' src={assets.newsletter} alt="hírlevél ikon" />
          </div>
          <div className="newsletter-right">
            <form onSubmit={handleSubmit}>
              <label htmlFor="news">Szeretnék felíratkozni a hírlevélre</label>
              <div className="news-wrapper">
                <input type="email" name="email" id='news' placeholder='példa@gmail.com' />
                <button className="main-btn news-btn">Küldés</button>
              </div>
            <span>A beküldéssel elfogadom az <Link to="/adatvédelem">adatkezelési tájékoztatóban</Link>  foglaltakat!</span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter