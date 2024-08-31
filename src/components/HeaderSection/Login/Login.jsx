import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { assets } from '../../../assets/assets';
import { FaUserAlt, FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import { AuthContext } from '../../../contexts/AuthContext';
import { CartContext } from '../../../contexts/CartContext';


const Login = ({ toggleMenu }) => {
  const [searchVisible, setSearchVisible] = useState(false); // Állapot a keresőmezőhöz
  const [searchQuery, setSearchQuery] = useState(''); // Állapot a keresőszöveghez
  const [sublistClosed, setSublistClosed] = useState(false);
  const [isAlertClose, setIsAlertClose] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);   // a görgetés állapota

  const { isLoggedIn, logout } = useContext(AuthContext);
  const { cartItems, removeFromCart , handleCheckoutClick} = useContext(CartContext);



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



  // Görgetés figyelése a logó méretének változtatásához
  useEffect(() => {
    // figyeljük a scroll eseményt az oldalon
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);


    // A useEffect visszatérési értéke egy cleanup funkció, amely eltávolítja a görgetésfigyelőt, 
    // amikor a komponens eltávolításra kerül az oldalról
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  //össze ár kiszámítása
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.Price * item.quantity;
    }, 0);
  };


  const handleCartAlertDisplay = () => {
    setIsAlertClose(true)
    setTimeout(() => {
      setIsAlertClose(false)
    }, 300)
  }

  const handleCombinedClick = () => {
    handleCartAlertDisplay();
    handleCheckoutClick();
  };


  return (
    <div className="login-wrapper">
      <div className='login w1400'>

        {/* logó */}
        <Link to="/">
          <img className={`logo ${isScrolled ? 'scrolled' : ''}`} src={assets.logo} alt="Logo" />
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
            <Link to="/rendelés/kosár"><button className='btn btn-icon ' onClick={handleLinkClick}><FaShoppingCart className='login-icon' /><p className='btn-text'>Kosár</p></button></Link>
            {cartItems.length >= 0 && <div className="dot">  {cartItems.reduce((total, item) => total + item.quantity, 0)}</div>}
            <div className={`cart-alert ${isAlertClose ? "close-alert" : ""}`} >
              {cartItems.length === 0 ? (
                <p>Kosár jelenleg üres</p>
              ) : (
                <>
                  <h4>Tételek a kosárban:</h4>
                  <ul>
                    {cartItems.map((item, index) => (
                      <li key={index}>
                        {item.Name} - {item.quantity} db
                        <button className='btn delete-btn main-btn' onClick={() => removeFromCart(item.ProductID)}><IoTrashSharp className='trash-icon'/></button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <h5>Összesen: {calculateTotalPrice().toFixed(2)} Ft</h5>
              <p className="arrow"></p>
              <div className="button-container">
                <Link to="/rendelés/kosár"><button className="btn cart-btn main-btn" onClick={handleCartAlertDisplay}>Kosár</button></Link>
                <button className="btn cart-btn main-btn" onClick={handleCombinedClick} >Pénztár</button>
              </div>
            </div>
          </div>




          {/* bejelentkézés */}

          <div className={`login-btn ${sublistClosed ? 'close' : ''}`}>
            <button className='btn btn-icon'><FaUserAlt className='login-icon' /><p className='btn-text'>Profil</p></button>

            <ul className='login-submenu'>

              {(!isLoggedIn) ? (
                <>
                  <li className="arrow"></li>
                  <Link to="/profil/bejelentkezés" onClick={handleLinkClick}><li >Bejelentkezés</li></Link>
                  <Link to="/profil/regisztráció" onClick={handleLinkClick}><li>Regisztráció</li></Link>
                </>
              ) : (
                <>
                  <li className="arrow"></li>
                  <Link to="/fiókom/saját-profil" onClick={handleLinkClick}><li >Fiókom</li></Link>
                  <Link to="/fiókom/rendeléseim" onClick={handleLinkClick}><li>Rendeléseim</li></Link>
                  <Link to="/" onClick={() => { logout(); handleLinkClick() }}><li>Kijelentkezés</li></Link>
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