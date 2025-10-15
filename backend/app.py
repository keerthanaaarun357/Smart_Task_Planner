from flask import Flask, request, jsonify
from flask_cors import CORS 
import subprocess
import json
import os
import subprocess
import json
import datetime
import ollama

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # allow frontend requests

# In-memory storage for tasks
tasks_db = []

# -----------------------------
# LLM service function
# -----------------------------
import ollama, json, datetime

def llm_generate_tasks(goal: str):
    try:
        res = ollama.chat(
            model="mistral:7b-instruct-q4_0",
            format="json",
            options={"temperature": 0.1, "num_predict": 250},
            messages=[{
                "role": "user",
                "content": f"Goal: {goal}\n"
                          "Return ONLY a JSON array (max 4 objects), ONE line, no markdown:\n"
                          '[{"task":"...","deadline":"YYYY-MM-DD","dependencies":""},...]'
            }]
        )
        txt = res["message"]["content"].strip()

        # ---- 1. remove possible markdown fences ----
        if txt.startswith("```"): txt = txt.split("```", 2)[1].lstrip("json")
        txt = txt.strip()

        # ---- 2. ensure we have an array ----
        if not txt.startswith("["):
            txt = "[" + txt
        if not txt.endswith("]"):
            txt = txt + "]"

        tasks = json.loads(txt)
        if not isinstance(tasks, list):
            raise ValueError("Not a list")
        for t in tasks:
            t.setdefault("dependencies", "")
        return tasks
    except Exception as e:
        print("OLLAMA ERROR:", e, txt[:120])
        return []


# -----------------------------
# API routes
# -----------------------------
@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks_db)


@app.route("/api/plan", methods=["POST"])
def create_plan():
    data = request.get_json()
    goal = data.get("goal", "").strip()
    if not goal:
        return jsonify({"error": "Goal is required"}), 400

    tasks = llm_generate_tasks(goal)   # ← list[dict] expected

    # ---- make sure we got a list of dicts ----
    if not isinstance(tasks, list) or any(not isinstance(t, dict) for t in tasks):
        return jsonify({"error": "LLM returned bad format"}), 502

    for t in tasks:
        t["goal"] = goal
    tasks_db.extend(tasks)
    return jsonify(tasks)


# -----------------------------
# Run the app
# -----------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"✅ Backend running on http://127.0.0.1:{port}")
    app.run(debug=True, port=port)
