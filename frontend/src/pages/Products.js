// frontend/src/pages/Products.js
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import { getPerfumes } from "../api";
import { useCart } from "../CartContext";
import { formatPrice } from "../utils/formatPrice";
import IMAGE_BY_NAME from "../data/productImages";
import "./products-search.css";

const FILTERS = ["All", "Men", "Women", "Unisex"];

function Products() {
  const [perfumes, setPerfumes] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // Reads ?search=... set by the navbar search box, and also lets people
  // type directly into the search box on this page.
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("search") || "");

  useEffect(() => {
    getPerfumes()
      .then(setPerfumes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Keep the search box in sync if the navbar search changes it while
  // already on this page.
  useEffect(() => {
    setSearchText(searchParams.get("search") || "");
  }, [searchParams]);

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchText(value);
    setSearchParams(value ? { search: value } : {});
  }

  const query = searchText.trim().toLowerCase();
  const visible = perfumes.filter((p) => {
    const familyMatch = activeFilter === "All" || p.family === activeFilter;
    const searchMatch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      (p.top_notes || "").toLowerCase().includes(query) ||
      (p.heart_notes || "").toLowerCase().includes(query) ||
      (p.base_notes || "").toLowerCase().includes(query);
    return familyMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="products-page">
        <p>Loading catalog…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <p>Could not load the catalog: {error}</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1>Our Collection</h1>

      <input
        type="text"
        className="products-search"
        placeholder="Search perfumes or notes…"
        value={searchText}
        onChange={handleSearchChange}
      />

      <div className="filter-buttons">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={activeFilter === f ? "active" : ""}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p>No perfumes match your search.</p>
      ) : (
        <div className="product-grid">
          {visible.map((perfume) => (
            <div className="product-card" key={perfume.id}>
              <img src={IMAGE_BY_NAME[perfume.name]} alt={perfume.name} />

              <div className="product-info">
                <h3>{perfume.name}</h3>

                <div className="rating">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <p>{formatPrice(perfume.price_cents / 100)}</p>

                <div className="product-buttons">
                  <button className="wishlist">
                    <FaHeart />
                  </button>

                  <button
                    className="cart-btn"
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
