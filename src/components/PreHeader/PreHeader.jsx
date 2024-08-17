import React from 'react';
import './PreHeader.css';
import { FaLocationDot, FaPhone } from "react-icons/fa6";

const PreHeader = () => {
    return (
        <div className="pre-header">
            <div className="pre-header-content w1400">
                <ul className='pre-menu dflex'>
                    <li className='pre-menu-link'>Kezdőlap</li>
                    <li className='pre-menu-link'>Információk</li>
                    <li className='pre-menu-link'>Szállítás És Fizetés</li>
                    <li className='pre-menu-link'>Kapcsolat</li>
                </ul>

                <div className="contact-section">
                    <FaLocationDot />
                    <p className='address'>Cím: kdfkkfdk</p>
                    <FaPhone />
                    <p> 06 20 123 4567</p>
                </div>
            </div>
        </div>
    )
};

export default PreHeader;