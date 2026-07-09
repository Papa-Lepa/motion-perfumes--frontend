// frontend/src/pages/Men.js
import { useEffect, useState } from "react";
import { getPerfumes } from "../api";
import { useCart } from "../CartContext";
import { formatPrice } from "../utils/formatPrice";
import IMAGE_BY_NAME from "../data/productImages";

function Men() {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getPerfumes("Men")
      .then(setPerfumes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div
        className="collection-banner"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f')",
        }}
      >
        Men's Collection
      </div>

      <div className="products-page">
        {loading && <p>Loading…</p>}
        {error && <p>Could not load the collection: {error}</p>}

        {!loading && !error && (
          <div className="product-grid">
            {perfumes.map((perfume) => (
              <div className="product-card" key={perfume.id}>
                <img src={IMAGE_BY_NAME[perfume.name]} alt={perfume.name} />

                <div className="product-info">
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
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Men;
