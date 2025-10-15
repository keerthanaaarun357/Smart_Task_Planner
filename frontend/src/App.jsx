import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { getTasks } from "./services/api.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dummyTasks = [
    { goal: "Test Goal", task: "Dummy Task 1", deadline: "2025-10-20", dependencies: "None" },
    { goal: "Test Goal", task: "Dummy Task 2", deadline: "2025-10-22", dependencies: "Dummy Task 1" },
  ];

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data.length > 0 ? data : dummyTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks, showing dummy data");
      setTasks(dummyTasks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ----------  CSS-IN-JS  ---------- */
  const styles = {
    page: {
      minHeight: "100vh",
      background: "radial-gradient(at 20% 20%, #1e293b 0%, #0f172a 50%, #020617 100%)",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "#e2e8f0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
    },
    card: {
      width: "100%",
      maxWidth: 880,
      background: "rgba(30, 41, 59, 0.55)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(56, 189, 248, 0.18)",
      borderRadius: 24,
      padding: "40px 48px",
      boxShadow: "0 8px 32px rgba(2, 8, 20, 0.4), 0 0 12px rgba(56, 189, 248, 0.15)",
      animation: "fadeIn 1s ease-out forwards",
    },
    header: {
      fontSize: "2.25rem",
      fontWeight: 800,
      letterSpacing: "-1px",
      textAlign: "center",
      marginBottom: 8,
      background: "linear-gradient(135deg, #38bdf8 0%, #22d3ee 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: "glow 4s ease-in-out infinite alternate",
    },
    subHeader: {
      textAlign: "center",
      color: "#94a3b8",
      fontSize: "0.95rem",
      marginBottom: 32,
    },
    divider: {
      height: 1,
      background: "linear-gradient(90deg, transparent, rgba(56,189,248,.4), transparent)",
      margin: "24px 0 32px",
      border: "none",
    },
    loading: {
      textAlign: "center",
      color: "#38bdf8",
      fontStyle: "italic",
    },
    error: {
      background: "rgba(239, 68, 68, 0.12)",
      border: "1px solid rgba(239, 68, 68, 0.35)",
      color: "#fecaca",
      padding: "12px 16px",
      borderRadius: 12,
      marginBottom: 24,
      textAlign: "center",
    },
    footer: {
      marginTop: 40,
      fontSize: "0.8rem",
      color: "#64748b",
      textAlign: "center",
      letterSpacing: "0.5px",
    },
    accent: { color: "#38bdf8" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%{filter:drop-shadow(0 0 4px #38bdf8)}100%{filter:drop-shadow(0 0 10px #22d3ee)}}
        .lift:hover{transform:translateY(-3px);transition:transform .2s ease}
      `}</style>

      <div style={styles.page}>
        <div style={styles.card} className="lift">
          <h1 style={styles.header}>Smart Task Planner</h1>
          <p style={styles.subHeader}>AI-powered breakdowns for any goal</p>

          <div style={styles.divider} />

          <TaskForm onPlanCreated={fetchTasks} />

          {loading && <p style={styles.loading}>Assembling your roadmap...</p>}

          {error && <div style={styles.error}>{error}</div>}

          <div style={{ animation: "fadeIn 1.2s ease" }}>
            <TaskList tasks={tasks} />
          </div>
        </div>

        <footer style={styles.footer}>
          {new Date().getFullYear()} • Keerthana Arun{" "}
          {/* <span style={styles.accent}>Neural Edition</span> */}
        </footer>
      </div>
    </>
  );
}

export default App;