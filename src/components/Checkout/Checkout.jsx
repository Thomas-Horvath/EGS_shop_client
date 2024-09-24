import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';



const Checkout = ({ cartItems, totalPrice, shippingCost }) => {
    const [profile, setProfile] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [postcode, setPostcode] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const { clearCart } = useContext(CartContext); // Kosár ürítése
    const navigate = useNavigate(); // Navigáláshoz szükséges hook
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('https://thomasapi.eu/api/profile', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    mode: "cors",
                });

                const data = await response.json();

                if (response.ok) {
                    setProfile(data);
                    setCustomerName(data.LastName + ' ' + data.FirstName || '');


                    // Címadatok beállítása: először a Shipping adatok, ha nincs, akkor a normál cím adatok
                    setPostcode(data.ShippingPostcode || data.Postcode || '');
                    setCity(data.ShippingCity || data.City || '');
                    setAddress(data.ShippingAddress || data.Address || '');

                } else {
                    setErrorMessage('Nem sikerült betölteni a profil adatokat.');
                }
            } catch (error) {
                setErrorMessage('Hálózati hiba történt a profil betöltésekor.');
            }
        };

        fetchProfile();
    }, [token]);

    const validateForm = () => {
        let errors = {};
        if (!customerName) errors.customerName = 'A név kitöltése kötelező.';
        if (!postcode) errors.postcode = 'Az irányítószám kitöltése kötelező.';
        if (!city) errors.city = 'A város kitöltése kötelező.';
        if (!address) errors.address = 'A cím kitöltése kötelező.';
        return errors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        setFormErrors({});

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Kosár ellenőrzése
        if (cartItems.length === 0) {
            setErrorMessage('A rendelés leadásához legalább egy termék szükséges a kosárban.');
            return;
        }

        if (!profile) {
            setErrorMessage('Nem sikerült betölteni a profil adatokat, így a rendelést nem lehet leadni.');
            return;
        }




        const orderItems = cartItems.map(item => ({
            ProductID: item.ProductID,
            Quantity: item.quantity,
            UnitPrice: item.Price,
            LineTotal: item.Price * item.quantity,
        }));

        const orderData = {
            CustomerID: profile.UserID,
            OrderStatus: "Pending",
            SubTotal: totalPrice,
            Freight: shippingCost,
            DeliveryTypeID: 1,
            TotalDue: totalPrice + shippingCost,
            Comment: comment,
            OrderItems: orderItems,
            ShippingPostcode: postcode,
            ShippingCity: city,
            ShippingAddress: address
        };

        try {
            const response = await fetch('https://thomasapi.eu/api/order', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                },
                mode: "cors",
                body: JSON.stringify(orderData)
            });

            //   const data = await response.json();

            if (response.ok) {
                setSuccessMessage('A rendelés sikeresen leadva!');
                setErrorMessage('');
                clearCart(); // Kosár ürítése
                setTimeout(() => {
                    navigate('/fiókom/rendeléseim'); // Átirányítás a Rendeléseim oldalra
                }, 1000);
            } else {
                setErrorMessage('Hiba történt a rendelés leadása során.');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Hálózati hiba történt.');
            setSuccessMessage('');
        }
    };


    const handleBackClick = () => {
        navigate(`/rendelés/kosár`);
    }

    if (!profile) {
        return (
            <div className="main-container w1400">
                <p>Profil adatainak betöltése...</p>
            </div>
        );
    }


    return (
        <div className="main-container w1400">
            <div className="profile-container">
                <h2>Megrendelés</h2>
                <div className="cart-page-content">
                    <form className='form'>

                        <label htmlFor="name">Név</label>
                        <input
                            type="text"
                            id="name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder='Név'
                        />
                        {formErrors.customerName && <p className="error-message">{formErrors.customerName}</p>}



                        <label htmlFor="postcode">Irányítószám</label>
                        <input
                            type="text"
                            id="postcode"
                            value={postcode}
                            placeholder="Irányítószám"
                            onChange={(e) => setPostcode(e.target.value)}
                        />
                        {formErrors.postcode && <p className="error-message">{formErrors.postcode}</p>}

                        <label htmlFor="city">Város</label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            placeholder="Város"
                            onChange={(e) => setCity(e.target.value)}
                        />
                        {formErrors.city && <p className="error-message">{formErrors.city}</p>}

                        <label htmlFor="address">Cím</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            placeholder="Cím"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {formErrors.address && <p className="error-message">{formErrors.address}</p>}

                        <label htmlFor="comment">Megjegyzés</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Megyjegyzés...'
                        />

                    </form>
                    <div className="cart-summary">
                        <h3>Termékek:</h3>
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.ProductID}>
                                    <strong>{item.BrandName} - {item.Name}</strong>
                                    <p>- {item.quantity} x {item.Price} Ft = {item.Price * item.quantity} Ft</p>
                                </li>
                            ))}
                        </ul>
                        <div className="amount-container">
                            <p><strong>Szállítási költség: </strong>{shippingCost} Ft</p>
                            <p className='total-amount'><strong>Végösszeg:</strong> {(totalPrice + shippingCost).toFixed(2)} Ft</p>
                        </div>
                    </div>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <div className="btn-container">
                    <button className="btn red-btn" onClick={handleBackClick}>Kosár</button>
                    <button className="btn red-btn" onClick={handleSubmit}>Rendelés leadása</button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
