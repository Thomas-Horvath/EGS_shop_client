import React from 'react';
import { Link } from 'react-router-dom'
import './ProductCard.css';
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = (props) => {
  const { onAddToCart, product } = props
  return (
    <div className='card'>
      <div className="top">
      {product.OnSale ?  <div className="sale-sticker">
          Akció
        </div> : ""}
       
        <Link to={`/termékadatok/${product.ProductID}`}> <img src={product.ProductPhotoURL} alt="Termék fotó" /></Link>
      </div>
      <div className="bottom">
        <h3>{product.Name}</h3>
        <p className='instock' style={product.InStock ? { color: "green" } : { color: "red" }}>{product.InStock === true ? "Raktáron" : "Rendelésre"}</p>
      </div>
      <p className='price'>
        {product.SalePrice > 0 ? (
          <>
            <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>{product.Price} FT</span>
            <span style={{ color: 'red', fontWeight: 'bold' }}>{product.SalePrice} FT</span>
          </>
        ) : (
          <span>{product.Price} Ft</span>
        )}
      </p>
      <button className='btn product-card-btn main-btn' onClick={onAddToCart}><FaShoppingCart /> Kosárba</button>
    </div>


  )
}

export default ProductCard;