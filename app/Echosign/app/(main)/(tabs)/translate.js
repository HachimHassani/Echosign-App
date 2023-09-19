import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet , TouchableOpacity, Image } from 'react-native';
import { Auth, API } from 'aws-amplify';    
import { Tab, TabView } from '@rneui/themed';
import CameraPage from '../cameraa';
import Ttspage from '../tts';
import { useUser } from '../../../context/auth';


const UserScreen = () => {

  const [index, setIndex] = React.useState(0);

  

  return (
  <>
  <Tab
    value={index}
    onChange={(e) => setIndex(e)}
    indicatorStyle={{
      backgroundColor: 'white',
      height: 3,
    }}
    variant="primary"
  >
  <Tab.Item
      title="sign translations"
      titleStyle={{ fontSize: 12 }}
      icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
    />
    <Tab.Item
      title="text to speech"
      titleStyle={{ fontSize: 12 }}
      icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
    />
    
    
  </Tab>

  <TabView value={index} onChange={setIndex} animationType="spring">
  <TabView.Item style={{  width: '100%' }}>
      <CameraPage/>
    </TabView.Item>
    <TabView.Item style={{  width: '100%' }}>
      <Ttspage/>
    </TabView.Item>
    
    
  </TabView>
</>);
  };

export default UserScreen;