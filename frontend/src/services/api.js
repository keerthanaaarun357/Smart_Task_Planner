// const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

// export async function createPlan(goal) {
//   const res = await fetch(`${API_BASE}/api/plan`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ goal }),
//   });
//   return await res.json();
// }

// export async function getTasks() {
//   const res = await fetch(`${API_BASE}/api/tasks`);
//   return await res.json();
// }

// frontend/src/services/api.js
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export async function createPlan(goal) {
  const res = await fetch(`${API_BASE}/api/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goal }),
  });
  return await res.json();
}

export async function getTasks() {
  const res = await fetch(`${API_BASE}/api/tasks`);
  return await res.json();
}
