import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parsePhoneNumber } from 'libphonenumber-js';
import './UpdateOwnDatas.css'

const UpdateOwnDatas = ({ profile, handleBackClick, fetchProfile }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        userName: '',
        phoneNumber: '',
        emailAddress: '',
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        // A profil adatok inicializálása
        setFormData({
            lastName: profile.LastName || '',
            firstName: profile.FirstName || '',
            userName: profile.UserName || '',
            phoneNumber: profile.PhoneNumber || '',
            emailAddress: profile.EmailAddress || '',

        });
    }, [profile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.lastName) errors.lastName = 'A vezetéknév kitöltése kötelező.';
        if (!formData.firstName) errors.firstName = 'A keresztnév kitöltése kötelező.';
        if (!formData.userName) errors.userName = 'A felhasználónév kitöltése kötelező.';
        // Telefonszám ellenőrzése
        if (!formData.phoneNumber.trim()) {
            errors.phone = 'Kérlek, adj meg egy telefonszámot.';
        } else {
            try {
                const phoneNum = parsePhoneNumber(formData.phoneNumber, 'HU');

                if (!phoneNum.isValid()) {
                    errors.phone = 'Kérlek, adj meg egy érvényes telefonszámot.';
                }
            } catch (error) {
                errors.phone = 'Hiba történt a telefonszám ellenőrzésekor.';
            }
        }
        return errors;
    };

    const handleSubmit = (e) => {
       
        e.preventDefault();
        setMessage('');
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const updatedData = {
            LastName: formData.lastName,
            FirstName: formData.firstName,
            UserName: formData.userName,
            PhoneNumber: parsePhoneNumber(formData.phoneNumber, 'HU').formatInternational(),
            EmailAddress: formData.emailAddress,
        };
        

        const token = sessionStorage.getItem('token');
        fetch(`${process.env.REACT_APP_API_URL}/api/profileupdate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${token}`
            },
            mode: 'cors',
            body: JSON.stringify(updatedData),
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(errorData => {
                        throw new Error(errorData.message || 'Valami hiba történt');
                    });
                }
                return res.json();
            })
            .then(data => {
                setMessage('Az adatok sikeresen frissültek!');
                fetchProfile();
                setTimeout(() => navigate(-1), 2000);
            })
            .catch(error => {
                setMessage(error.message || 'Hiba történt a frissítés során.');
            });
    };

    return (
        <div className="main-container w1400">
            <h1>Profiladatok módosítása</h1>
            <form className='form' onSubmit={handleSubmit} noValidate >
                <label htmlFor="lastName">Vezetéknév:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'input-error' : ''}
                    placeholder='Vezetéknév'
                />
                {errors.lastName && <p className="error-text">{errors.lastName}</p>}

                <label htmlFor="firstName">Keresztnév:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'input-error' : ''}
                    placeholder='Kereszt név'
                />
                {errors.firstName && <p className="error-text">{errors.firstName}</p>}

                <label htmlFor="userName">Felhasználónév:</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className={errors.userName ? 'input-error' : ''}
                    placeholder='Felhasználónév'
                />
                {errors.userName && <p className="error-text">{errors.userName}</p>}

                <label htmlFor="phoneNumber">Telefonszám:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={errors.phoneNumber ? 'input-error' : ''}
                    placeholder='+36 20 123 4567'
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}

                <label htmlFor="email">Email cím:</label>
                <input
                    type="email"
                    id="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}


                {message && <p className={`message ${message === 'Az adatok sikeresen frissültek!' ? 'success-message' : 'error-message'}`}>{message}</p>}
                <div className="btn-container">
                    <button className="btn back-btn red-btn" onClick={handleBackClick}>Vissza a Profilhoz</button>
                    <button type="submit" className="btn update-btn red-btn">Adatok frissítése</button>
                </div>




            </form>
        </div>
    );
};

export default UpdateOwnDatas;
