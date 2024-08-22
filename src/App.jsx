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

import { AuthProvider } from './contexts/AuthContext';

function App() {


  return (
    <AuthProvider >
      <Router>
        <div className="app">
          <PreHeader />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/termékek/:cagerory' element={<Products />} />
            <Route path='/profil/:category' element={<LoginPage />} />
            <Route path='/kosár' element={<Cart />} />
            <Route path='/:links' element={<Info />} />
            <Route path='/kapcsolat' element={<Contact />} />
            <Route path='/fiókom/:category' element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
