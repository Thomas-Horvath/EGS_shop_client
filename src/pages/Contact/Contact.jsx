import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Itt jelenleg csak egy sikeres üzenet jelenik meg, mivel az adatokat nem küldjük sehova.
    setResponseMessage('Sikeres üzenet küldve!');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='contact-container w1400'>
      <div className='contact-info'>
        <ul>
          <li><FaMapMarkerAlt />
            <div className="li-details">
              <strong>Cím:</strong>
              <p>1035 Budapest Bárhol utca 6.</p>
            </div>
          </li>


          <li><FaPhoneAlt />
            <div className="li-details">
              <strong>Telefon:</strong>
              <p>06 20 123 4567</p>
            </div>
          </li>


          <li><FaEnvelope />
            <div className="li-details">
              <strong>Email:</strong>
              <p>info@egs.hu</p>
            </div>
          </li>

          <li><FaClock />
            <div className="li-details">
              <strong>Nyitvatartás:</strong>
              <p>H-P 10:00-18:00</p>
              <p>Sz 10:00-14:00</p>
            </div>
          </li>
        </ul>
      </div>
      <div className='contact-form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Név:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder='Név'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder='példa@gmail.com'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='phone'>Telefonszám:</label>
            <input
              type='text'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder='+3620/123-4567'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Üzenet:</label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder='Üzenet'
            />
          </div>
          <div className='response-message'>
            {responseMessage && <p>{responseMessage}</p>}
          </div>
          <button className='red-btn contact-btn' type='submit'>Küldés</button>
        </form>
      </div>
    </div >
  );
};

export default Contact;
