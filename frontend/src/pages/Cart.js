 // frontend/src/pages/Cart.js
 import { useState } from "react";
 import { useCart } from "../CartContext";
 import { placeOrder } from "../api";
 import { formatPrice } from "../utils/formatPrice";
 import "./Cart.css";
 
 function Cart() {
   const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
   const [form, setForm] = useState({ customerName: "", customerEmail: "", address: "" });
   const [status, setStatus] = useState("idle"); // idle | submitting | success | error
   const [errorMsg, setErrorMsg] = useState("");
   const [confirmedOrder, setConfirmedOrder] = useState(null);
 
   function handleChange(e) {
     setForm({ ...form, [e.target.name]: e.target.value });
   }
 
   async function handleCheckout(e) {
     e.preventDefault();
     if (items.length === 0) return;
 
     setStatus("submitting");
     setErrorMsg("");
 
     try {
       const result = await placeOrder({ ...form, items });
       setConfirmedOrder(result);
       setStatus("success");
       clearCart();
     } catch (err) {
       setErrorMsg(err.message);
       setStatus("error");
     }
   }
 
   if (status === "success" && confirmedOrder) {
     return (
       <div className="cart-page">
         <div className="cart-confirmation">
           <div className="confirmation-check" aria-hidden="true">
             <svg viewBox="0 0 52 52">
               <circle cx="26" cy="26" r="24" />
               <path d="M14 27 L22 35 L38 17" />
             </svg>
           </div>
           <h1>Order Placed</h1>
           <p className="confirmation-lede">
             Thank you — order <strong>#{confirmedOrder.orderId}</strong> has been received.
           </p>
           <div className="confirmation-total">{formatPrice(confirmedOrder.total)}</div>
           <p className="confirmation-note">
             A confirmation email is on its way to <strong>{form.customerEmail}</strong>.
           </p>
         </div>
       </div>
     );
   }
 
   return (
     <div className="cart-page">
       <header className="cart-header">
         <h1>Shopping Bag</h1>
         {items.length > 0 && (
           <span className="cart-count-pill">
             {items.reduce((n, i) => n + i.quantity, 0)} item
             {items.reduce((n, i) => n + i.quantity, 0) !== 1 ? "s" : ""}
           </span>
         )}
       </header>
 
       {items.length === 0 ? (
         <div className="cart-empty">
           <div className="cart-empty-glyph" aria-hidden="true">⟡</div>
           <p>Your bag is empty.</p>
           <p className="cart-empty-sub">Whatever you add to your collection will appear here.</p>
         </div>
       ) : (
         <div className="cart-layout">
           <div className="cart-items">
             {items.map((item) => (
               <div className="cart-item" key={item.perfumeId}>
                 <img className="cart-item-image" src={item.image} alt={item.name} />
 
                 <div className="cart-item-info">
                   <h3>{item.name}</h3>
                   <p className="cart-item-price">{formatPrice(item.price)} each</p>
                 </div>
 
                 <div className="qty-stepper">
                   <button
                     type="button"
                     aria-label={`Decrease quantity of ${item.name}`}
                     onClick={() => updateQuantity(item.perfumeId, item.quantity - 1)}
                   >
                     −
                   </button>
                   <span>{item.quantity}</span>
                   <button
                     type="button"
                     aria-label={`Increase quantity of ${item.name}`}
                     onClick={() => updateQuantity(item.perfumeId, item.quantity + 1)}
                   >
                     +
                   </button>
                 </div>
 
                 <div className="cart-item-subtotal">
                   {formatPrice(item.price * item.quantity)}
                 </div>
 
                 <button
                   type="button"
                   className="cart-item-remove"
                   aria-label={`Remove ${item.name} from bag`}
                   onClick={() => removeFromCart(item.perfumeId)}
                 >
                   ×
                 </button>
               </div>
             ))}
           </div>
 
           <aside className="cart-summary">
             <h2>Order Summary</h2>
 
             <div className="cart-summary-row">
               <span>Subtotal</span>
               <span>{formatPrice(total)}</span>
             </div>
             <div className="cart-summary-row cart-summary-total">
               <span>Total</span>
               <span>{formatPrice(total)}</span>
             </div>
 
             <form onSubmit={handleCheckout} className="checkout-form">
               <label>
                 Full name
                 <input
                   type="text"
                   name="customerName"
                   placeholder="Jane Doe"
                   value={form.customerName}
                   onChange={handleChange}
                   required
                 />
               </label>
 
               <label>
                 Email
                 <input
                   type="email"
                   name="customerEmail"
                   placeholder="you@example.com"
                   value={form.customerEmail}
                   onChange={handleChange}
                   required
                 />
               </label>
 
               <label>
                 Delivery address
                 <input
                   type="text"
                   name="address"
                   placeholder="Street, city"
                   value={form.address}
                   onChange={handleChange}
                 />
               </label>
 
               {status === "error" && <p className="checkout-error">{errorMsg}</p>}
 
               <button type="submit" className="checkout-submit" disabled={status === "submitting"}>
                 {status === "submitting" ? "Placing order…" : "Proceed to Checkout"}
               </button>
             </form>
           </aside>
         </div>
       )}
     </div>
   );
 }
 
 export default Cart;
 