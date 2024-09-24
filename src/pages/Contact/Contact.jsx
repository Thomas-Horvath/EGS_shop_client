import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { parsePhoneNumber } from 'libphonenumber-js';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const { errors, formattedData } = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormData(formattedData);

    // Itt jelenleg csak egy sikeres üzenet jelenik meg, mivel az adatokat nem küldjük sehova.
    setResponseMessage('Sikeres üzenet küldve!');

    // ez a lesz a fetch küldés:
    console.table('Az emailben küldött adatok: ',formattedData);



    // A form mezőinek resetelése
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });

    // Az üzenet eltüntetése 3 másodperc múlva
    setTimeout(() => {
      setResponseMessage('');
    }, 2000);
  };

  const validateForm = () => {
    let errors = {};
    let formattedData = { ...formData };


    // Telefonszám ellenőrzése
    if (!formData.phone.trim()) {
      errors.phone = 'Kérlek, adj meg egy telefonszámot.';
    } else {
      try {
        const phoneNumber = parsePhoneNumber(formData.phone, 'HU');

        if (!phoneNumber.isValid()) {
          errors.phone = 'Kérlek, adj meg egy érvényes telefonszámot.';
        } else {
          formattedData.phone = phoneNumber.formatInternational(); // A formázott adatot itt mentjük el
        }
      } catch (error) {
        errors.phone = 'Hiba történt a telefonszám ellenőrzésekor.';
      }
    }

    if (!formData.name) errors.name = 'A név kitöltése kötelező.';
    if (!formData.email) errors.email = 'Az email kitöltése kötelező.';
    if (!formData.message) errors.message = 'Az üzenet kitöltése kötelező.';

    return { errors, formattedData };
  };




  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: undefined // Törlés
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
        <form onSubmit={handleSubmit} method='POST'>
          <div className='form-group'>
            <label htmlFor='name'>Név:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Név'
            />
            {formErrors.name && <p className="error-message">{formErrors.name}</p>}
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='példa@gmail.com'
            />
            {formErrors.email && <p className="error-message">{formErrors.email}</p>}
          </div>
          <div className='form-group'>
            <label htmlFor='phone'>Telefonszám:</label>
            <input
              type='text'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              placeholder='+36 20 123 4567'
            />
            {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Üzenet:</label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleInputChange}
              placeholder='Üzenet'
            />
            {formErrors.message && <p className="error-message">{formErrors.message}</p>}
          </div>
          <div className='response-message'>
            {responseMessage && <p>{responseMessage}</p>}
          </div>
          <button className='red-btn contact-btn' type='submit'>Küldés</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
