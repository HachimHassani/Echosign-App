import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as Images from "../data/ImageImport.js";

const ChoiceCard = ({ data, id, redirect }) => {
  const windowWidth = Dimensions.get("window").width;

  const selectedImage = Images[`img${id}`];
  const selectedLogo = Images[`logo${id}`];

  return (
    <TouchableOpacity
      style={{
        backgroundColor: data.backgroundColor,
        width: (windowWidth - 50) * 0.5,
        height: (windowWidth - 50) * 0.5,
        borderRadius: 49,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 7,
      }}
      onPress={() => redirect()}
    >
      <View
        className=""
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{
            height: "100%",
            width: "60%",
          }}
          source={selectedImage}
          resizeMode="contain"
        />
        <Image
          className="mx-[8%] "
          style={{
            height: "100%",
            width: "20%",
          }}
          source={selectedLogo}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 0.6 }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            opacity: 0.9,
          }}
        >
          {data.title}
        </Text>
        <Text style={{ color: "white", fontSize: 12, opacity: 0.6 }}>
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Define your styles here if needed
});

export default ChoiceCard;
