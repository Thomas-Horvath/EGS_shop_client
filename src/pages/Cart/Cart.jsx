import React from 'react';
import { useParams } from 'react-router-dom';

import './Cart.css'

const Cart = () => {
  const { category } = useParams();



  let content;

  if (category === "kosár") {
    content = <div className="cart-container w1400">
      <h2>Kosár</h2>
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