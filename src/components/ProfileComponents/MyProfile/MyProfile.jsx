import React, { useState, useContext , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserEdit, FaRegListAlt, FaRegAddressCard } from "react-icons/fa";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { AuthContext } from '../../../contexts/AuthContext';
import './MyProfile.css'

const MyProfile = ({ profile }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        if (showConfirmDialog) {
            document.body.style.position = 'fixed';
        } else {
            document.body.style.position = '';
        }
        return () => {
            document.body.style.position = '';
        };
    }, [showConfirmDialog]);


    

    const handleDeleteProfile = async (e) => {
        e.preventDefault();

        // Fetch a bejelentkezési végpontra a jelszóval és a felhasználónévvel
        const response = await fetch('https://thomasapi.eu/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                UserName: profile.UserName,
                Password: password
            })
        });

        // Ellenőrzés, hogy kaptunk-e tokent
        if (response.ok) {
            const data = await response.json();
            const deleteToken = data.token;

            if (deleteToken) {
                setShowConfirmDialog(true)
            }
        } else {
            // Hiba esetén hibaüzenet beállítása

            setError("Helytelen jelszó!");

            setTimeout(() => setError(""), 2000)
            setPassword("");
            setShowPassword(false)
        }
    }


    const handleDelete = () => {
        const token = sessionStorage.getItem('token');


        fetch('https://thomasapi.eu/api/profileupdate', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                UserName: profile.UserName,
                EmailAddress: profile.EmailAddress,
                ActiveFlag: false
            })

        });
        logout();
        setShowConfirmDialog(false);
        navigate('/');
    }

    const handleBack = () => {
        setShowConfirmDialog(false);
        setPassword("");
        setShowPassword(false);
    }

    let errors = {};

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



            <div className="profile-delete-container ">
                <h2>Profil törlése</h2>
                <form className='form delete-form' onSubmit={handleDeleteProfile}>
                    <div className="form-container">
                        <label htmlFor="delete">A profil törléséhez adja meg jelszavát:</label>
                        <div className="password-container">
                            <input
                                className={`loginpage-input ${errors.password ? 'input-error scroll' : ''}`}
                                name="delete"
                                id="delete"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Jelszó"
                            />
                            <button className='eye-icon-btn delete-pass-btn' type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <IoEyeOffSharp /> : <IoEye />}
                            </button>
                        </div>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className='red-btn delete-btn'>Profil törlése</button>
                </form>
            </div>



            {showConfirmDialog && (
                <div className="confirm-dialog-overlay">
                    <div className="confirm-dialog">
                        <p>Valóban törölni szeretné a profilját?</p>
                        <div className="button-group">
                            <button className="confirm-button" onClick={handleBack}>Mégsem</button>
                            <button className="confirm-button" onClick={handleDelete}>Törlés</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default MyProfile;