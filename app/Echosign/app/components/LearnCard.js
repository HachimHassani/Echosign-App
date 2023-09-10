import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";

import * as Images from "../data/ImageImport.js"; // Make sure to import your image sources

const LearnCard = ({ data, id,redirect }) => {
  const windowWidth = Dimensions.get("window").width;

  const selectedImage = Images[`img${id}`]; // Change "abcss" to the appropriate image key
  // You can similarly define selectedTitle and selectedDescription from your JSON data

  return (
    <TouchableOpacity
      className="flex-col justify-center items-center py-2"
      style={{
        backgroundColor: data.backgroundColor,
        width: (windowWidth - 60) * 0.5,
        height: (windowWidth + 20) * 0.5,
        borderRadius: 50,
        marginHorizontal: 7,
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
      onPress={()=>redirect()}
    >
      <Image
        className=""
        style={{
          height: "60%",
          width: "80%",
        }}
        source={selectedImage} // Use the selectedImage variable here
        resizeMode="contain"
      />

      <View className="flex-col">
        <Text className="text-white text-xl font-bold opacity-90 text-left">
          {data.title} {/* Use the selectedTitle variable here */}
        </Text>
        <Text className="text-white text-xs opacity-70 text-left">
          {data.description} {/* Use the selectedDescription variable here */}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default LearnCard;
