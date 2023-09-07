import asyncio
import websockets
import numpy as np
import cv2
import mediapipe as mp
import sagemaker
from sagemaker.tensorflow.model import TensorFlowPredictor

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

async def handle_connection(websocket, path):
    try:
        while True:
            frame_data = await websocket.recv()
            img = cv2.imdecode(np.frombuffer(frame_data, np.uint8), cv2.IMREAD_COLOR)
            cv2.imshow('Received Image', img)
            cv2.waitKey(1)  # This is needed to update the OpenCV window

            sequence = process_frame(img)

            if sequence is not None:
                res = predictor.predict(np.expand_dims(sequence, axis=0))["predictions"][0]
                action = actions[np.argmax(res)]
                print(action)
                await websocket.send(action)
    except websockets.exceptions.ConnectionClosedError:
        print('Client disconnected')

def process_frame(frame):
    global frames_buffer

    frame = cv2.resize(frame, FRAME_SIZE)

    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        image, results = mediapipe_detection(frame, holistic)
        keypoints = extract_keypoints(results)
        frames_buffer.append(keypoints)

    if len(frames_buffer) >= SEQUENCE_LENGTH:
        frames_buffer.pop(0)
        return np.array(frames_buffer)

    return None

def mediapipe_detection(image, model):
    image = image.astype(np.uint8)

    if image.shape[2] == 3:
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

    # Start the WebSocket server
    start_server = websockets.serve(handle_connection, "localhost", 8080)

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
