import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyOrders.css'


const MyOrders = ({ profile }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://thomasapi.eu/api/ownorders', {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
          },
          mode: "cors"
        });

        if (response.status === 404) {
          throw new Error('Még nincsenek rendeléseim!');
        }

        const data = await response.json();
        if (data.ownOrders && Array.isArray(data.ownOrders)) {
          setOrders(data.ownOrders);
        } else {
          throw new Error('Érvénytelen adatok formátuma.');
        }
      } catch (error) {
        setError(error.message || 'Hiba történt a rendelések betöltése során.');
      }
    };

    fetchOrders();
  }, [token]);

  if (error) {
    return <div className="main-container">
      <h1>Saját Rendeléseim</h1> 
      <div className="table-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Rendelés azonosító</th>
            <th>Vevő</th>
            <th>Termékek száma</th>
            <th>Összesen</th>
            <th>Dátum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="6" >{error}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  }


  const handleOrderDetails = (orderId) => {
    navigate(`/fiókom/rendelésem/${orderId}`);
  };

 
  return (
    <div className="main-container">
      <h1>Saját Rendeléseim</h1>
      <div className="table-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Rendelés azonosító</th>
            <th>Vevő</th>
            <th>Termékek száma</th>
            <th>Összesen</th>
            <th>Dátum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>#{order.OrderID}</td>
              <td>{profile.LastName} {profile.FirstName} </td>
              <td>{order.OrderItems.length}</td>
              <td>{order.TotalDue} Ft</td>
              <td>{new Date(order.OrderDate).toLocaleDateString('hu-HU')}</td>
              <td>
                <button
                  className="main-btn"
                  onClick={() => handleOrderDetails(order.OrderID)}
                >
                  Részletek
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default MyOrders;
