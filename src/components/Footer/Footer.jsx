import React from 'react';
import './Footer.css';
import { Link, useNavigate } from 'react-router-dom';
import InfoLink from '../InfoLink/InfoLink';
import { footerInfoLinks, assets } from '../../assets/assets';
import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";

const Footer = () => {
  const navigate = useNavigate();

  // Függvény az átirányításhoz
  const handleProfileLinkClick = (e, path) => {
    e.preventDefault(); // Megakadályozzuk az alapértelmezett link viselkedést
    const token = sessionStorage.getItem('token');

    if (token) {
      // Ha van token, navigáljunk a saját profil oldalra
      navigate('/fiókom/saját-profil');
    } else {
      // Ha nincs token, navigáljunk a bejelentkezés oldalra
      navigate(path);
    }
  };


  return (
    <>
      <div className='footer'>
        <div className="footer-wrapper w1400">

          <div className="address grid-item">
            <h2>Elérhetőségek</h2>
            <div className="footer-logo">
              <img src={assets.logo} alt="logo" />
            </div>
            <ul className='address-details'>
              <li><FaLocationDot /> 1035 Budapest Bárhol utca 6.</li>
              <li><FaPhone /> 06 20 123 4567</li>
              <li><FaEnvelope /> info@egs.hu</li>
              <ul className='social-icons'>
                <a href="https://facebook.com" target='_blank' rel='noreferrer'><FaFacebook /></a>
                <a href="https://instagram.com" target='_blank' rel='noreferrer'><FaInstagramSquare /></a>
                <a href="https://youtube.com" target='_blank' rel='noreferrer'><FaYoutube /></a>
              </ul>
            </ul>


          </div>

          <div className="info-links grid-item">
            <h2 className="info-title">Információk</h2>
            <ul className='footer-info-links'>
              {footerInfoLinks.map((link, index) => (
                <InfoLink
                  key={index + link.title}
                  title={link.title}
                  className={link.className}
                  path={link.path}

                />
              ))
              }
            </ul>
          </div>

          <div className="opening-hours grid-item">
            <h2>Nyitvatartás</h2>
            <div className="opening-hours-grid">
              <div className="days">
                <div>Hétfő</div>
                <div>Kedd</div>
                <div>Szerda</div>
                <div>Csütörtök</div>
                <div>Péntek</div>
                <div>Szombat</div>
                <div>Vasárnap</div>
              </div>
              <div className="hours">
                <div>10:00 - 18:00</div>
                <div>10:00 - 18:00</div>
                <div>10:00 - 18:00</div>
                <div>10:00 - 18:00</div>
                <div>10:00 - 18:00</div>
                <div>10:00 - 14:00</div>
                <div>Zárva</div>
              </div>
            </div>
          </div>




          <div className="profile-links grid-item">
            <h2>Fiókom</h2>
            <ul>
              <Link to="/profil/bejelentkezés" onClick={(e) => handleProfileLinkClick(e, '/profil/bejelentkezés')}><li>Bejelentkezés</li></Link>
              <Link to="/profil/regisztráció" onClick={(e) => handleProfileLinkClick(e, '/profil/regisztráció')}><li>Regisztráció</li></Link>
              <Link to="/profil/elfelejtett-jelszó" onClick={(e) => handleProfileLinkClick(e, '/profil/elfelejtett-jelszó')}><li>Elfelejtett jelszó</li></Link>
              <Link to="/kapcsolat"><li>Kapcsolat</li></Link>
            </ul>
          </div>

        </div>
      </div>
      <div className="footer-bottom">
        Copyright &copy; 2024 ElectricGuitarShop
      </div>
    </>
  )
};

export default Footer;