import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import { FaGripfire } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import NavbarMenuItem from './NavbarItem/NavbarMenuItem';
import { menuItems } from '../../../assets/assets.js'


const Navbar = ({ isOpen, setIsOpen }) => {
  const [sublistClosed, setSublistClosed] = useState(false);

  const handleLinkClick = () => {
    setSublistClosed(true);
    setTimeout(() => setSublistClosed(false), 300); // Reset state after animation
    setIsOpen(false);  // Bezárja a navigációs sávot is
  }


  // menü linkek tartalma





  return (
    <div className={`navbar ${isOpen ? 'open' : ''}`}>
      <button className='btn close-btn' onClick={() => setIsOpen(false)}>
        <IoCloseSharp />
      </button>
      <ul className='navbar-menu w1400'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={index}
            title={item.title}
            submenuItems={item.submenuItems}
            handleLinkClick={handleLinkClick}
            sublistClosed={sublistClosed}
          />
        ))}

        <li>
          <Link to="/termékek/akciók" className='navbar-menu-item' onClick={handleLinkClick}>
            Akciók <FaGripfire className='icon' />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
