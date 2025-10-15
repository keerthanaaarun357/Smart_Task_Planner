import React, { useState } from "react";
import { createPlan } from "../services/api.js";

function TaskForm({ onPlanCreated }) {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal.trim()) return;
    setLoading(true);
    try {
      await createPlan(goal);
      setGoal("");
      onPlanCreated();
    } catch (error) {
      console.error("Error creating plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    form: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      justifyContent: "center",
      animation: "fadeIn 1s ease",
    },
    input: {
      flex: "1 1 300px",
      padding: "14px 18px",
      fontSize: "1rem",
      color: "#e2e8f0",
      background: "rgba(30,41,59,0.55)",
      border: "1px solid rgba(56,189,248,0.25)",
      borderRadius: "12px",
      outline: "none",
      transition: "all .3s ease",
      fontFamily: `'Inter', sans-serif`,
    },
    btn: {
      padding: "14px 24px",
      border: "none",
      borderRadius: "12px",
      fontWeight: "600",
      fontSize: "1rem",
      cursor: loading ? "wait" : "pointer",
      color: "#fff",
      background: loading
        ? "linear-gradient(90deg, #0ea5e9, #38bdf8)"
        : "linear-gradient(90deg, #06b6d4, #0ea5e9)",
      boxShadow: "0 0 20px rgba(56,189,248,0.35)",
      transition: "all .3s ease",
      transform: loading ? "scale(0.96)" : "scale(1)",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%{box-shadow:0 0 12px rgba(56,189,248,.25)}50%{box-shadow:0 0 24px rgba(56,189,248,.55)}100%{box-shadow:0 0 12px rgba(56,189,248,.25)}}
      `}</style>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="What's the mission? (e.g. Launch a product in 2 weeks)"
          style={styles.input}
          onFocus={(e) => (e.target.style.border = "1px solid rgba(56,189,248,0.7)")}
          onBlur={(e) => (e.target.style.border = "1px solid rgba(56,189,248,0.25)")}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.btn,
            animation: !loading && "pulse 2.5s infinite",
          }}
        >
          {loading ? "Brewing plan..." : "Plan it →"}
        </button>
      </form>
    </>
  );
}

export default TaskForm;