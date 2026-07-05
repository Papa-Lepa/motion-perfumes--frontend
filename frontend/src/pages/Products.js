 // frontend/src/pages/Products.js
 import { useEffect, useState } from "react";
 import { FaHeart, FaStar } from "react-icons/fa";
 import { getPerfumes } from "../api";
 import { useCart } from "../CartContext";
 import { formatPrice } from "../utils/formatPrice";
 
 import dior from "../images/dior.png.png";
 import bleu from "../images/bleu.png.png";
 import versace from "../images/versace.png.png";
 import blackopium from "../images/blackopium.png.png";
 import tomford from "../images/tomford.png.png";
 import coco from "../images/coco.png.png";
 import gucci from "../images/gucci.png.png";
 import baccarat from "../images/baccarat.png.png";
 
 // The database doesn't store image files, so we match perfumes to your
 // local product images by exact name. If you add a new perfume in the
 // database, add its image import + a matching entry here too.
 const IMAGE_BY_NAME = {
   "Dior Sauvage": dior,
   "Bleu de Chanel": bleu,
   "Versace Eros": versace,
   "YSL Black Opium": blackopium,
   "Tom Ford Oud Wood": tomford,
   "Chanel Coco Mademoiselle": coco,
   "Gucci Bloom": gucci,
   "Baccarat Rouge 540": baccarat,
 };
 
 const FILTERS = ["All", "Men", "Women", "Unisex"];
 
 function Products() {
   const [perfumes, setPerfumes] = useState([]);
   const [activeFilter, setActiveFilter] = useState("All");
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const { addToCart } = useCart();
 
   useEffect(() => {
     getPerfumes()
       .then(setPerfumes)
       .catch((err) => setError(err.message))
       .finally(() => setLoading(false));
   }, []);
 
   const visible =
     activeFilter === "All" ? perfumes : perfumes.filter((p) => p.family === activeFilter);
 
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
     </div>
   );
 }
 
 export default Products;
 