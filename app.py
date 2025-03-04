from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Configure OpenAI API Key
openai.api_key = "YOUR_OPENAI_API_KEY"

@app.route("/ask", methods=["POST"])
def ask_question():
    user_question = request.json["question"]

    # Call OpenAI GPT-4 API
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "You are a medical AI assistant."},
                  {"role": "user", "content": user_question}]
    )

    answer = response["choices"][0]["message"]["content"]
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
