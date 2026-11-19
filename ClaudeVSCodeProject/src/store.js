// Tiny localStorage wrapper. Falls back to in-memory if storage is unavailable.
const memory = {};

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return memory[key] ?? fallback;
  }
}

export function save(key, value) {
  memory[key] = value;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked; keep in memory only */
  }
}

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
