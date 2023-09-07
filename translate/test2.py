import cv2
import asyncio
import websockets

# Function to handle frames and send them to the WebSocket server
async def send_frames():
    uri = "ws://localhost:8080"  # WebSocket server address with the '/test' namespace

    # Initialize the WebSocket connection
    async with websockets.connect(uri) as websocket:
        print('Connected to server')

        # Start capturing frames from the webcam
        cap = cv2.VideoCapture(0)

        if not cap.isOpened():
            print('Error: Could not open webcam')
            return

        try:
            while True:
                ret, frame = cap.read()
                if not ret:
                    break

                # Encode the frame as JPEG
                _, img_encoded = cv2.imencode('.jpg', frame)

                # Send the frame to the server via WebSocket
                await websocket.send(img_encoded.tobytes())

                # Display the frame locally (optional)
                cv2.imshow('Client Frame', frame)

                # Exit the loop if 'q' is pressed
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
        except websockets.exceptions.ConnectionClosedError:
            print('Server disconnected')

    # Release the webcam and close OpenCV windows
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(send_frames())
