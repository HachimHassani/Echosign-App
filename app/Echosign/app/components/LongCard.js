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

const LongCard = ({redirect}) => {
  const windowWidth = Dimensions.get("window").width;

  return (
    <TouchableOpacity
      onPress={() => redirect()}
      className="flex-row justify-evenly items-center p-2"
      style={{
        backgroundColor: "white",
        width: windowWidth - 30,
        height: (windowWidth - 30) * 0.5,
        borderRadius: 50,
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
      <Image
        className=""
        style={{
          height: "100%",
          width: "50%",
        }}
        source={require("../assets/mssg.png")}
        resizeMode="contain"
      />

      <View
        className="bg-[#DC2F2F] opacity-80 p-[6%]"
        style={{
          height: "100%",
          width: "50%",
          borderRadius: 50,
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
        <View
          className="justify-center items-center"
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Text className="text-white text-xl font-bold opacity-90 text-left mb-3">
            Messaging
          </Text>
          <Text className="text-white text-xs font-normal opacity-90 text-left">
            Join the world of EchoSign, talk to people all around the globe!
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default LongCard;
