import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OneOrderDetails = ({profile}) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Lekérjük a rendelést az orderId alapján
        const orderResponse = await fetch(`https://thomasapi.eu/api/order/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
          },
          mode: "cors"
        });
        if (!orderResponse.ok) {
          throw new Error('Rendelés nem található!');
        }
        const orderData = await orderResponse.json();
        setOrder(orderData);

        // Lekérjük a termékek adatait
        const productPromises = orderData.OrderItems.map(async (item) => {
          const productResponse = await fetch(`https://thomasapi.eu/api/product/${item.ProductID}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              "Authorization": `Bearer ${token}`
            },
            mode: "cors"
          });
          if (!productResponse.ok) {
            throw new Error('Termék nem található!');
          }
          return productResponse.json();
        });

        const productResults = await Promise.all(productPromises);
        setProducts(productResults);
      } catch (error) {
        setError(error.message || 'Hiba történt a rendelés részleteinek betöltése során.');
      }
    };

    fetchOrderDetails();
  }, [orderId, token]);

  if (error) {
    return (
      <div className="profile-container">
        <h1>Rendelés Részletei</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="profile-container">
        <h1>Rendelés Részletei</h1>
        <p>Betöltés...</p>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h1>Rendelés Részletei</h1>
      <div className="order-details">

        <h2>Rendelés Azonosító: {order.OrderID}</h2>
        <p>Vevő: {profile.LastName} {profile.FirstName}</p>
        <p>Szállítás: {order.DeliveryTypeID === 1 ? "Szállítás futárral" : ""}  </p>
        <p>Összesen: {order.TotalDue} Ft</p>
        <p>Dátum: {new Date(order.OrderDate).toLocaleDateString('hu-HU')}</p>
        <h3>Termékek</h3>
        <ul>
          {order.OrderItems.map((item, index) => (
            <li key={index}>
              <p>Termék ID: {item.ProductID}</p>
              <p>Darabszám: {item.Quantity}</p>
              <p>Egységár: {item.UnitPrice} Ft</p>
              <p>Összeg: {item.LineTotal} Ft</p>
              <div>
                <h4>Termék Részletek</h4>
                {products[index] && (
                  <div>
                    <p>Név: {products[index].Name}</p>
                    <p>Ár: {products[index].Price} Ft</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OneOrderDetails;
