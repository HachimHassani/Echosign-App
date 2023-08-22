
import React from 'react';
import { View, Image ,Text,SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import BtnGreen from '../components/BtnGreen.js';
import BtnWhite from '../components/BtnWhite.js';


export default function getStarted() {

  const handleButtonPress = () => {
    
    console.log('Button pressed!');
  };

  return (
    <View className="flex-1 items-center bg-cyan-400 ">
      <StatusBar hidden />

      <View className="absolute mt-[120%] mr-[100%]">

      </View>

      
      <View className="flex w-full h-[60%] justify-center items-center p-2">
        <View className="container h-[20%] justify-center  items-center">
          <Image
          className="h-full w-[40%] "
          source={require('../assets/Logo_EcoSign_White.png')}
          resizeMode='contain'
          />
        </View>
        <View className="container h-[80%] justify-center  items-center">
            <Image
            className="h-full w-[90%] "
            source={require('../assets/Mascot6.png')}
            resizeMode='contain'
            />
       </View>

      </View>

      <View className="flex w-full h-[40%] rounded-t-[30] justify-center items-center bg-white p-2 ">
        <View className="flex h-[70%] justify-center mt-0">
          <Text className="text-black text-3xl font-medium leading-9 mb-4 ml-5">
            
            Let’s start  
            <Text className="text-4xl text-[#1AA6B7] font-bold "> Speaking{"\n"}</Text>with our 
            <Text className="text-4xl text-[#1AA6B7] font-bold"> Hands</Text>
            </Text>
          <Text className="  text-black text-md opacity-60 mx-5 ">complete app to start learning sign language and 
get along with the deaf-mute community</Text>
        </View>
        <View className="flex flex-col h-[30%]">
          <View className="flex flex-row justify-center ">
              <BtnGreen title="Get Started" onPress={handleButtonPress} paddingHorizontal={105} />
          </View>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

});