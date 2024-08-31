import React, { createContext, useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Betöltjük a kosár adatait a localStorage-ból, ha létezik
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const navigate = useNavigate();


  const handleCheckoutClick = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/rendelés/pénztár');
    } else {
      navigate('/rendelés/bejelentkezés');
    }
  };

  // Kosár adatok mentése a localStorage-ba
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // cartitems kulcsal mentjük json stringé alakítva a kosárban lévő adatokat
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      // Ellenőrizzük, hogy az adott termék már benne van-e a kosárban
      const existingProduct = prevItems.find(item => item.ProductID === product.ProductID);
      if (existingProduct) {
        // Ha már benne van, növeljük a quantity mennyiséget a kapott darabszámmal
        return prevItems.map(item =>
          item.ProductID === product.ProductID
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Ha még nincs benne, hozzáadjuk a kosárhoz a kapott darabszámmal
        return [...prevItems, { ...product, quantity }];
      }
    });
  };



  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.ProductID !== itemId));
  };



  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems(cartItems.map(item =>
      item.ProductID === productId
        ? { ...item, quantity }
        : item
    ));
  };

  

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart , clearCart, updateCartItemQuantity , handleCheckoutClick}}>
      {children}
    </CartContext.Provider>
  );
};
