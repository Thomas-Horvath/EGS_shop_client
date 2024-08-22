import React from 'react';
import './PreHeader.css';
import InfoLink from '../../InfoLink/InfoLink';
import { preHeaderLinks } from '../../../assets/assets.js';
import { FaLocationDot, FaPhone } from "react-icons/fa6";

const PreHeader = () => {
    return (
        <div className="pre-header">
            <div className="pre-header-content w1400">
                <ul className='pre-menu dflex'>
                  {
                    preHeaderLinks.map((link , index ) => (
                        <InfoLink
                         key={ index + link.title}
                         title={link.title}
                         className={ link.className }
                         path={ link.path }    
                         />
                    ))
                  }
                </ul>

                <div className="contact-section">
                    <FaLocationDot />
                    <p className='address'>1035 Budapest Bárhol utca 6.</p>
                    <FaPhone />
                    <p> 06 20 123 4567</p>
                </div>
            </div>
        </div>
    )
};

export default PreHeader;