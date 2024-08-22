import React from 'react';
import './ProductCard.css';

const ProductCard = (props) => {
    const {imgPath , title , price } = props
  return (
    <div className='card'>
        <div className="top">
            <img src={imgPath} alt="Termék fotó" />
        </div>
        <div className="bottom">
            <h2>{title}</h2>
            <p>{price}</p>
            <button className='btn'>Kosárba</button>
        </div>
    </div>

  
  )
}

export default ProductCard;