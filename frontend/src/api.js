 // frontend/src/api.js

// Set REACT_APP_API_URL in a .env file at your frontend's root (or in
// Vercel's env vars once the frontend is deployed) once you're ready to
// make this configurable. Until then, it falls back to the live backend
// URL directly, so this works right away.
const API_URL = process.env.REACT_APP_API_URL || "https://aurum-and-ash-backend.vercel.app";

export async function getPerfumes(family) {
  const url = family
    ? `${API_URL}/api/perfumes?family=${encodeURIComponent(family)}`
    : `${API_URL}/api/perfumes`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Could not load the catalog right now");
  }
  return response.json();
}

export async function placeOrder({ customerName, customerEmail, address, items }) {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerName,
      customerEmail,
      address,
      items: items.map((i) => ({ perfumeId: i.perfumeId, quantity: i.quantity })),
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Could not place your order");
  }
  return data;
}
