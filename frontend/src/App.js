 // frontend/src/App.js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

function AppShell() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" className="logo">
          Motion <span>Perfumes</span>
        </Link>

        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search perfumes..." />
        </div>

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
            <p>📧 nginai.koileken@strathmore.edu </p>
            <p>📞 +254 702799738 </p>
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
