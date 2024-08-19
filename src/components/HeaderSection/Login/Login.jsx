import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { assets } from '../../../assets/assets';
import { FaUserAlt, FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Login = ({ toggleMenu }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Állapot a keresőszöveghez

  // TODO a sessoin storeageben tárolt tokentől függ majd ha van akkor true ha nincs false 
  const [login, setLogin] = useState(false);

  // Képernyőméret figyelése
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 992px)');

    // Kezdeti állapot beállítása és minden méretváltásnál
    const handleResize = () => {
      if (mediaQuery.matches) {
        setSearchVisible(true); // 992px fölött mindig látható
      } else {
        setSearchVisible(false); // 992px alatt csak kattintásra jelenik meg
      }
    };

    handleResize(); // Hívjuk meg egyszer a komponens betöltésekor

    // Méretváltozás figyelése
    mediaQuery.addEventListener('change', handleResize);

    // Eltávolítás a cleanup során
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);



  const handleSearchClick = () => {
    if (searchVisible && searchQuery.trim() !== '') {
      handleSearchSubmit(); // Ha az input látható és van szöveg, submitolunk
    } else if (window.innerWidth < 992) {
      setSearchVisible(!searchVisible); // Ha nincs szöveg vagy nem látható, csak váltunk
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();


    // Itt kezelheted a keresési műveletet, pl. fetch, stb.
    console.log('Keresés:', searchQuery);
    if (window.innerWidth < 992) {
      setSearchVisible(false); // 992px alatt eltűnik submit után
    }
    setSearchQuery(''); // Töröljük a keresési mezőt
  };



  return (
    <div className="login-wrapper">
      <div className='login w1400'>
        <Link to="/">
          <img className="logo" src={assets.logo} alt="Logo" />
        </Link>
        <div className="login-right">

          <div className="login-search-input">
            {searchVisible && (
              <form onSubmit={handleSearchSubmit}>
                <input className='search-input' type="text" placeholder='Termék keresése...' value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />
              </form>
            )}
            <button className='btn btn-icon' onClick={handleSearchClick}>
              <FaSearch className='login-icon' />
            </button>
          </div>

          <div className="login-cart-btn">
            <Link to="/cart"><button className='btn btn-icon '><FaShoppingCart className='login-icon' /><p className='btn-text'>Kosár</p></button></Link>
            <div className="dot">0</div>
            <div className="cart-alert">
              <p>Kosár üres</p>
            </div>
          </div>


          {!login ? (
            <div className="login-btn">
              <button className='btn btn-icon'><FaUserAlt className='login-icon' /><p className='btn-text'>Belépés</p></button>
              <ul className='login-submenu'>
                <Link to="/loginpage"><li >Bejelentkezés</li></Link>
                <Link to="/loginpage"><li>Regisztráció</li></Link>
              </ul>
            </div>
          ) : (

            <div className="login-btn">
              <button className='btn btn-icon'><RiLogoutBoxRLine className='login-icon' /><p className='btn-text'>Kijelentkezés</p></button>
            </div>

          )
          }









          <button className='btn btn-icon hamburger-btn' ><FaBars onClick={toggleMenu} className='login-icon hamburger-icon' /></button>
        </div>
      </div>
    </div>
  )
};

export default Login;