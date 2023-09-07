// CameraComponent.js
import React from 'react';
import { RNCamera } from 'react-native-camera';

const CameraComponent = () => {
  return (
    <RNCamera
      style={{ flex: 1 }}
      type={RNCamera.Constants.Type.back}
      // Additional camera configuration here
    />
  );
};

export default CameraComponent;
