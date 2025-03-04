import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Configure OpenAI API Key securely using environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/ask", methods=["POST"])
def ask_question():
    data = request.get_json()
    
    if not data or "question" not in data:
        return jsonify({"error": "No question provided"}), 400
    
    user_question = data["question"]

    try:
        # Call OpenAI GPT-4 API
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a medical AI assistant."},
                {"role": "user", "content": user_question}
            ]
        )

        answer = response["choices"][0]["message"]["content"]
        return jsonify({"answer": answer})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use Render's assigned port
    app.run(host="0.0.0.0", port=port, debug=True)
