import React, { createContext, useState , useEffect} from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Betöltjük a kosár adatait a localStorage-ból, ha létezik
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Kosár adatok mentése a localStorage-ba
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // cartitems kulcsal mentjük json stringé alakítva a kosárban lévő adatokat
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Ellenőrizzük, hogy az adott termék már benne van-e a kosárban
      const existingProduct = prevItems.find(item => item.ProductID === product.ProductID);
      if (existingProduct) {
        // Ha már benne van, növeljük a quantity mennyiséget egyel
        return prevItems.map(item =>
          item.ProductID === product.ProductID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Ha még nincs benne, hozzáadjuk a kosárhoz egy darab mennyiséggel
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };



  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.ProductID !== itemId));
  };


  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart , clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
