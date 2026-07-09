// frontend/src/pages/Home.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPerfumes } from "../api";
import { useCart } from "../CartContext";
import { formatPrice } from "../utils/formatPrice";
import IMAGE_BY_NAME from "../data/productImages";

// Which real products (by exact database name) show up in Best Sellers.
const BEST_SELLER_NAMES = ["Dior Sauvage", "Bleu de Chanel", "Versace Eros", "YSL Black Opium"];

function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    getPerfumes()
      .then((all) => {
        const picked = BEST_SELLER_NAMES.map((name) => all.find((p) => p.name === name)).filter(
          Boolean
        );
        setBestSellers(picked);
      })
      .catch(() => setBestSellers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h4>LUXURY SCENTS</h4>
          <h1>Discover Your Signature Scent</h1>
          <p>
            Explore premium perfumes from the world's finest brands and
            experience elegance with every fragrance.
          </p>
          <Link to="/products">
            <button>Shop Now</button>
          </Link>
        </div>
      </section>

      <section className="categories">
        <h2>Featured Collections</h2>
        <div className="category-grid">
          <Link to="/men" className="category-card men">
            Men
          </Link>
          <Link to="/women" className="category-card women">
            Women
          </Link>
          <Link to="/products" className="category-card unisex">
            Unisex
          </Link>
        </div>
      </section>

      <section className="best-sellers">
        <h2>Best Sellers</h2>

        {loading && <p>Loading…</p>}

        <div className="best-grid">
          {bestSellers.map((perfume) => (
            <div className="best-card" key={perfume.id}>
              <img src={IMAGE_BY_NAME[perfume.name]} alt={perfume.name} />
              <h3>{perfume.name}</h3>
              <p>{formatPrice(perfume.price_cents / 100)}</p>
              <button
                onClick={() =>
                  addToCart({
                    perfumeId: perfume.id,
                    name: perfume.name,
                    price: perfume.price_cents / 100,
                    image: IMAGE_BY_NAME[perfume.name],
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="brands">
        <h2>Luxury Brands</h2>
        <div className="brand-grid">
          <div>DIOR</div>
          <div>CHANEL</div>
          <div>VERSACE</div>
          <div>YSL</div>
          <div>TOM FORD</div>
          <div>GUCCI</div>
        </div>
      </section>
    </>
  );
}

export default Home;
