from flask import Flask, request, send_file
from gtts import gTTS
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/convert', methods=['POST'])
def convert_text_to_voice():
    data = request.json
    text = data.get('text')

    if text:
        # Convert text to speech
        tts = gTTS(text=text, lang='en')
        tts.save("myvoice.mp3")
        return send_file("myvoice.mp3", as_attachment=True)

    return {"error": "No text provided"}, 400

if __name__ == "__main__":
    app.run(port=5000, debug=True)  # Run on port 5000
