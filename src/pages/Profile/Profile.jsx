import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner/Spinner';
import MyProfile from '../../components/ProfileComponents/MyProfile/MyProfile';
import UpdateOwnDatas from '../../components/ProfileComponents/UpdateOwnDatas/UpdateOwnDatas';
import MyOrders from '../../components/ProfileComponents/MyOrders/MyOrders';

import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [isPending, setPending] = useState(false);
  const navigate = useNavigate();

  const { category } = useParams();

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
        <button className="btn back-btn main-btn" onClick={handleBackClick}>
          Vissza a Profilhoz
        </button>
      </div>
    </>

  } else if (category === "címeim") {
    content = <div className="orders w1400">
      <h2>Címeim</h2>
    </div>
  } else if (category === "szerkesztés") {

    content = <>
      <UpdateOwnDatas profile={profile} />
      <div className="btn-container">
        <button className="btn back-btn main-btn" onClick={handleBackClick}>
          Vissza a Profilhoz
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