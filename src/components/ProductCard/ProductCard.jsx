import React from 'react';
import { Link } from 'react-router-dom'
import './ProductCard.css';

const ProductCard = (props) => {
  const {  onAddToCart, product } = props
  return (
    <div className='card'>
      <div className="top">
       <Link to={`/termékadatok/${product.ProductID}`}> <img src={product.ProductPhotoURL} alt="Termék fotó" /></Link>
      </div>
      <div className="bottom">
        <h2>{product.Name}</h2>
        <p>
          {product.SalePrice > 0 ? (
            <>
              <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>{product.Price} FT</span>
              <span style={{ color: 'red', fontWeight: 'bold' }}>{product.SalePrice} FT</span>
            </>
          ) : (
            <span>{product.Price} Ft</span>
          )}
        </p>
      </div>
      <button className='btn product-card-btn' onClick={onAddToCart}>Kosárba</button>
    </div>


  )
}

export default ProductCard;