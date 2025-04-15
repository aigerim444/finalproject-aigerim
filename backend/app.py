from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore

#new
from openai import OpenAI
import os
from dotenv import load_dotenv
import PyPDF2
from io import BytesIO
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

# Quiz generation endpoint
@app.route("/api/generate-quiz", methods=["POST"])
def generate_quiz():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
            
        if not file.filename.endswith('.pdf'):
            return jsonify({"error": "Only PDF files are allowed"}), 400

        # read the PDF file using PyPDF2
        pdf_reader = PyPDF2.PdfReader(BytesIO(file.read()))
        text_content = ""
        for page in pdf_reader.pages:
            text_content += page.extract_text()
        
        if not text_content.strip():
            return jsonify({"error": "Could not extract text from PDF"}), 400
        
        # OpenAI to generate quiz questions
        prompt = """Create 5 multiple choice questions based on the following text. Format as JSON:
        {
            "questions": [
                {
                    "question": "question text",
                    "options": [
                        {"text": "option 1", "isCorrect": false},
                        {"text": "option 2", "isCorrect": true},
                        {"text": "option 3", "isCorrect": false},
                        {"text": "option 4", "isCorrect": false}
                    ]
                }
            ]
        }"""

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{
                "role": "user", 
                "content": prompt + f"\n\nText: {text_content}"
            }],
            max_tokens=2000
        )
        
        return jsonify({"response": response.choices[0].message.content})
    except Exception as e:
        print("Error generating quiz:", str(e))
        return jsonify({"error": "Error generating quiz. Please try again."}), 500

if __name__ == "__main__":
    app.run(debug=True)
