import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext); // kontextus a bejelentkezéshez

  const { category } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ne töltse újra az oldalt

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

      const data = await response.json();
      console.log(data);

      // Ha van token a válaszban
      if (data.token) {
        // Mentsük el a sessionStorage-be
        login(data.token);

        // Navigálás a saját profil oldalra
        navigate('/fiókom/saját-profil');
      } else {
        // Hiba kezelése, pl. hibás bejelentkezési adatok
        console.error('Bejelentkezés sikertelen');
      }

    } catch (error) {
      console.error('Hiba történt a bejelentkezés során:', error);
    }
  };


  
  return (


    <div className='login-page'>
      {category === 'bejelentkezés' ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name='userName'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Felhasználónév"
          />
          <input
            type="password"
            name='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Jelszó"
          />
          <button className='btn' type='submit'>Bejelentkezés</button>
        </form>
      )
        :
        (
          <div>Regisztráció</div>
        )

      }
    </div>
  );
}

export default LoginPage;
