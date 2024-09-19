import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import LoginAlert from '../../../components/LoginAlert/LogonAlert';
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { jwtDecode } from 'jwt-decode';


const LoginForm = ({ showPassword, setShowPassword, redirectPath, title }) => {

  const [errors, setErrors] = useState({});
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageAlert, setMessageAlert] = useState('');

  const navigate = useNavigate();


  const { login } = useContext(AuthContext);
  const validateForm = () => {
    let errors = {};
    if (!userName) errors.userName = 'A felhasználónév kitöltése kötelező.';
    if (!password) errors.password = 'A jelszó kitöltése kötelező.';
    return errors;
  };


  const handleLogin = async (e) => {
    e.preventDefault(); // Ne töltse újra az oldalt

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await fetch('https://thomasapi.eu/api/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        mode: "cors",
        body: JSON.stringify({
          "UserName": userName,
          "Password": password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Bejelentkezés sikertelen');
      }

      const data = await response.json();
     

      // Ha van token a válaszban
      if (data.token) {
        // Token dekódolása
        const decodedToken = jwtDecode(data.token);

     
        // Ellenőrizzük az activeFlag értékét
        if (!decodedToken.ActiveFlag) {
          setMessageAlert('A fiókja inaktív. Kérem lépjen velünk kapcsolatba!');
          return;
        }

        // Mentsük el a sessionStorage-be
        login(data.token);
        navigate(redirectPath || '/fiókom/saját-profil');
      } else {
        // Hiba kezelése, pl. hibás bejelentkezési adatok
        setMessage('Bejelentkezés sikertelen');
      }
    } catch (error) {
      setMessage(error.message || 'Hiba történt a bejelentkezés során.');

    }
  };

  return (
    <>
      { messageAlert && <LoginAlert message={messageAlert} /> }
      <form onSubmit={handleLogin} method='POST' noValidate>
        <h1 className="heading">{title}</h1>
        <hr />
        <label className='loginpage-label' htmlFor="email">Felhasználó név:</label>
        <input
          className='loginpage-input'
          id="email"
          type="text"
          name='userName'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Felhasználónév"

        />
        {errors.userName && <p className="error-text">{errors.userName}</p>}
        <label className='loginpage-label' htmlFor="password">Jelszó:</label>
        <div className="password-container">
          <input
            className={`loginpage-input ${errors.password ? 'input-error' : ''}`}
            id="password"
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='eye-icon-btn' type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <IoEyeOffSharp /> : <IoEye />}
          </button>
        </div>
        {errors.password && <p className="error-text">{errors.password}</p>}

        {message && <p className='error-message'>{message}</p>}

        <Link className="link" to="/profil/elfelejtett-jelszó">Elfelejtett jelszó</Link>
        <div className="btn-container">
          <button className='btn loginpage-btn main-btn' type='submit'>Bejelentkezés</button>
        </div>

        <hr />
        <p className='register-text'>
          Nincs profilje?{' '}
          <Link className="link" to="/profil/regisztráció">Regisztráció</Link>
        </p>
      </form>
    </>
  )
}

export default LoginForm;