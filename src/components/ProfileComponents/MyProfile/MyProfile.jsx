import React from 'react';
import { Link } from 'react-router-dom';

const MyProfile = ({ profile }) => {
    return (
        <div className="profile-container">
            <h1>Fiókom</h1>
            <h2>Szia, {profile.FirstName}!</h2>
            <div className="menu-container">
            <div className="menu-card">
                    <Link to="/fiókom/szerkesztés" className="menu-link">
                    
                        <h3>Profil módosítása</h3>
                    </Link>
                </div>
                <div className="menu-card">
                    <Link to="/fiókom/rendeléseim" className="menu-link">
                        <h3>Rendeléseim</h3>
                    </Link>
                </div>
                <div className="menu-card">
                    <Link to="/fiókom/címeim" className="menu-link">
                        <h3>Címadatok módosítása</h3>
                    </Link>
                </div>
                <div className="menu-card">
                    <Link to="/fiókom/jelszóváltoztatás" className="menu-link">
                        <h3>Jelszó megváltoztatása</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;