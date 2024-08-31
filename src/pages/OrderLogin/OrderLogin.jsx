
import React, { useState } from 'react';
import LoginForm from '../../components/LoginComponents/LoginForm/LoginForm';

const OrderLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="main-container w1400">
            <div className="login-prompt">
                <div className="container">
                    <LoginForm
                        title="Kérlek jelentkezz be a folytatáshoz."
                        redirectPath="/rendelés/pénztár"
                        showPassword={showPassword}
                        setShowPassword={setShowPassword} />
                </div>
            </div>
        </div>
    )
}

export default OrderLogin