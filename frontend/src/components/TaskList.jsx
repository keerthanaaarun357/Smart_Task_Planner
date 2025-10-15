import React from "react";

function TaskList({ tasks }) {
  if (!tasks || tasks.length === 0)
    return (
      <p style={{ textAlign: "center", color: "#94a3b8", marginTop: 40 }}>
        No tasks yet — plan something awesome!
      </p>
    );

  const styles = {
    tableWrapper: {
      marginTop: 32,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(2,8,20,0.4)",
      animation: "fadeIn 1.2s ease",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      background: "rgba(15,23,42,0.55)",
      backdropFilter: "blur(10px)",
      fontFamily: `'Inter', sans-serif`,
      color: "#e2e8f0",
    },
    th: {
      padding: "14px 12px",
      textAlign: "left",
      background: "linear-gradient(90deg, rgba(6,182,212,0.35), rgba(56,189,248,0.15))",
      color: "#38bdf8",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "1px",
      fontSize: "0.8rem",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid rgba(56,189,248,0.08)",
    },
    row: {
      transition: "all .25s ease",
      cursor: "pointer",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .comet:hover{transform:translateX(6px) scale(1.01);background:rgba(56,189,248,0.07)}
      `}</style>

      <div style={styles.tableWrapper} className="comet">
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Goal</th>
              <th style={styles.th}>Task</th>
              <th style={styles.th}>Deadline</th>
              <th style={styles.th}>Dependencies</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, i) => (
              <tr
                key={i}
                style={{
                  ...styles.row,
                  background: i % 2 === 0 ? "rgba(30,41,59,0.45)" : "rgba(15,23,42,0.35)",
                }}
                className="comet"
              >
                <td style={styles.td}>{t.goal}</td>
                <td style={styles.td}>{t.task}</td>
                <td style={styles.td}>{t.deadline}</td>
                <td style={styles.td}>{t.dependencies || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TaskList;