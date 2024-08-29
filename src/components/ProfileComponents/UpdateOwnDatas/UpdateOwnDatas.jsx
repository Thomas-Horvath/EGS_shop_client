import React, { useState, useEffect } from 'react';
import './UpdateOwnDatas.css'

const UpdateOwnDatas = ({ profile }) => {
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
        const phonePattern = /^(?:\+36|06)\d{2}-\d{3}-\d{4}$/;
        if (formData.phoneNumber && !phonePattern.test(formData.phoneNumber)) {
            errors.phoneNumber = 'A telefonszám formátuma helytelen.';
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
            PhoneNumber: formData.phoneNumber,
            EmailAddress: formData.emailAddress,
        };
        const token = sessionStorage.getItem('token');
        fetch('https://thomasapi.eu/api/profileupdate', {
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
                setMessage('Sikeres frissítés!');
            })
            .catch(error => {
                setMessage(error.message || 'Hiba történt a frissítés során.');
            });
    };

    return (
        <div className="profile-container w1400">
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
                />
                {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}

                <label htmlFor="email">Email cím:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}

                <div className="btn-container">
                    <button type="submit" className="btn update-btn main-btn">Adatok frissítése</button>
                </div>

                {message && <p className={`message ${message === 'Sikeres frissítés!' ? 'success' : 'error-message'}`}>{message}</p>}
            </form>
        </div>
    );
};

export default UpdateOwnDatas;
