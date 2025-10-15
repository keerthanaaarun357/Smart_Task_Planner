# import subprocess
# import json

# def generate_task_plan(goal):
#     prompt = f"""
#     Break down this goal into actionable tasks with suggested deadlines and dependencies.
#     Goal: "{goal}"
#     Respond in JSON format like:
#     {{
#         "goal": "{goal}",
#         "tasks": [
#             {{"task": "Task 1", "deadline": "Day 1", "dependencies": "None"}},
#             {{"task": "Task 2", "deadline": "Day 2", "dependencies": "Task 1"}}
#         ]
#     }}
#     """

#     try:
#         result = subprocess.run(
#             ["ollama", "run", "llama3", prompt],
#             capture_output=True,
#             text=True,
#             check=True
#         )
#         text_output = result.stdout.strip()

#         # Try to parse JSON response
#         try:
#             plan = json.loads(text_output)
#         except json.JSONDecodeError:
#             plan = {"goal": goal, "tasks": [{"task": "Review AI output", "deadline": "Unknown", "dependencies": "None"}]}
#         return plan
#     except Exception as e:
#         return {
#             "goal": goal,
#             "tasks": [{"task": f"Error generating plan: {e}", "deadline": "N/A", "dependencies": "N/A"}]
#         }

# from ollama import Ollama

# def generate_task_plan(goal):
#     client = Ollama()
#     prompt = f"Break down this goal into actionable tasks with deadlines and dependencies:\n{goal}"
#     response = client.generate(model="llama3", prompt=prompt)
#     # Parse response into list of dicts
#     return parse_ollama_response(response)

import subprocess
import json

def llm_generate_tasks(goal):
    """Use llama3 via Ollama to generate a task plan."""
    prompt = f"""
    Break down this goal into actionable tasks with suggested deadlines and dependencies. Ensure the breakdown is as detailed as possible and specific to the goal, not general.
    Output as JSON list:
    [
      {{"task": "...", "deadline": "YYYY-MM-DD", "dependencies": "..."}},
      ...
    ]
    Goal: {goal}
    """

    result = subprocess.run(
        ["ollama", "run", "llama3", prompt],
        capture_output=True,
        text=True
    )

    output = result.stdout.strip()

    # If model returns plain text, try to extract JSON part
    try:
        data = json.loads(output)
    except Exception:
        # crude fallback: wrap text
        data = [{"task": output, "deadline": "N/A", "dependencies": "None"}]

    return data
