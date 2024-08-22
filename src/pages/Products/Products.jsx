import React, { useEffect, useState } from 'react';
import './Products.css';
import { Spinner } from '../../components/Spinner/Spinner'
import Card from '../../components/ProductCard/ProductCard'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isPending, setPending] = useState(false);

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


  useEffect(() => {
    setPending(true);
    fetchProduct().finally(() => {
      setPending(false);
    });
  }, [])


console.log(products)

  return (
    <div className='products'>
      <section className="product-container w1400">
        <aside className="filter-container">
          <p>Itt lesznek a szűrő gombok</p>
        </aside>
        <div className="product-card-container">
          {(isPending) ? <Spinner /> :
            products.slice(0, 20).map(product => (
              <Card key={product.ProductID} title={product.Name} imgPath={product.ProductPhotoURL} price={product.Price} />
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default Products;