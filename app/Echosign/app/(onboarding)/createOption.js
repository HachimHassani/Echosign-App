
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
    <SafeAreaView className="flex-1 items-center bg-[#1AA6B7]">
      <StatusBar hidden />
      <View className="flex w-full h-[13%] justify-center items-center">
        <View className="container h-[70%] justify-center  items-center">
          <Image
            className="h-full w-full "
            source={require("../assets/Icon_white.png")}
            resizeMode="contain"
          />
        </View>
      </View>

      <View className="flex w-full h-[87%] rounded-t-[30] justify-center items-center bg-white ">
        <View className="flex h-[30%] justify-center">
          <Text className="text-black text-2xl opacity-60 font-medium leading-loose mb-4 px-7">
            Now create an account !
          </Text>
          <Text className="px-7  text-black text-md opacity-60 mb-3 ">
            You have to create an account to join the deaf-mute community and
            talk to peaople all around the globe !
          </Text>
          <Text className="px-7  text-black text-md opacity-60 underline">
            already have an accout ? log in
          </Text>
        </View>

        <View className="container h-[55%] justify-center  items-center">
          <Image
            className="h-full w-[80%] "
            source={require("../assets/Mascot2.png")}
            resizeMode="contain"
          />
        </View>

        <View className="flex flex-row h-[15%] space-x-[10%] justify-center items-center">
          <View className="flex justify-center ">
            <BtnWhite
              title="Back"
              onPress={() => router.back()}
              paddingHorizontal={40}
            />
          </View>
          <View className="flex justify-center ">
            <BtnGreen
              title="Next"
              onPress={() => router.replace("/signup")}
              paddingHorizontal={40}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});