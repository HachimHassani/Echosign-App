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
import { router } from "expo-router";
import LogoImage from "../assets/fleche.png";

const ExploreEC = ({}) => {
  const windowWidth = Dimensions.get("window").width;
  

  return (
    <View
      style={{ justifyContent: "space-between", marginHorizontal: "5%" }}
     
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "24%",
        }}
      >
        <View
          style={{
            backgroundColor: "#B6E5EA",
            width: windowWidth - 30,
            height: (windowWidth - 30) * 0.5,
            borderRadius: 55,
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
        />
        <Image
          style={{
            height: "100%",
            width: "63%",
            position: "absolute",
            top: "0%",
            left: "20%",
          }}
          source={require("../assets/1stmasct.png")}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => router.push("/echoSign")}
      >
        <View>
          <Text style={styles.buttonText}>Explore the Innovation!</Text>
          <Text style={styles.buttonSubText}>
            Discover EchoSign’s features ...
          </Text>
        </View>
        <Image source={LogoImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "white",
    padding: "7%",
    borderRadius: 999, // Use a large value for circular shape
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    top: "60%",
    width: "100%",
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
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    opacity: 0.6,
    fontWeight: "500",
    lineHeight: 26,
  },
  buttonSubText: {
    color: "black",
    fontSize: 16,
    opacity: 0.6,
  },
});

export default ExploreEC;
