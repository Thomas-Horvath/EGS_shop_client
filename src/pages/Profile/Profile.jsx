import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner/Spinner';
import MyProfile from '../../components/ProfileComponents/MyProfile/MyProfile';
import UpdateOwnDatas from '../../components/ProfileComponents/UpdateOwnDatas/UpdateOwnDatas';
import MyOrders from '../../components/ProfileComponents/MyOrders/MyOrders';
import ChangePassword from '../../components/ProfileComponents/ChangePassword/ChangePassword';
import UpdateAdresses from '../../components/ProfileComponents/UpdateAddresses/UpdateAdresses';
import OneOrderDetails from '../../components/ProfileComponents/OnrOrderDetails/OneOrderDetails';

import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [isPending, setPending] = useState(false);
  const navigate = useNavigate();


 
  const { category , orderId } = useParams();

  function fetchProfile() {
    const token = sessionStorage.getItem('token');
    return fetch('https://thomasapi.eu/api/profile', {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
      },
      mode: "cors"
    })
      .then(res => res.json())
      .then(setProfile)

  };


  useEffect(() => {
    setPending(true);
    fetchProfile().finally(() => {
      setPending(false);
    });
  }, [])

  const handleBackClick = () => {
    navigate(`/fiókom/saját-profil`);
  }
  const handleBackOrderClick = () => {
    navigate(`/fiókom/rendeléseim`);
  }

  const handleProfileUpdate = () => {
    // Function to refresh profile data
    fetchProfile();
  };

  let content;

  if (category === "saját-profil") {
    content = isPending ? <Spinner /> :
      <>
        <MyProfile profile={profile} />
      </>
  } else if (category === "rendeléseim") {
    content = <>
      <MyOrders profile={profile} />
      <div className="btn-container">
        <button className="btn back-btn red-btn" onClick={handleBackClick}>
          Vissza a Profilhoz
        </button>
      </div>
    </>

  } else if (category === "címeim") {
    content = <UpdateAdresses profile={profile} onUpdate={handleProfileUpdate} handleBackClick={handleBackClick}/>
  } else if (category === "szerkesztés") {
    content =  <UpdateOwnDatas profile={profile}  handleBackClick={handleBackClick}/>
  } else if (category === "jelszóváltoztatás") {
    content = <ChangePassword username={profile.UserName} email={profile.EmailAddress} handleBackClick={handleBackClick} />
  } else if (category === "rendelésem" && orderId ) {
    content = <> <OneOrderDetails orderId={orderId} profile={profile}/>
      <div className="btn-container">
        <button className="btn back-btn red-btn" onClick={handleBackOrderClick}>
          Vissza a rendelésekhez
        </button>
      </div>
    </>
  }





  return (
    <div className='profile w1400'>
      {content}
    </div>
  )
}

export default Profile;