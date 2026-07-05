// frontend/src/utils/formatPrice.js

// Centralized so the currency only needs to change in one place.
// `amount` is a plain number in whole currency units (not cents).
export function formatPrice(amount) {
  return `KSh ${amount.toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
