import React, { useState } from 'react';
import './Header.css';
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='header'>
      <Login toggleMenu={toggleMenu} />
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>

  )
};

export default Header;