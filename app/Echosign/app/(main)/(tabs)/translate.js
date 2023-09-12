import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera,requestPermissionsAsync } from 'expo-camera';
import { Video } from 'expo-av';
import { Storage, API } from 'aws-amplify';

const CameraPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  requestPermission();
  const cameraRef = useRef(null);
  const videoRef = useRef(null);

  // Implement timer logic here

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        setIsRecording(true);
        // Start recording logic here
      } catch (error) {
        console.error(error);
      }
    }
  };

  const stopRecording = async () => {
    if (isRecording) {
      try {
        // Stop recording logic here
        setIsRecording(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const uploadVideoToS3 = async (videoFile) => {
    try {
      const response = await Storage.put('videos/myVideo.mp4', videoFile, {
        contentType: 'video/mp4',
      });
      // Handle the response or trigger API call
    } catch (error) {
      console.error(error);
    }
  };

  const makePredictionAPIRequest = async () => {
    try {
      // Make API request using Amplify API module
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Camera  style={{ width: '100%', aspectRatio: 1 }}>
        {/* Camera preview */}
      </Camera>
      {isRecording ? (
        <Text>Recording...</Text>
      ) : (
        <TouchableOpacity onPress={startRecording}>
          <Text>Start Recording</Text>
        </TouchableOpacity>
      )}
      {isRecording && (
        <TouchableOpacity onPress={stopRecording}>
          <Text>Stop Recording</Text>
        </TouchableOpacity>
      )}
      <Video ref={videoRef} style={{ width: '100%', height: 300 }} />
      {/* Timer display */}
      <TouchableOpacity onPress={uploadVideoToS3}>
        <Text>Upload to S3</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={makePredictionAPIRequest}>
        <Text>Make Prediction API Request</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraPage;
