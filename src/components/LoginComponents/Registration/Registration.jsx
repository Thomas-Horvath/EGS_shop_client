import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { IoEye , IoEyeOffSharp} from "react-icons/io5";

const Registration = (props) => {
    const {showPassword ,setShowPassword,showConfirmPassword, setShowConfirmPassword} = props;
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        lastName: '',
        firstName: '',
        check: false
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
 

    const handleInputChange = (e) => {
        // e.preventDefault();
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.userName) errors.userName = 'A felhasználónév kitöltése kötelező.';
        if (!formData.email) errors.email = 'Az email cím kitöltése kötelező.';
        if (!formData.lastName) errors.lastName = 'A vezetéknév kitöltése kötelező.';
        if (!formData.firstName) errors.firstName = 'A keresztnév kitöltése kötelező.';
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailPattern.test(formData.email)) errors.email = 'Az email cím formátuma helytelen.';
        if (!formData.password) errors.password = 'A jelszó kitöltése kötelező.';
        if (formData.password && formData.password.length < 6) errors.password = 'A jelszónak legalább 6 karakter hosszúnak kell lennie.';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'A két jelszó nem egyezik.';
        if (!formData.check) errors.check = 'Kötelező elfogadni az adatvédelmi tájékoztatót.';
        return errors;
    };

    const handleRegistrationSuccess = () => {
        setTimeout(() => {
            navigate('/profil/bejelentkezés');
        }, 1000); 
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const userData = {
            UserName: formData.userName,
            Password: formData.password,
            LastName: formData.lastName,
            FirstName: formData.firstName,
            EmailAddress: formData.email
        };

        fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            mode: "cors",
            body: JSON.stringify(userData)
        })
            .then(res => {
                if (!res.ok) {
                    // Ha a válasz nem 'ok', dobunk egy hibát a szerver üzenetével
                    return res.json().then(errorData => {
                        throw new Error(errorData.message || 'Valami hiba történt');
                    });
                }
                return res.json();
            })
            .then(data => {
                // Sikeres regisztráció esetén üzenet megjelenítése
                setMessage('Sikeres regisztráció!');
                handleRegistrationSuccess();
            })
            .catch(error => {
                // Hibás regisztráció esetén hibaüzenet megjelenítése
                setMessage(error.message || 'Hiba történt a regisztráció során.');
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit} noValidate method='POST'>
                <h1 className="heading">Regisztráció</h1>
                <hr />
                <label className='loginpage-label' htmlFor="userName">Felhasználó név:</label>
                <input
                    className={`loginpage-input ${errors.userName ? 'input-error' : ''}`}
                    id="userName"
                    type="text"
                    name='userName'
                    placeholder="Felhasználónév"
                    value={formData.userName}
                    onChange={handleInputChange}
                />
                {errors.userName && <p className="error-text">{errors.userName}</p>}

                <label className='loginpage-label' htmlFor="email">Email Cím:</label>
                <input
                    className={`loginpage-input ${errors.email ? 'input-error' : ''}`}
                    id="email"
                    type="email"
                    name='email'
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}

                <label className='loginpage-label' htmlFor="firstName">Keresztnév:</label>
                <input
                    className={`loginpage-input ${errors.firstName ? 'input-error' : ''}`}
                    id="firstName"
                    type="text"
                    name='firstName'
                    placeholder="Keresztnév"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                {errors.firstName && <p className="error-text">{errors.firstName}</p>}

                <label className='loginpage-label' htmlFor="lastName">Vezetéknév:</label>
                <input
                    className={`loginpage-input ${errors.lastName ? 'input-error' : ''}`}
                    id="lastName"
                    type="text"
                    name='lastName'
                    placeholder="Vezetéknév"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                {errors.lastName && <p className="error-text">{errors.lastName}</p>}

                <label className='loginpage-label' htmlFor="password">Jelszó:</label>
                <div className="password-container">
                    <input
                        className={`loginpage-input ${errors.password ? 'input-error' : ''}`}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder="Jelszó"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <button className='eye-icon-btn' type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <IoEyeOffSharp />  : <IoEye />}
                    </button>
                </div>
                {errors.password && <p className="error-text">{errors.password}</p>}

                <label className='loginpage-label' htmlFor="confirmPassword">Jelszó ismét:</label>
                <div className="password-container">
                    <input
                        className={`loginpage-input ${errors.confirmPassword ? 'input-error' : ''}`}
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name='confirmPassword'
                        placeholder="Jelszó újra"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <button className='eye-icon-btn' type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <IoEyeOffSharp />  : <IoEye />}
                    </button>
                </div>
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

                <div className="checkbox-container">
                    <input
                        type='checkbox'
                        id='check'
                        name='check'
                        checked={formData.check}
                        onChange={handleInputChange}
                    />
                    <label className='loginpage-label chackbox-label' htmlFor="check">
                        Elolvastam és megértettem az
                        <Link className="link" to="/adatvédelem"> Adatvédelmi Tájékoztató</Link>
                        tartalmát!
                    </label>
                    {errors.check && <p className="error-text">{errors.check}</p>}
                </div>

                <div className="btn-container">
                    <button className='btn loginpage-btn main-btn' type='submit'>Regisztráció</button>
                </div>

                {message && <p className={`message ${message === 'Sikeres regisztráció!' ? 'success' : 'error-message'}`}>{message}</p>}

                <p className='register-text'>
                    Már van profilja?{' '}
                    <Link className="link" to="/profil/bejelentkezés">Jelentkezzen be</Link>
                </p>
            </form>
        </>
    );
}

export default Registration;
