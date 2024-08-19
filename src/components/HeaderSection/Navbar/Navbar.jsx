import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import { FaGripfire } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`navbar ${isOpen ? 'open' : ''}`}>

      <button className='btn close-btn' onClick={() => setIsOpen(false)}><IoCloseSharp /></button>
      <ul className='navbar-menu w1400'>
        <li className='navbar-menu-item' onClick={() => setIsOpen(false)}>Elektromos gitárok<MdOutlineKeyboardArrowDown /> 
          <ul className='sublist'>
            <Link to="/products"><li>Jobb kezes</li></Link>
            <Link to="/products"><li>Bal kezes</li></Link>
            <Link to="/products"><li>Héthúros</li></Link>
          </ul>
        </li>
        <li className='navbar-menu-item' onClick={() => setIsOpen(false)}>Gitár erősítők<MdOutlineKeyboardArrowDown />
          <ul className='sublist'>
            <Link to="/products"><li>Erősítő fej</li></Link>
            <Link to="/products"><li>Láda</li></Link>
            <Link to="/products"><li>Kombó</li></Link>
          </ul></li>
        <li className='navbar-menu-item' onClick={() => setIsOpen(false)}>Effektek<MdOutlineKeyboardArrowDown />
          <ul className='sublist'>
            <Link to="/products"><li>Pedál</li></Link>
            <Link to="/products"><li>Multieffekt</li></Link>
            {/* <Link to="/products"><li>Héthúros</li></Link> */}
          </ul></li>
        <li className='navbar-menu-item' onClick={() => setIsOpen(false)}>Kiegészítők<MdOutlineKeyboardArrowDown />
          <ul className='sublist'>
            <Link to="/products"><li>Húr</li></Link>
            <Link to="/products"><li>Kemény tok</li></Link>
            <Link to="/products"><li>Puhatok</li></Link>
            <Link to="/products"><li>Heveder</li></Link>
            <Link to="/products"><li>Pengető</li></Link>
          </ul></li>
        <li><Link to="/" className='navbar-menu-item' onClick={() => setIsOpen(false)}>Akciók <FaGripfire className='icon' /></Link></li>
      </ul>
    </div>
  )
};

export default Navbar;