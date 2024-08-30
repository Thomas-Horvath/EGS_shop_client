import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import Checkout from '../../components/Checkout/Checkout';
import './Cart.css';

const Cart = () => {
  const { category } = useParams();
  const { cartItems, removeFromCart, updateCartItemQuantity } = useContext(CartContext);

  const calculateTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
    return subtotal;
  };

  const totalPrice = calculateTotalPrice();
  const shippingCost = totalPrice >= 25000 ? 0 : 2500;
  const amountNeededForFreeShipping = 25000 - totalPrice;

  const incrementQuantity = (productId) => {
    const item = cartItems.find(item => item.ProductID === productId);
    if (item && item.quantity < 20) {
      updateCartItemQuantity(productId, item.quantity + 1);
    }
  };

  const decrementQuantity = (productId) => {
    const item = cartItems.find(item => item.ProductID === productId);
    if (item && item.quantity > 1) {
      updateCartItemQuantity(productId, item.quantity - 1);
    }
  };

  const handleQuantityChange = (e, productId) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 20) {
      updateCartItemQuantity(productId, value);
    } else if (value < 1) {
      updateCartItemQuantity(productId, 1);
    } else if (value > 20) {
      updateCartItemQuantity(productId, 20);
    }
  };

  let content;

  if (category === "kosár") {
    content = (
      <div className="cart-container w1400">
        <div className="profile-container">
          <h2>Kosár</h2>
          {cartItems.length === 0 ? (
            <p>A kosár üres.</p>
          ) : (
            <div>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Termék neve</th>
                    <th>Ár</th>
                    <th>Darabszám</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.ProductID} className="cart-item">
                      <td className="cart-product-info">
                        <img className='cart-product-img' src={item.ProductPhotoURL} alt={item.Name} />
                        <div className="cart-product-details">
                          <span className="brand-name">{item.BrandName}</span>
                          <span className="product-name">{item.Name}</span>
                        </div>
                      </td>
                      <td>{item.Price} Ft</td>
                      <td>
                        <div className="quantity-container">
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={item.quantity}
                            min="1"
                            max="20"
                            onChange={(e) => handleQuantityChange(e, item.ProductID)}
                          />
                          <div className="quantity-btn-groupe">
                            <button onClick={() => incrementQuantity(item.ProductID)} className="increment">+</button>
                            <button onClick={() => decrementQuantity(item.ProductID)} className="decrement">-</button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <button className='btn delete-btn main-btn' onClick={() => removeFromCart(item.ProductID)}>Törlés</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="cart-summary">
                {totalPrice >= 25000 ? (
                  <p>Szállítás: 0 Ft</p>
                ) : (
                  <p>Szállítás: +2500 Ft{" "}
                    <span>(Ha még {amountNeededForFreeShipping.toFixed(2)} Ft értékben vásárolsz, a kiszállítás ingyen lesz!)</span></p>
                )}
                <p>Végösszeg: {(totalPrice + shippingCost).toFixed(2)} Ft</p>
              </div>
              <div className="cart-buttons">
                <Link to="/rendelés/pénztár">
                  <button className="btn main-btn checkout-btn">Pénztár</button>
                </Link>
                <Link to="/">
                  <button className="btn main-btn continue-shopping-btn">Vásárlás folytatása</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else if (category === "pénztár") {
    content = <Checkout cartItems={cartItems} totalPrice={totalPrice} shippingCost={shippingCost} />;
  }

  return (
    <div className='cart'>{content}</div>
  );
};

export default Cart;