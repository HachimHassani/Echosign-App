import React from 'react';
import { View, Image ,Text,SafeAreaView, StyleSheet } from 'react-native';
import Svg, { Path } from "react-native-svg";
import Styles from "app/GlobalStyles.js" ;
import BtnGreen from '../components/BtnGreen.js';
import BtnWhite from '../components/BtnWhite.js';
import { router } from 'expo-router';





export default function start() {

  const handleButtonPress = () => {
    // Handle button press logic here
    console.log('Button pressed!');
  };

  return (
    <SafeAreaView className="flex-1 items-center ">

      <View className="absolute mt-[120%] mr-[100%]">
      <Svg width="110" height="106" viewBox="0 0 110 106" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M71.0473 89.6035C72.1225 77.8897 78.6561 73.5327 91.0616 73.7113C106.527 73.9256 107.271 84.4251 108.016 92.7105C108.719 100.71 102.144 106.067 91.475 105.495C79.3177 104.853 70.7992 97.8531 71.0473 89.6035Z" fill="#1AA6B7" opacity="0.12"/>
        <Path d="M101.937 31.0345C90.7312 29.9989 77.9535 29.8561 75.5138 17.071C74.604 12.3569 77.0023 3.92867 80.5999 2.53587C87.1748 0.035987 98.9188 -1.35696 102.971 1.9286C112.689 9.78539 112.317 20.6064 101.937 31.0345Z" fill="#1AA6B7" opacity="0.12"/>
        <Path d="M36.5604 96.0672C33.5418 98.3885 29.0344 104.388 23.0798 105.781C14.3132 107.852 -0.325301 94.7814 0.0055115 86.6032C0.377676 77.4965 7.40755 73.461 16.9184 72.7824C27.5044 72.0325 36.2296 81.1036 36.5604 96.0672Z" fill="#1AA6B7" opacity="0.12"/>
        <Path d="M14.4365 33.8191C6.91055 25.3195 -2.84828 17.1415 5.7942 6.99909C9.51584 2.64215 20.0605 0.106573 26.7595 0.999389C30.8946 1.57079 35.8153 9.96317 36.3942 15.1772C37.7588 27.1767 26.718 30.748 14.4365 33.7836V33.8191Z" fill="#1AA6B7" opacity="0.12"/>
      </Svg>
      </View>

        
      <View className="container h-[13%] justify-center  items-center py-4">
        <Image
        className="h-full w-[45%] "
        source={require('../assets/Logo_EcoSign_final.png')}
        resizeMode='contain'
        />
      </View>

      <View className="container h-[15%] justify-center  items-center">
        <Text className="text-black text-3xl opacity-70 font-medium leading-loose mb-2">Welcome To EchoSign</Text>
         <Text className="px-7 text-center text-black text-md opacity-60 ">complete app to start learning sign language and 
            get along with the deaf-mute community</Text>
      </View>

       <View className="container h-[48%] justify-center  items-center">
            <Image
            className="h-full w-[80%] "
            source={require('../assets/1stmasct.png')}
            resizeMode='contain'
            />
       </View>

       <View className="flex flex-col h-[24%] justify-center ">
        <View className="flex flex-row justify-center mb-4">
             <BtnGreen title="Get Started" onPress={()=>router.push('/getStarted')} paddingHorizontal={105} />
        </View>
        <View className="flex flex-row justify-center mb-4">
             <BtnWhite title="I already have an account" onPress={()=>router.push('/login')} paddingHorizontal={47}  />
        </View>
       </View>
    

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Styles
});