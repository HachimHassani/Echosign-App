from flask import Flask, request, jsonify, Response
import numpy as np
import cv2
import mediapipe as mp
import sagemaker
from sagemaker.tensorflow.model import TensorFlowPredictor

# Initialize Flask app
app = Flask(__name__)

# SageMaker endpoint name
ENDPOINT_NAME = 'EchosignLive'

# Initialize Mediapipe and SageMaker
mp_holistic = mp.solutions.holistic
sagemaker_session = sagemaker.Session()
predictor = TensorFlowPredictor(ENDPOINT_NAME, sagemaker_session)

# Constants
FRAME_SIZE = (640, 480)  # Adjust as needed
NUM_CLASSES = 11  # Number of action classes
SEQUENCE_LENGTH = 30  # Sequence length
THRESHOLD = 0.9

# Initialize variables
frames_buffer = []


@app.route('/predict', methods=['POST'])
def predict():
    frames = []
    for i in range(SEQUENCE_LENGTH):
            frame = request.files.get(f'frame_{i}')
            if frame is not None:
                frame_data = frame.read()
                img = cv2.imdecode(np.frombuffer(frame_data, np.uint8), cv2.IMREAD_COLOR)
                frames.append(img)
                
    
    # Process frames and make predictions
    sequence = process_frames(frames)
    if sequence is not None:
        res = predictor.predict(np.expand_dims(sequence, axis=0))["predictions"][0]
        action = actions[np.argmax(res)]
        return jsonify({"action": action})
    else:
        return jsonify({"error": "Failed to process frames"}), 500

def process_frames(frames):
    global frames_buffer
    
    # Ensure the frames have the desired size
    frames = [cv2.resize(frame, FRAME_SIZE) for frame in frames]
    
    # You can add your image processing logic here if needed
    
    # Perform Mediapipe detection
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        sequences = []
        for frame in frames:
            image, results = mediapipe_detection(frame, holistic)
            keypoints = extract_keypoints(results)
            sequences.append(keypoints)
        
        frames_buffer.extend(sequences)
    
    # Maintain a buffer of frames for sequence processing
    if len(frames_buffer) >= SEQUENCE_LENGTH:
        sequence = frames_buffer[-SEQUENCE_LENGTH:]
        frames_buffer = frames_buffer[-SEQUENCE_LENGTH:]
        return np.array(sequence)
    
    return None

def mediapipe_detection(image, model):
    # Ensure the image is in BGR format

    # Convert the image to np.uint8 data type
    image = image.astype(np.uint8)
    if image.shape[2] == 3:  # Check if the image has 3 channels (BGR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    image.flags.writeable = False
    results = model.process(image)
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    return image, results


def extract_keypoints(results):
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([lh, rh])

if __name__ == '__main__':
    actions = np.array(["salam", "labasse", "kidayre", "chokran", "ana", "farhane", "hitache", "ah", "jihaz", "sahal leia", "tawasole"])
    app.run(host='0.0.0.0', port=8080)
