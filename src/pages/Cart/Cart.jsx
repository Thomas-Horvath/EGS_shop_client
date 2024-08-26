import React, { useContext } from 'react';
import { useParams , Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

import './Cart.css'

const Cart = () => {
  const { category } = useParams();
  const { cartItems, removeFromCart, updateCartItemQuantity } = useContext(CartContext);

  const calculateTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
    return subtotal
  };
  const totalPrice = calculateTotalPrice();
  const shippingCost = totalPrice >= 25000 ? 0 : 2500;
  const amountNeededForFreeShipping = 25000 - totalPrice;


  let content;

  if (category === "kosár") {
    content = <div className="cart-container w1400">
      <h2>Kosár</h2>
      {cartItems.length === 0 ? (
        <p>A kosár üres.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.ProductID} className="cart-item">
                <img className='cart-product-img' src={item.ProductPhotoURL} alt="" />
                <span>{item.Name}</span>
                <span>{item.Price} Ft</span>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={item.quantity}
                  onChange={(e) => updateCartItemQuantity(item.ProductID, parseInt(e.target.value))}
                />
                <button onClick={() => removeFromCart(item.ProductID)}>Törlés</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            {totalPrice >= 25000 ?
              (<p>Szállítás: 0 Ft</p>) :
              (<p>Szállítás: +2500 Ft{" "}
              <span>(Ha még {amountNeededForFreeShipping.toFixed(2)} Ft értékben vásárolsz, a kiszállítás ingyen lesz!)</span></p>
              )}
            <p>Végösszeg:  {(totalPrice + shippingCost).toFixed(2)} Ft</p>
          </div>
          <Link to="/rendelés/pénztár"><button className="btn main-btn">Pénztár</button></Link>
        </div>
      )}
    </div>
  } else if (category === "pénztár") {
    content = <div className="orders w1400">
      <h2>Megrendelés</h2>
    </div>
  }





  return (

    <div className='cart'>{content}</div>
  )
}

export default Cart