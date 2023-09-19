
import React from 'react';
import { View, Image ,Text,SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { StatusBar } from 'expo-status-bar';

import BtnGreen from '../components/BtnGreen.js';
import BtnWhite from '../components/BtnWhite.js';
import { router } from 'expo-router';


export default function sinzee() {

  const handleButtonPress = () => {
    // Handle button press logic here
    console.log('Button pressed!');
  };

  return (
    <View className="flex-1 items-center bg-cyan-400">
      <StatusBar hidden />

      <View className="absolute mt-[0%] mr-[0%]">
    
      </View>

      
      <View className="flex w-full h-[13%] justify-center items-center">
        <View className="container h-[70%] justify-center  items-center">
          <Image
          className="h-full w-full "
          source={require('../assets/Icon_white.png')}
          resizeMode='contain'
          />
        </View>

      </View>

      <View className="flex w-full h-[87%] rounded-t-[30] justify-center items-center bg-white ">
        <View className="flex h-[30%] justify-center">
            <Text className="text-black text-2xl opacity-60 font-medium leading-loose mb-4 px-7">Hello , i am Sinzee !</Text>
            <Text className="px-7  text-black text-md opacity-60 ">"At Echosign, we're more than creators – we're stewards of inclusion and champions of innovation.”</Text>
        </View>

        <View className="container h-[55%] justify-center  items-center">
            <Image
            className="h-full w-[80%] "
            source={require('../assets/1stmasct.png')}
            resizeMode='contain'
            />
       </View>

        <View className="flex flex-row h-[15%] space-x-[10%] justify-center items-center">
            <View className="flex justify-center ">
                <BtnWhite title="Back" onPress={()=>router.back()} paddingHorizontal={40}  />
            </View>
            <View className="flex justify-center ">
                <BtnGreen title="Next" onPress={()=>router.push('/languages')} paddingHorizontal={40} />
            </View>
            
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

});