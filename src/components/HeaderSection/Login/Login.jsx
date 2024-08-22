import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { assets } from '../../../assets/assets';
import { FaUserAlt, FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";
import { AuthContext } from '../../../contexts/AuthContext';


const Login = ({ toggleMenu }) => {
  const [searchVisible, setSearchVisible] = useState(false); // Állapot a keresőmezőhöz
  const [searchQuery, setSearchQuery] = useState(''); // Állapot a keresőszöveghez
  const [sublistClosed, setSublistClosed] = useState(false);

  const { isLoggedIn, logout } = useContext(AuthContext);



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


// eltűntetjük az almenüt ha a valamelyik linkre kattintunk
  const handleLinkClick = () => {
    setSublistClosed(true);
    setTimeout(() => setSublistClosed(false), 600);  
  };


  return (
    <div className="login-wrapper">
      <div className='login w1400'>

        {/* logó */}
        <Link to="/">
          <img className="logo" src={assets.logo} alt="Logo" />
        </Link>




        <div className="login-right">


          {/*  kereső mező */}
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






          {/* Kosár */}
          <div className={`login-cart-btn ${sublistClosed ? 'close' : ''}`}>
            <Link to="/kosár"><button className='btn btn-icon ' onClick={handleLinkClick}><FaShoppingCart className='login-icon' /><p className='btn-text'>Kosár</p></button></Link>
            <div className="dot">0</div>
            <div className="cart-alert">
              <p>Kosár üres</p>

            </div>
          </div>




          {/* bejelentkézés */}

          <div className={`login-btn ${sublistClosed ? 'close' : ''}`}>
            <button className='btn btn-icon'><FaUserAlt className='login-icon' /><p className='btn-text'>Profil</p></button>

            <ul className='login-submenu'>

              { (!isLoggedIn) ? (
                <>
                  <Link to="/profil/bejelentkezés" onClick={handleLinkClick}><li >Bejelentkezés</li></Link>
                  <Link to="/profil/regisztráció" onClick={handleLinkClick}><li>Regisztráció</li></Link>
                </>
              ) : (
                <>
                  <Link to="/fiókom/saját-profil" onClick={handleLinkClick}><li >Fiókom</li></Link>
                  <Link to="/fiókom/rendeléseim" onClick={handleLinkClick}><li>Rendeléseim</li></Link>
                  <Link to="/fiókom/kijelentkezés" onClick={() => { logout() ;handleLinkClick() }}><li>Kijelentkezés</li></Link>
                </>
              )
              }

            </ul>
          </div>

          <button className='btn btn-icon hamburger-btn' ><FaBars onClick={toggleMenu} className='login-icon hamburger-icon' /></button>




        </div>
      </div>
    </div >
  )
};

export default Login;