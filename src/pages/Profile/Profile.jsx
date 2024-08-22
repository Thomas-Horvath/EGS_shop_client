import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner/Spinner'
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [isPending, setPending] = useState(false);

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

  let content;

  if (category === "saját-profil") {
    content =  isPending ? <Spinner /> : 
      <ul>
        <li>{profile.LastName + ' ' + profile.FirstName}</li>
        <li>{profile.EmailAddress}</li>
      </ul>
  } else if ( category === "kijelentkezés") {
   content =  <div>Kijelentkezve</div>
  }




return (
  <div className='profile'>
    {content}
  </div>
)
}

export default Profile;