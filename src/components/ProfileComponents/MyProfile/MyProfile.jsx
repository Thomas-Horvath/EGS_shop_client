import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaRegListAlt, FaRegAddressCard } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import './MyProfile.css'

const MyProfile = ({ profile }) => {
    return (
        <div className="main-container">
            <h1>Fiókom</h1>
            <h2>Szia, {profile.FirstName}!</h2>
            <div className="menu-container">

                <Link to="/fiókom/szerkesztés" className="menu-link menu-card">
                    <FaUserEdit className='profile-icon' />
                    <h3>Profil módosítása</h3>
                </Link>


                <Link to="/fiókom/rendeléseim" className="menu-link menu-card">
                    <FaRegListAlt className='profile-icon' />
                    <h3>Rendeléseim</h3>
                </Link>

                <Link to="/fiókom/címeim" className="menu-link menu-card">
                    <FaRegAddressCard className='profile-icon' />
                    <h3>Címadatok módosítása</h3>
                </Link>

                <Link to="/fiókom/jelszóváltoztatás" className="menu-link menu-card">
                    <RiLockPasswordFill className='profile-icon' />
                    <h3>Jelszó megváltoztatása</h3>
                </Link>

            </div>
        </div>
    )
}

export default MyProfile;