import React from 'react';
import './Navbar.css';

import { TbCirclePercentage } from "react-icons/tb";

const Navbar = () => {
  return (
    <div className='navbar'>
      <ul className='navbar-menu w1400'>
        <li className='navbar-menu-item'>Elektromos gitárok</li>
        <li className='navbar-menu-item'>Gitár erősítők</li>
        <li className='navbar-menu-item'>Effektek</li>
        <li className='navbar-menu-item'>Kiegészítők</li>
        <li className='navbar-menu-item'>Akciók <TbCirclePercentage className='icon'/> </li>
      </ul>
    </div>
  )
};

export default Navbar;