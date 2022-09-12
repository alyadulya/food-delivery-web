import './App.css';
import { Routes, Route } from "react-router-dom";
import HomeWrapper from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Invoices from './pages/Invoices';

function App() {
  return (
    <div className="container my-4">
      <Routes>
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} /> {/* path="/:usernameOrUserid" */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/invoices" element={<Invoices />} />
      </Routes>
    </div>
  );
}

export default App;
