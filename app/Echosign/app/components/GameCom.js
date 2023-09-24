import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router"; 

import Svg, { Path } from "react-native-svg";
import * as Images from "../data/ImageImport.js";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameCom() {
  const arrayResponse = ["Pink", "White", "Yellow", "Cow", "Goat", "Lion"];
  const arrayimages = [
    Images[arrayResponse[0]],
    Images[arrayResponse[1]],
    Images[arrayResponse[2]],
    Images[arrayResponse[3]],
    Images[arrayResponse[4]],
    Images[arrayResponse[5]],
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [button1Color, setButton1Color] = useState("#D6FBFF");
  const [button2Color, setButton2Color] = useState("#D6FBFF");
  const [buttonMessage, setButtonMessage] = useState("Select the right answer");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * arrayimages.length);
    setSelectedImageIndex(randomIndex);
  }, []);

  const handleNextQuestionClick = () => {
    const randomIndex = Math.floor(Math.random() * arrayimages.length);
    setSelectedImageIndex(randomIndex);
    setButton1Color("#D6FBFF"); // Reset button 1 color
    setButton2Color("#D6FBFF"); // Reset button 2 color
    setButtonMessage("Select the right answer");
  };

  const handleAnswerButtonClick = (answer, buttonNumber) => {
    if (answer === arrayResponse[selectedImageIndex]) {
      if (buttonNumber === 1) {
        setButton1Color("#4CAF50"); // Green color for correct answer
        setButton2Color("#D6FBFF"); // Reset the color of the other button
      } else {
        setButton1Color("#D6FBFF"); // Reset the color of the other button
        setButton2Color("#4CAF50"); // Green color for correct answer
      }
      setButtonMessage("Amazing! Good job");
    } else {
      setButton1Color("#F44336"); // Red color for wrong answer
      setButton2Color("#F44336"); // Red color for wrong answer
      setButtonMessage("Oops... try again");
    }
  };

  return (
    <SafeAreaView>
      <View className="h-[8%] flex-row">
        <TouchableOpacity
          className="w-[19%] items-center justify-center "
          onPress={() => router.back()}
        >
          <Svg
            width={28}
            height={27}
            viewBox="0 0 31 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M28.584 2L2.144 27.182m26.44 0L2.144 2l26.44 25.182z"
              stroke="#B6B6B8"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <View className="w-[80%] items-center justify-center ">
          <View className="bg-[#1AA6B7] h-3 w-[72%] rounded-3xl "></View>
        </View>
      </View>
      <View className=" h-[52%] flex-col">
        <View className="items-center justify-center h-[16%]">
          <Text className="font-semibold text-lg">
            What does this sign mean?
          </Text>
        </View>
        <View className=" h-[80%]">
          <Image
            style={{
              height: "100%",
              width: "100%",
            }}
            source={arrayimages[selectedImageIndex]}
            resizeMode="contain"
          />
        </View>
      </View>
      <View className=" h-[14%] flex-row justify-around p-[2%]">
        <TouchableOpacity
          style={{ backgroundColor: button1Color }}
          className=" w-[42%] rounded-full justify-center items-center p-[3%]"
          onPress={() =>
            handleAnswerButtonClick(
              arrayResponse[Math.floor(Math.random() * 6)],
              1
            )
          }
        >
          <Text className="text-gray-800 text-xl font-Medium">
            {arrayResponse[Math.floor(Math.random() * 6)]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: button2Color }}
          className=" w-[42%] rounded-full justify-center items-center p-[3%]"
          onPress={() =>
            handleAnswerButtonClick(arrayResponse[selectedImageIndex], 2)
          }
        >
          <Text className="text-gray-800 text-xl font-Medium ">
            {arrayResponse[selectedImageIndex]}
          </Text>
        </TouchableOpacity>
      </View>
      <View className=" h-[26%] justify-center items-center">
        <View className="bg-slate-100 h-[80%] w-[75%] rounded-3xl justify-end items-center">
          <View className="h-[40%] w-[76%] justify-center items-center">
            <Text className="text-gray-600 text-lg font-light">
              {buttonMessage}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleNextQuestionClick}
            className="bg-white opacity-60 h-[50%] w-[84%] rounded-3xl mb-3 justify-center items-center "
          >
            <Text className="text-gray-900 text-xl font-Medium">
              Next Question!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
