import React from 'react';
import './Header.css';
import { assets } from '../../assets/assets';


const Header = () => {
  return (
    <div className='header w1400'>
      <img className="logo" src={assets.logo} alt="Logo" />
      <div className="header-right">

        <div className="header-search-input">
          <input className='search-input' type="text" placeholder='Termék keresése...' />
          <button className='btn btn-icon'><img src={assets.searchIcon} alt="keresés ickn" /></button>
        </div>

        <div className="header-cart-icon">
          <p className='cart-content'>0 FT</p>
          <div className='btn btn-icon'>
            <img src={assets.basketIcon} alt="kosár ikon" />
          </div>
          <div className="dot">0</div>
        </div>

        <button className='btn btn-login'>Bejelentkezés/Regiyztráció</button>
      </div>
    </div>

  )
};

export default Header;