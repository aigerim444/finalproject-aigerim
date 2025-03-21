from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore

#new
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)
CORS(app)  # Allow frontend and backend to communicate across ports

# Route for the root URL
@app.route("/")
def home():
    print("hello")
    return "Welcome to the Chatbot Backend!"

# API endpoint for chatbot responses
@app.route("/api/get_response", methods=["POST"])
def get_response():
    try: 

        user_message = request.json.get("message")
        print("User message:", user_message) #logging
        # Example: Basic response logic (you can replace this!)
        response = client.chat.completions.create(
            model="o1-mini",
            messages=[{
                "role": "user",
                "content": user_message
            }], 
            max_completion_tokens = 1000
        )
        # print("OpenAI Response:", response)
        # print(completion.choices[0].message.content)
        bot_response = response.choices[0].message.content 
        print("this is the response: ", bot_response)
        return jsonify({"response": bot_response})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

    # Return the bot's response
  #  return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
