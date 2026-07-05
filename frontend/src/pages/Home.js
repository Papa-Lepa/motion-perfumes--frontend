import { Link } from "react-router-dom";

function Home() {
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

  <div className="best-grid">

    <div className="best-card">
      <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80" alt="Dior Sauvage"/>
      <h3>Dior Sauvage</h3>
      <p>ksh 1200 </p>
      <button>Add to Cart</button>
    </div>

    <div className="best-card">
      <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500&q=80" alt="Bleu de Chanel"/>
      <h3>Bleu de Chanel</h3>
      <p>ksh 1500 </p>
      <button>Add to Cart</button>
    </div>

    <div className="best-card">
      <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80"/>
      <h3>Versace Eros</h3>
      <p>kshs 1300 </p>
      <button>Add to Cart</button>
    </div>

    <div className="best-card">
      <img src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80"/>
      <h3>Black Opium</h3>
      <p>ksh 1400 </p>
      <button>Add to Cart</button>
    </div>

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