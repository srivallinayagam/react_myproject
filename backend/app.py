from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from gtts import gTTS
import requests
import io
from PIL import Image
from huggingface_hub import InferenceClient

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Hugging Face API configuration
API_URL_img = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell"
headers_img = {"Authorization": "Bearer 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"}

client = InferenceClient(api_key="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")  # Replace with your actual API key

def query_image(payload):
    try:
        response = requests.post(API_URL_img, headers=headers_img, json=payload)
        if response.status_code == 200:
            return response.content
        else:
            raise Exception("Failed to generate image: " + response.text)
    except Exception as e:
        print(f"Error in query: {e}")
        return None
    
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        # Query the chatbot model
        response = client.chat_completion(
            model="mistralai/Mistral-Small-Instruct-2409",
            messages=[{"role": "user", "content": user_message}],
            max_tokens=500,
            stream=False,
        )
        reply = response.choices[0].message['content']
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/convert', methods=['POST'])
def convert_text_to_voice():
    data = request.json
    text = data.get('text')

    if text:
        try:
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
        image_bytes = query_image({"inputs": prompt})
        
        if image_bytes is None:
            return jsonify({"error": "Failed to generate image"}), 500

        image = Image.open(io.BytesIO(image_bytes))
        img_path = "generated_image.png"
        image.save(img_path)

        return send_file(img_path, mimetype='image/png')
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
