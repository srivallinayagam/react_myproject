from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from gtts import gTTS
import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image

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
    # Load and preprocess an example image (to be replaced with actual image handling logic)
    # Assuming you have a dataset and want to generate a prediction
    try:
        # Example for generating an image (this should be adapted based on your requirements)
        # Here you would typically handle the input image and generate a new image based on model prediction
        # For demonstration, we’ll create a placeholder response

        # Generate a random image for demonstration purposes
        random_image = np.random.rand(150, 150, 3) * 255
        img = Image.fromarray(random_image.astype('uint8'))

        # Save the image to a file
        img.save("generated_image.png")

        return send_file("generated_image.png", as_attachment=True)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
