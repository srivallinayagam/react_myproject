from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from gtts import gTTS
import requests
import io
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Hugging Face API configuration
API_URL = "https://api-inference.huggingface.co/models/OnomaAIResearch/Illustrious-xl-early-release-v0"
headers = {"Authorization": "Bearer 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"}  # Replace with your actual token

def query(payload):
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        if response.status_code == 200:
            return response.content
        else:
            raise Exception("Failed to generate image: " + response.text)
    except Exception as e:
        print(f"Error in query: {e}")  # Log the error for debugging
        return None

@app.route('/convert', methods=['POST'])
def convert_text_to_voice():
    data = request.json
    text = data.get('text')

    if text:
        try:
            # Convert text to speech
            tts = gTTS(text=text, lang='en')
            tts.save("myvoice.mp3")
            return send_file("myvoice.mp3", as_attachment=True)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "No text provided"}), 400

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        # Generate the image using the Hugging Face API
        image_bytes = query({"inputs": prompt})
        
        if image_bytes is None:
            return jsonify({"error": "Failed to generate image"}), 500

        # Load the image from bytes
        image = Image.open(io.BytesIO(image_bytes))
        img_path = "generated_image.png"
        image.save(img_path)

        return send_file(img_path, mimetype='image/png')
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
