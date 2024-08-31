import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import InfoLink from '../InfoLink/InfoLink';
import { footerInfoLinks, assets } from '../../assets/assets';

const Footer = () => {



  return (
    <>
      <div className='footer'>
        <div className="footer-wrapper w1400">

          <div className="address grid-item">
            <h2>Elérhetőségek</h2>
            <img src={assets.logo} alt="logo" className='footer-logo' />
            <ul className='address-details'>
              <li></li>
              <li>Cím</li>
              <li>telefon</li>
              <li>email</li>
              <ul>
                <a href="https://facebook.com" target='_blank' rel='noreferrer'>facebook</a>
                <a href="https://facebook.com" target='_blank' rel='noreferrer'>facebook</a>
                <a href="https://facebook.com" target='_blank' rel='noreferrer'>facebook</a>
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
              <Link to="/profil/bejelentkezés"><li>Bejelentkezés</li></Link>
              <Link to="/profil/regisztráció"><li>Regisztráció</li></Link>
              <Link to="/profil/elfelejtett-jelszó"><li>Elfelejtett jelszó</li></Link>
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