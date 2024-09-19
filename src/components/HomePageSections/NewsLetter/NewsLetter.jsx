import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import './NewsLetter.css';
import { assets } from '../../../assets/assets';



const NewsLetter = () => {
  const [message, setMessage] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    // Ellenőrizzük, hogy az email cím nem üres
    if (!email) {
      setMessage('Email cím megadása kötelező');
      return;
    }

    try {
      // POST kérés az API-ra
      const response = await fetch('https://thomasapi.eu/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      // Ellenőrizzük a válasz státuszát
      if (!response.ok) {
        throw new Error('Hiba történt az API-val való kapcsolat során');
      }
      // Sikeres feliratkozás üzenet beállítása
      setMessage('Sikeres felíratkozás!');

      // Űrlap törlése
      e.target.reset();
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error('Hiba a POST kérés során:', error);
      setMessage('Hiba történt a felíratkozás során. Kérjük, próbálja újra.');
    }
  };


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
            {message && <p className='success-message'>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter