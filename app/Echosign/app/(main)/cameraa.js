import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Camera, requestPermissionsAsync } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons library
import { Storage, API } from 'aws-amplify';
import { useUser } from '../../context/auth';

const CameraPage = () => {
  const apiName = 'apiEchsign';
  const user = useUser();
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [video, setVideo] = useState(null);
  const [videourl, setVideourl] = useState('s3://echosign-storage-8a021856220811-staging/public/videos/myVideo.mp4');
  const [showLoading, setShowLoading] = useState(false);
  const [showDelayWarning, setShowDelayWarning] = useState(false);
  const [predictionResponse, setPredictionResponse] = useState(''); // Added prediction response state
  useEffect(() => {
    if (isRecording) {
      setTimeout(() => {
        setShowLoading(false);
        stopRecording();
                  
        
        }, 1500);
    } else {
      console.log('Recording stopped');
    }
  }, [isRecording]);
  requestPermission();
  const cameraRef = useRef(null);
  const videoRef = useRef(null);

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        const { status } = await requestPermission();

        if (status === 'granted') {
          setIsRecording(true);
          console.log('start recording',isRecording);
          

          console.log('start recording');
          const videoData = await cameraRef.current.recordAsync({
            quality: Camera.Constants.VideoQuality['4:3'],
          });

          setVideo(videoData);

          console.log('uploading video to S3', videoData.uri);
          await uploadVideoToS3(videoData);

          await makePredictionAPIRequest();
          setShowLoading(false);
        } else {
          setCameraPermission(false);
        }
      } catch (error) {
        console.error(error);
        setShowLoading(false);
      }
    }
  };

  const startRecordingWithDelay = () => {
    setShowDelayWarning(true);

    setTimeout(() => {
      setShowDelayWarning(false);
      startRecording(); // Start recording after 3 seconds
    }, 3000); // Delay for 3 seconds before starting recording
  };

  const stopRecording = async () => {
    console.log('stopping recording',isRecording);
    if (isRecording) {
      try {
        await cameraRef.current.stopRecording();
        console.log('stop recording');
        setIsRecording(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const uploadVideoToS3 = async (videoFile) => {
    try {
      setIsUploading(true);
      const videoData = await fetch(videoFile.uri);
      const blob = await videoData.blob();
      const res = await Storage.put('videos/myVideo.mp4', blob, {
        contentType: 'video/mp4',
      });
      setVideourl('s3://echosign-storage-8a021856220811-staging/public/' + res.key);
      console.log('Uploaded video to S3', res.key);
      setIsUploading(false);
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  const makePredictionAPIRequest = async () => {
    try {
     // Define your API endpoint and request parameters
    // Replace with your API name
    const path = '/sign'; // Replace with the correct API path
    const myInit = {
      headers: {
        Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        'Content-Type': 'application/json',
      },
      queryStringParameters: {
        s3_uri: videourl,
      },
    };

    console.log('Making API request with parameters:', myInit);

    // Make the API request
    const response = await API.post(apiName, path, myInit);

    console.log('API Response:', response);

    // Parse the JSON response
    const responseBody = JSON.parse(response.body);

    if (responseBody.predictions && responseBody.predictions.length > 0) {
      // Format and set the prediction response text
      const formattedPredictions = responseBody.predictions.join(', ');
      setPredictionResponse(`${formattedPredictions}`);
    } else {
      setPredictionResponse('No predictions available.');
    }
  } catch (error) {
    console.error('API Error:', error);
    setPredictionResponse('Error fetching predictions.');

    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.front}
      ></Camera>
      <View style={styles.buttonsContainer}>
        {isRecording ? (
          <TouchableOpacity onPress={stopRecording}>
            <MaterialCommunityIcons name="crop-square" size={30} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecordingWithDelay}>
            <MaterialCommunityIcons
              name="record-circle"
              size={50}
              color="green"
            />
          </TouchableOpacity>
        )}
        {isUploading && (
          <ActivityIndicator size="small" color="#0000ff" />
        )}
        {showLoading && <Text>Waiting for predictions...</Text>}
        {showDelayWarning && <Text>Starting in 3 seconds...</Text>}
      </View>
      <Text style={styles.predictionText}>Sign Prediction :</Text>
      <Text style={styles.responseText}>{predictionResponse}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  camera: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  predictionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    color: "#1AA6B7",
  },
  responseText: {
    fontSize: 16,
    margin: 10,
    textAlign: "left",
  },
});

export default CameraPage;
