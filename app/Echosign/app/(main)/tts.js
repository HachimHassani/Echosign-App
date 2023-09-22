import { Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import { API, Predictions,Storage } from 'aws-amplify';
import { decode } from 'base-64';
import { useUser } from '../../context/auth';
import { Button } from '@rneui/themed';

const Ttspage = () => {
  const apiName = 'apiEchsign';
  const user = useUser();

  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioPermission, setAudioPermission] = useState(null);


  //tts stuff
  const [text, setText] = useState('hello world');

  useEffect(() => {
    async function getPermission() {
      await Audio.requestPermissionsAsync().then((permission) => {
        console.log('Permission Granted: ' + permission.granted);
        setAudioPermission(permission.granted);
      }).catch(error => {
        console.log(error);
      });
    }

    getPermission();

    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();
      console.log('Starting Recording');
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('recording');
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  }

  async function stopRecording() {
    try {
      if (recordingStatus === 'recording') {
        console.log('Stopping Recording');
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();

       // Read the audio data as binary data
       const audioData = await FileSystem.readAsStringAsync(recordingUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert Base64 audio data to binary buffer
      const binaryData = decode(audioData);
      const buffer = new ArrayBuffer(binaryData.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < binaryData.length; i++) {
        view[i] = binaryData.charCodeAt(i);
      }

      // Use AWS Transcribe to transcribe the audio
      const transcriptionResult = await Predictions.convert({
        transcription: {
          source: {
            bytes: buffer,
          },
          language: 'en-US', // Modify the language as needed
        },
      }).then(({ transcription }) => { console.log('Transcription result:', JSON.stringify(transcription  , null, 2))});

      console.log('Transcription result:', JSON.stringify(transcriptionResult, null, 2));
      // Play the recorded audio
      const { sound: playbackSound } = await Audio.Sound.createAsync(
        { uri: `data:audio/wav;base64,${buffer}` },
        { shouldPlay: true }
      );
      await playbackSound.playAsync();

        // Reset our states to record again
        setRecording(null);
        setRecordingStatus('stopped');
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      await stopRecording(recording);
    } else {
      await startRecording();
    }
  }

  async function ttshandle() {
    try {
      const response = await API.post(apiName, '/predict/tts', {
        headers: {
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`
          },
        body: {
          text: text,
          },
          });
      console.log(response);
       // Add a 1.5-second delay before playing the audio
  await new Promise(resolve => setTimeout(resolve, 15000));

  console.log('1.5 seconds have passed, now playing audio.');
      const { sound } = await Audio.Sound.createAsync(
        { uri: response.mp3FileURL },
      );
      await sound.playAsync();
      console.log('Playing audio');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter text to be spoken"
        onChangeText={(newText) => setText(newText)} // Update the 'text' state when the user types
        value={text} // Bind the input value to the 'text' state
      />
      {/* <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
        <FontAwesome name={recording ? 'stop-circle' : 'circle'} size={64} color="white" />
      </TouchableOpacity> */}
      <Text style={styles.recordingStatusText}>{`Recording status: ${recordingStatus}`}</Text>
      <Button onPress={ttshandle}>Speak</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'red',
  },
  recordingStatusText: {
    marginTop: 16,
  },
});

export default Ttspage;