from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from gtts import gTTS
import os
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained image generation model
model = load_model('fruit_model.h5')

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
    try:
        # Generate a random image for demonstration purposes
        random_image = np.random.rand(150, 150, 3) * 255
        img = Image.fromarray(random_image.astype('uint8'))

        # Save the image to a file
        img_path = "generated_image.png"
        img.save(img_path)

        return send_file(img_path, as_attachment=True)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
