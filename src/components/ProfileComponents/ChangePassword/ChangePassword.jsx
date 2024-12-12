import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import './ChangePassword.css';

const ChangePassword = ({ username, email, handleBackClick }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Először küldjük el a régi jelszót az ellenőrzéshez
        try {
            const loginResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                mode: "cors",
                body: JSON.stringify({
                    "UserName": username,
                    "Password": oldPassword
                })
            });

            const loginData = await loginResponse.json();

            if (loginResponse.ok && loginData.token) {
                // Ha a bejelentkezés sikeres, ellenőrizzük, hogy az új jelszó hosszú-e
                if (newPassword.length < 6) {
                    setErrorMessage('A jelszónak legalább hat karakterből kell állnia!');
                    setSuccessMessage('');
                } else {
                    // Ha a bejelentkezés sikeres, elküldjük az új jelszót
                    const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/profileupdate`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                            "Authorization": `Bearer ${loginData.token}`
                        },
                        mode: "cors",
                        body: JSON.stringify({
                            "UserName": username,
                            "Password": newPassword,
                            "EmailAddress": email,
                        })
                    });
                    
                    if (updateResponse.ok) {
                        setSuccessMessage('A jelszó sikeresen megváltoztatva!');
                        setErrorMessage('');
                        setTimeout(() => navigate(-1), 2000);
                    } else {
                        setErrorMessage('Hiba történt a jelszó megváltoztatása során.');
                        setSuccessMessage('');
                    }

                }
            } else {
                setErrorMessage('Hibás régi jelszó.');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Hálózati hiba történt.');
            setSuccessMessage('');
        }
    };

    return (
        <div className='main-container w1400'>
            <h1>Jelszó megváltoztatása</h1>
            <div className="form-container">
                <form className='form new-password-form' onSubmit={handleSubmit}>
                    <label htmlFor="old">Jelenlegi jelszó</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='old'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder='Régi jelszó'
                        />
                        <button className='eye-icon-btn' type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <IoEyeOffSharp /> : <IoEye />}
                        </button>
                    </div>
                    <label htmlFor="new">Új jelszó</label>
                    <div className="password-container">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            id='new'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder='Új jelszó'
                        />
                        <button className='eye-icon-btn' type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <IoEyeOffSharp /> : <IoEye />}
                        </button>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <div className="btn-container">
                        <button className="btn back-btn red-btn" onClick={handleBackClick}>Vissza a Profilhoz</button>
                        <button className='btn red-btn changepass-btn' type="submit">Megváltoztat</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
