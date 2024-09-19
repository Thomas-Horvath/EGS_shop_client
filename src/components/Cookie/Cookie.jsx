import React, { useEffect, useState } from 'react';
import './Cookie.css'; // A stílusok elhelyezéséhez szükséges CSS fájl

const Cookie = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Ellenőrizzük, hogy a cookie-kat elfogadták-e vagy tagadták
    const hasAcceptedCookies = sessionStorage.getItem('cookiesAccepted');
    const hasDeniedCookies = sessionStorage.getItem('cookiesDenied');

    if (hasAcceptedCookies === 'true') {
      setShow(false); // Ha elfogadták, ne jelenjen meg az értesítő
    } else if (hasDeniedCookies === 'true') {
      setShow(true); // Ha tagadták, mindig jelenjen meg az értesítő
    } else {
      setShow(true); // Alapértelmezés szerint jelenjen meg az értesítő
    }
  }, []);

  const handleAcceptCookies = () => {
    sessionStorage.setItem('cookiesAccepted', 'true');
    sessionStorage.removeItem('cookiesDenied');
    setShow(false);
  };

  const handleDenyCookies = () => {
    sessionStorage.setItem('cookiesDenied', 'true');
    sessionStorage.removeItem('cookiesAccepted');
    setShow(false);
  };

  return (
    show && (
      <div className="cookie-notification">
        <p>
          Az oldal cookie-kat használ a felhasználói élmény javítása érdekében. Kérjük, fogadja el a cookie-k használatát.
        </p>
        <div className="cookie-btn-container">
          <button className='red-btn cookie-btn' onClick={handleDenyCookies}>Megtagadom</button>
          <button className='red-btn cookie-btn' onClick={handleAcceptCookies}>Elfogadom</button>
        </div>
      </div>
    )
  );
};

export default Cookie;
