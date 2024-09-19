import React from 'react';
import './LoginAlert.css';
import { useNavigate } from 'react-router-dom';



const LoginAlert = ({ message }) => {
    const navigate = useNavigate();


    const handleContact = () => {
        navigate('/kapcsolat')
    }
    const handleUnderstand = () => {
        navigate('/')
    }




    return (
        <div className="confirm-dialog-overlay">
            <div className="confirm-dialog">
                <p>{message}</p>
                <div className="button-group">
                    <button className="confirm-button" onClick={handleUnderstand}>Értem</button>
                    <button className="confirm-button" onClick={handleContact}>Kapcsolat</button>
                </div>
            </div>
        </div>
    );
};

export default LoginAlert;
