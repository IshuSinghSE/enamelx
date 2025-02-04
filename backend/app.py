from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import numpy as np
import cv2
import io

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow requests from React app

print("💮💮💮 Loading YOLO model...")
# Load YOLO model (Ensure "best.pt" is in the same directory)
model = YOLO("best.pt")

@app.route("/")
def home():
    return jsonify({"message": "Hello, World!"})

@app.route("/predict", methods=["POST"])
def predict():
    """Receive an image from the frontend, run YOLO model, and return detections."""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    # Read image file as a byte stream and convert to numpy array using OpenCV
    file_bytes = np.frombuffer(file.read(), np.uint8)
    image_array = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # Run YOLO inference
    try:
        results = model.predict(image_array)
        predictions = {}

        # Process detections
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0].item())  # Class ID
                label = model.names[class_id]  # Class name
                confidence = round(box.conf[0].item(), 2)  # Confidence score
                x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box coordinates

                prediction = {
                    "bbox": [x1, y1, x2, y2],
                    "class_id": class_id,
                    "confidence": confidence
                }
                # Ensure the label name doesn't contain spaces and is lowercase e.g. "root_piece"
                label = label.replace(" ", "_").lower()
                if label not in predictions: 
                    predictions[label] = []
                predictions[label].append(prediction)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"prediction": predictions})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)


