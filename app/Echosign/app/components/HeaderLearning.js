import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";

const HeaderLearning = () => {
  const windowWidth = Dimensions.get("window").width;

  return (
    <View className="flex flex-row justify-evenly items-center">
      <TouchableOpacity className="h-[100%] w-[10%] justify-center items-center mx-2" onPress={()=>router.back()}>
        <Image source={require("../assets/flecheG.png")} resizeMode="contain" />
      </TouchableOpacity>
      <View
        className="h-[50%] w-[60%] justify-evenly items-center"
        style={{
          backgroundColor: "#1AA6B7",

          borderRadius: 35,
          // Add shadows based on platform
          ...Platform.select({
            ios: {
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            },
            android: {
              elevation: 6,
            },
          }),
        }}
      >
        <Text className="text-2xl text-center text-white font-bold">
          The Alphabets
        </Text>
      </View>
      <View className="h-[100%] w-[20%]">
        <Image
          style={{
            height: "100%",
            width: "100%",
          }}
          source={require("../assets/Mascot5.png")}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default HeaderLearning;
