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
function App() {


  return (
    <Router>
      <div className="app">

        <PreHeader />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/loginpage' element={<LoginPage />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
