import React from 'react';
import { Link } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import './NewsLetter.css';

const NewsLetter = () => {
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
          </div>
          <div className="newsletter-right">
            <form >
              <label htmlFor="news">Szeretnék felíratkozni a hírlevélre</label>
              <div className="news-wrapper">
                <input type="email" name="email" id='news' placeholder='példa@gmail.com' />
                <button className="main-btn news-btn">Küldés</button>
              </div>
            </form>
            <span>A beküldéssel elfogadom az <Link to="/információk">adatkezelési tájékoztatóban</Link>  foglaltakat!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter