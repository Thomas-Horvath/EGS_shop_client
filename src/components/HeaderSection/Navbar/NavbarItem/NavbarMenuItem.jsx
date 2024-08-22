import React from 'react';
import './NavbarMenuItem.css';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const NavbarMenuItem = (props) => {
  const { title, submenuItems, handleLinkClick, sublistClosed } = props;
  
  return (
    <li className={`navbar-menu-item ${sublistClosed ? 'close' : ''}`}>
      {title}<MdOutlineKeyboardArrowDown />
      <ul className="sublist">
        {submenuItems.map((item, index) => (
          <Link to={item.path} onClick={handleLinkClick} key={index}>
            <li>{item.label}</li>
          </Link>
        ))}
      </ul>
    </li>
  );
};

export default NavbarMenuItem;
