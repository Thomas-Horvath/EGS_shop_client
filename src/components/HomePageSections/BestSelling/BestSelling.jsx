import React, {useState, useEffect, useContext } from 'react';
import './BestSelling.css';
import Card from '../../ProductCard/ProductCard';
import { CartContext } from '../../../contexts/CartContext';
import{ Spinner } from '../../Spinner/Spinner';




const BestSelling = () => {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [isPending, setPending] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

  // Api hívás
  function fetchProduct() {
    return fetch('https://thomasapi.eu/api/products', {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      mode: "cors"
    })
      .then(res => res.json())
      .then(setProducts);
  }

  // a spinner megjelenítése és eltüntetése
  useEffect(() => {
    setPending(true);
    fetchProduct().finally(() => {
      setPending(false);
    });
  }, []);

    // Termékek szűrése "OnSale" alapján
    useEffect(() => {
        setFilteredProducts(products.filter(product => product.OnSale === true));
    }, [products]);


  return (
    <div>
        <div className="best-selling-products w1400">
        <h2 className='home-sections-heading'>Kiemelt ajánlataink, akciók</h2>
     
            <div className="product-card-container best-selling-container">
            {(isPending) ? <Spinner /> : filteredProducts.slice(0, 8).map(product => (
              <Card
                key={product.ProductID}
                product={product}
                onAddToCart={() => addToCart(product,1)}
              />
            ))
            }
            </div>
        </div>
    </div>
  )
}

export default BestSelling
