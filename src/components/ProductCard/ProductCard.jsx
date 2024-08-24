import React from 'react';
import './ProductCard.css';

const ProductCard = (props) => {
  const { imgPath, title, price, SalePrice ,  onAddToCart} = props
  return (
    <div className='card'>
      <div className="top">
        <img src={imgPath} alt="Termék fotó" />
      </div>
      <div className="bottom">
        <h2>{title}</h2>
        <p>
          {SalePrice > 0 ? (
            <>
              <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>{price} FT</span>
              <span style={{ color: 'red', fontWeight: 'bold' }}>{SalePrice} FT</span>
            </>
          ) : (
            <span>{price} Ft</span>
          )}
        </p>
        <button className='btn' onClick={onAddToCart}>Kosárba</button>
      </div>
    </div>


  )
}

export default ProductCard;