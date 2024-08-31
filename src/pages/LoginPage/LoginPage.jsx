import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import LoginForm from '../../components/LoginComponents/LoginForm/LoginForm';
import ForgetPassword from '../../components/LoginComponents/ForgetPassword//ForgetPassword';
import Registration from '../../components/LoginComponents/Registration/Registration'
import './LoginPage.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { category } = useParams();


  

  let content;

  if (category === 'bejelentkezés') {
    content = <LoginForm
    title="Bejelentkezés"
      redirectPath={'/fiókom/saját-profil'}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
    />
  } else if (category === 'elfelejtett-jelszó') {
    content = <ForgetPassword />
  } else {
    content = <Registration
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}

    />

  }




  return (
    <div className='login-page'>
      <div className="container">
        {content}
      </div>
    </div>
  );
}

export default LoginPage;
