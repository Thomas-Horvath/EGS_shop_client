import React, { useState, useEffect } from 'react';

const UpdateAddresses = ({ profile, onUpdate , handleBackClick}) => {
    const [postcode, setPostcode] = useState(profile.Postcode || '');
    const [city, setCity] = useState(profile.City || '');
    const [address, setAddress] = useState(profile.Address || '');
    const [shippingPostcode, setShippingPostcode] = useState(profile.ShippingPostcode || '');
    const [shippingCity, setShippingCity] = useState(profile.ShippingCity || '');
    const [shippingAddress, setShippingAddress] = useState(profile.ShippingAddress || '');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const token = sessionStorage.getItem('token'); // Token lekérése a sessionStorage-ből

    useEffect(() => {
        // Update local state if profile prop changes
        setPostcode(profile.Postcode || '');
        setCity(profile.City || '');
        setAddress(profile.Address || '');
        setShippingPostcode(profile.ShippingPostcode || '');
        setShippingCity(profile.ShippingCity || '');
        setShippingAddress(profile.ShippingAddress || '');
    }, [profile]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://thomasapi.eu/api/profileupdate', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                },
                mode: "cors",
                body: JSON.stringify({
                    "UserName": profile.UserName,
                    "EmailAddress": profile.EmailAddress,
                    "Postcode": postcode,
                    "City": city,
                    "Address": address,
                    "ShippingPostcode": shippingPostcode,
                    "ShippingCity": shippingCity,
                    "ShippingAddress": shippingAddress,
                })
            });

            if (response.ok) {
                setSuccessMessage('A címadatok sikeresen módosítva!');
                setErrorMessage('');
                onUpdate(); // Notify the Profile component to refresh data
            } else {
                setErrorMessage('Hiba történt a címadatok módosítása során.');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Hálózati hiba történt.');
            setSuccessMessage('');
        }
    };

    return (
        <div className='main-container'>
            <h1>Címadatok módosítása</h1>
            <div className="form-container">
                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor="postcode">Irányítószám</label>
                    <input
                        type="text"
                        id="postcode"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                    />
                    <label htmlFor="city">Város</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label htmlFor="address">Cím</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label htmlFor="shippingPostcode">Szállítási irányítószám</label>
                    <input
                        type="text"
                        id="shippingPostcode"
                        value={shippingPostcode}
                        onChange={(e) => setShippingPostcode(e.target.value)}
                    />
                    <label htmlFor="shippingCity">Szállítási város</label>
                    <input
                        type="text"
                        id="shippingCity"
                        value={shippingCity}
                        onChange={(e) => setShippingCity(e.target.value)}
                    />
                    <label htmlFor="shippingAddress">Szállítási cím</label>
                    <input
                        type="text"
                        id="shippingAddress"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <div className="btn-container">
                    <button className="btn back-btn red-btn" onClick={handleBackClick} >Vissza a Profilhoz</button>
                        <button className='btn red-btn' type="submit">Mentés</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateAddresses;
