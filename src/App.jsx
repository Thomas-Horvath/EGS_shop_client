import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/HeaderSection/Header/Header';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products'
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import PreHeader from './components/HeaderSection/PreHeader/PreHeader'
import LoginPage from './pages/LoginPage/LoginPage';
import Info from './pages/Info/Info';
import Contact from './pages/Contact/Contact';
import Profile from './pages/Profile/Profile';
import OrderLogin from './pages/OrderLogin/OrderLogin';
import ScrollTop from './components/ScrollTop/ScrollTop';


import { AuthProvider } from './contexts/AuthContext'; // Bejelentkezési token vizsálata a session storageből
import { CartProvider } from './contexts/CartContext'; // kosár kezelése
import ProductDetails from './pages/ProductDetails/ProductDetails';

function App() {


  return (
    <AuthProvider >
      <Router>
        <ScrollTop />
        <div className="app">
          <PreHeader />
          <CartProvider>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/rendelés/:category' element={<Cart />} />
              <Route path='/rendelés/bejelentkezés' element={<OrderLogin />} />
              <Route path='/termékek/:category' element={<Products />} />
              <Route path='/profil/:category' element={<LoginPage />} />
              <Route path='/:links' element={<Info />} />
              <Route path='/kapcsolat' element={<Contact />} />
              <Route path='/fiókom/:category/:orderId?' element={<Profile />} />
              <Route path='/termékadatok/:id' element={<ProductDetails />} />
            </Routes>
          </CartProvider>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
