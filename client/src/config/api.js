/**
 * Base URL API backend (senza slash finale).
 * Produzione: imposta VITE_API_URL su Netlify, es. https://francescagandelli.onrender.com/api
 */
const raw = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000/api";
export const API_BASE = raw.replace(/\/+$/, "");
