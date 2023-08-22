import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { Link } from 'expo-router';

import BtnGreen from '../components/BtnGreen.js';
import BtnWhite from '../components/BtnWhite.js';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GetStarted() {
  const handleButtonPress = () => {
    console.log('Button pressed!');
  };

  return (
    
    <SafeAreaView  className=" absolute translate-y-0 flex-1 w-[100%] h-[110%] bg-cyan-400 ">


      
      <View className="flex w-full h-[60%] justify-center items-center">
        <View className="container h-[20%]  justify-center items-center">
          <Image
            className="h-full w-[40%]"
            source={require('../assets/Logo_EcoSign_White.png')}
            resizeMode='contain'
          />
        </View>
        <View className="container h-[80%] justify-center items-center">
          <Image
            className="h-full w-[90%]"
            source={require('../assets/Mascot6.png')}
            resizeMode='contain'
          />
        </View>
      </View>

      <View className="flex w-full h-[50%] rounded-t-[30] justify-center items-center bg-white">
        <View className="flex h-[50%]  mt-0 ">
          <Text className="text-black text-3xl font-medium leading-9  mb-4 ml-10 pt-5">
            Let’s start
            <Text className="text-4xl text-[#1AA6B7] font-bold "> Speaking{"\n"}</Text>with our
            <Text className="text-4xl text-[#1AA6B7] font-bold"> Hands</Text>
          </Text>
          <Text className="text-black text-md opacity-60 mx-9">
            Complete app to start learning sign language and get along with the deaf-mute community
          </Text>
        </View>
        <View className="flex flex-col h-[35%]  ">
          
            <BtnGreen title="Get Started" onPress={handleButtonPress} paddingHorizontal={105} />
         
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Your custom styles can be added here if needed
  
});
