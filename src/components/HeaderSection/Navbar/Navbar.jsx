import React , { useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import { FaGripfire } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar = ({ isOpen, setIsOpen }) => {
  const [isSublistOpen, setIsSublistOpen] = useState(false);


  // const toggleSublist = () => {
  //   setIsSublistOpen(!isSublistOpen);
  // };

  return (
    <div className={`navbar ${isOpen ? 'open' : ''}`}>

      <button className='btn close-btn' onClick={() => setIsOpen(false)}><IoCloseSharp /></button>
      <ul className='navbar-menu w1400'>
        <li className='navbar-menu-item'>Elektromos gitárok<MdOutlineKeyboardArrowDown /> 
          <ul className={`sublist ${isSublistOpen ? 'openList' : ''}`}>
            <Link to="/products" onClick={() => setIsOpen(false)} ><li>Jobb kezes</li></Link>
            <Link to="/products" onClick={() => setIsOpen(false)} ><li>Bal kezes</li></Link>
            <Link to="/products" onClick={() => setIsOpen(false)} ><li>Héthúros</li></Link>
          </ul>
        </li>
        <li className='navbar-menu-item'>Gitár erősítők<MdOutlineKeyboardArrowDown />
          <ul className={`sublist ${isSublistOpen ? 'openList' : ''}`}>
            <Link to="/products" onClick={() => setIsOpen(false)}><li>Erősítő fej</li></Link>
            <Link to="/products" onClick={() => setIsOpen(false)}><li>Láda</li></Link>
            <Link to="/products" onClick={() => setIsOpen(false)}><li>Kombó</li></Link>
          </ul></li>
        <li className='navbar-menu-item' >Effektek<MdOutlineKeyboardArrowDown />
          <ul className={`sublist ${isSublistOpen ? 'openList' : ''}`}>
            <Link to="/products" onClick={() => setIsOpen(false)}><li>Pedál</li></Link>
            <Link to="/products" onClick={() => setIsOpen(false)}><li>Multieffekt</li></Link>
            {/* <Link to="/products"><li>Héthúros</li></Link> */}
          </ul></li>
        <li className='navbar-menu-item'>Kiegészítők<MdOutlineKeyboardArrowDown />
          <ul className={`sublist ${isSublistOpen ? 'openList' : ''}`}>
            <Link to="/products" onClick={() => setIsOpen(false)}><li>Húr</li></Link>
            <Link to="/products" onClick={() => setIsOpen(false)}><li>Kemény tok</li></Link>
            <Link to="/products" onClick={() => setIsOpen(false)}><li>Puhatok</li></Link>
            <Link to="/products" onClick={() => setIsOpen(false)}><li>Heveder</li></Link>
            <Link to="/products" onClick={() => setIsOpen(false)}><li>Pengető</li></Link>
          </ul></li>
        <li><Link to="/" className='navbar-menu-item' onClick={() => setIsOpen(false)}>Akciók <FaGripfire className='icon' /></Link></li>
      </ul>
    </div>
  )
};

export default Navbar;