import React from 'react';
import './Footer.css';
import InfoLink from '../InfoLink/InfoLink'
import { footerInfoLinks, assets } from '../../assets/assets';

const Footer = () => {
  


  return (
    <div className='footer'>
      <div className="footer-wrapper">

        <div className="address">
          <img src={assets.logo} alt="logo" className='footer-logo' />
          <ul className='address-details'>
            <li><h2>Electric Guitar Shop</h2></li>
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

        <div className="info-links">
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
      </div>
    </div>
  )
};

export default Footer;