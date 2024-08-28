import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/profil/bejelentkezés')
    }


    return (
        <>
            <form onSubmit={(e) => e.preventDefault}>
                <h1 className="heading">Elfelejtett jelszó</h1>
                <hr />
                <label className='loginpage-label' htmlFor="email">Adja meg a regisztrált email címét:</label>
                <input
                    className='loginpage-input'
                    id="email"
                    type="email"
                    name='email'
                    placeholder="Email címe"
                />
                <div className="btn-container forget">
                    <button className='forget-btn' onClick={handleClick}>Mégsem</button>
                    <button className='forget-btn' type='submit'>Új jelszó kérése</button>
                </div>
            </form>
        </>
    )
}

export default ForgetPassword;