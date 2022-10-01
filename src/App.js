import './App.css';
import { Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Invoices from './pages/Invoices';
import { useEffect } from 'react';
import { listen } from './app/listener';

function App() {
  useEffect(() => {
    listen();
  }, []);

  return (
    <div className="container my-4">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/invoices/:order_id" element={<Invoices />} />
      </Routes>
    </div>
  );
}

export default App;
