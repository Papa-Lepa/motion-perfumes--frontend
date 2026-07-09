// frontend/src/App.js
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import { CartProvider, useCart } from "./CartContext";

import "./App.css";
import "./Footer.css";

function NavCartIcon() {
  const { count } = useCart();
  return (
    <Link to="/cart" className="cart-icon">
      <FaShoppingCart />
      <span className="cart-count">{count}</span>
    </Link>
  );
}

function NavSearch() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    navigate(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : "/products");
  }

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <FaSearch className="search-icon" onClick={handleSubmit} />
      <input
        type="text"
        placeholder="Search perfumes..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function AppShell() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" className="logo">
          Motion <span>Perfumes</span>
        </Link>

        <NavSearch />

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <NavCartIcon />
      </nav>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h2>Motion Perfumes</h2>
            <p>
              Discover luxury fragrances crafted to leave a lasting impression.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/men">Men</Link></li>
              <li><Link to="/women">Women</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>📍 Nairobi, Kenya</p>
            <p>📧 info@motionperfumes.com</p>
            <p>📞 +254 700 123 456</p>
          </div>
        </div>

        <hr />

        <p className="copyright">
          © 2026 Motion Perfumes. All Rights Reserved.
        </p>
      </footer>
    </BrowserRouter>
  );
}

function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  );
}

export default App;
