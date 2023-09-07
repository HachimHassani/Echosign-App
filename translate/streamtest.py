import cv2
import socket
import base64
import numpy as np
import time
import mediapipe as mp
import sagemaker
from sagemaker.tensorflow.model import TensorFlowPredictor

# UDP server setup
BUFF_SIZE = 65536
server_socket = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
server_socket.setsockopt(socket.SOL_SOCKET,socket.SO_RCVBUF,BUFF_SIZE)
host_name = socket.gethostname()
host_ip = 'localhost'#  socket.gethostbyname(host_name)
print(host_ip)
port = 8080
message = b'Hello'
socket_address = (host_ip,port)
server_socket.bind(socket_address)
print('Listening at:',socket_address)
# Initialize MediaPipe and SageMaker predictor
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

endpoint_name = 'EchosignLive'  # Replace with your endpoint name
sagemaker_session = sagemaker.Session()
predictor = TensorFlowPredictor(endpoint_name, sagemaker_session)

def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) 
    image.flags.writeable = False                 
    results = model.process(image)               
    image.flags.writeable = True                  
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR) 
    return image, results


def draw_landmarks(image, results):
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS) # Draw left hand connections
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS) # Draw right

    

def draw_styled_landmarks(image, results):

    # Draw left hand connections
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS, 
                             mp_drawing.DrawingSpec(color=(121,22,76), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(121,44,250), thickness=2, circle_radius=2)
                             ) 
    # Draw right hand connections  
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS, 
                             mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
                             ) 

    

colors = [
    (245, 117, 16), (117, 245, 16), (16, 117, 245), (245, 16, 117), (117, 16, 245),
    (255, 0, 0), (0, 255, 0), (0, 0, 255), (255, 255, 0), (255, 0, 255),
    (0, 255, 255), (128, 0, 0), (0, 128, 0), (0, 0, 128), (128, 128, 0),
    (128, 0, 128), (0, 128, 128), (128, 128, 128), (64, 0, 0), (0, 64, 0),
    (0, 0, 64)
]

def prob_viz(res, actions, input_frame, colors):
    output_frame = input_frame.copy()
    for num, prob in enumerate(res):
        cv2.rectangle(output_frame, (0,60+num*40), (int(prob*100), 90+num*40), colors[num], -1)
        cv2.putText(output_frame, actions[num], (0, 85+num*40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
        
    return output_frame


def extract_keypoints(results):
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([ lh, rh])
# Create a SageMaker predictor by specifying the endpoint
endpoint_name = 'EchosignLive'  # Replace with your endpoint name
sagemaker_session = sagemaker.Session()
predictor = TensorFlowPredictor(endpoint_name, sagemaker_session)

mp_holistic = mp.solutions.holistic 
mp_drawing = mp.solutions.drawing_utils

# 1. New detection variables
sequence = []
sentence = []

threshold = 0.9
actions = np.array(["salam", "labasse", "kidayre", "chokran", "ana", "farhane", "hitache", "ah", "jihaz", "sahal leia", "tawasole"])

no_sequences = 30
sequence_length = 30
num_classes = len(actions)

fps, st, frames_to_count, cnt = (0, 0, 10, 0)
sequence = []

while True:
    msg,client_addr = server_socket.recvfrom(BUFF_SIZE)
    print('GOT connection from ',client_addr)
    WIDTH=400
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        while True:
            packet, _ = server_socket.recvfrom(BUFF_SIZE)
            if len(packet) <= 0:
                continue
            data = base64.b64decode(packet, ' /')
            npdata = np.frombuffer(data, dtype=np.uint8)
            frame = cv2.imdecode(npdata, 1)

            # Make detections
            image, results = mediapipe_detection(frame, holistic)

            # Draw landmarks
            draw_styled_landmarks(image, results)

            # Prediction logic
            keypoints = extract_keypoints(results)
            sequence.append(keypoints)
            sequence = sequence[-30:]
            cnt += 1
            if len(sequence) == 30 and cnt >= frames_to_count:
                cnt = 0
                res = predictor.predict(np.expand_dims(sequence, axis=0))["predictions"][0]
                print(actions[np.argmax(res)])

                # Viz logic
                if res[np.argmax(res)] > threshold:
                    if len(sentence) > 0:
                        if actions[np.argmax(res)] != sentence[-1]:
                            sentence.append(actions[np.argmax(res)])
                    else:
                        sentence.append(actions[np.argmax(res)])
                    server_socket.sendto(actions[np.argmax(res)].encode('utf-8'),(client_addr[0],8089))
                if len(sentence) > 5:
                    sentence = sentence[-5:]

                # Viz probabilities
                image = prob_viz(res, actions, image, colors)

            cv2.rectangle(image, (0, 0), (640, 40), (245, 117, 16), -1)
            cv2.putText(image, ' '.join(sentence), (3, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

            # Show to screen
            # cv2.imshow('OpenCV Feed', image)
            # key = cv2.waitKey(1) & 0xFF
            # if key == ord('q'):
            #     server_socket.close()
            #     break