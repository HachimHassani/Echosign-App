import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router"; 
import ButtomBar from "../components/ButtomBar";
import LogoImage from "../assets/flecheD.png";
import LocalImageGrid from "../components/LocalImageGrid";



export default function echoSign() {
  
  return (
    <View className="flex-1 w-full h-full">
      <View className="h-[85%] my-[4%] mx-[5%] p-[2%] rounded-3xl">
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => router.push("/mainPage")}
        >
          <View>
            <Text style={styles.buttonText}>Explore the Innovation!</Text>
            <Text style={styles.buttonSubText}>
              Discover EchoSign’s features ...
            </Text>
          </View>
          <Image source={LogoImage} />
        </TouchableOpacity>

        <ScrollView className="mt-[5%] " onPress={() => router.back()}>
          <View className="m-2 mb-6">
            <Text className="text-black text-2xl font-bold opacity-90 text-left">
              what is <Text className="text-[#1AA6B7]">EchoSign ?</Text>
            </Text>
            <View className="h-2"></View>
            <Text className="text-black font-medium text-sm opacity-80 text-left">
              Through a combination of advanced technology, including cameras
              and sophisticated software, EchoSign captures sign language
              gestures and translates them instantly into spoken language, and
              vice versa.
            </Text>
          </View>

          <View className="m-2 mb-6">
            <Text className="text-black text-2xl font-bold opacity-90 text-left">
              Our <Text className="text-[#1AA6B7]">Story ...</Text>
            </Text>
            <View className="h-2"></View>
            <Text className="text-black font-medium text-sm opacity-80 text-left">
              Driven by a shared passion for creating positive change, we set
              out to bridge the communication gap and empower those often
              marginalized by society. Echosign became our beacon of hope, a
              revolutionary concept designed to amplify voices that had long
              been silenced.
            </Text>
          </View>

          <View className="m-2 mb-6">
            <Text className="text-black text-2xl font-bold opacity-90 text-left">
              About<Text className="text-[#1AA6B7]"> Us...</Text>
            </Text>
            <View className="h-2"></View>
            <Text className="text-black font-medium text-lg opacity-80 text-center">
              "At Echosign, we're more than creators – we're stewards of
              inclusion and champions of innovation.”
            </Text>
          </View>

          <ScrollView horizontal className="m-2 mb-6">
            <LocalImageGrid />
          </ScrollView>
        </ScrollView>
      </View>

      <View className="h-[10%] mx-[6%] justify-center ">
        <ButtomBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "white",
    marginTop: "7%",
    padding: "7%",
    borderRadius: 999, // Use a large value for circular shape
    flexDirection: "row",
    justifyContent: "space-around",
    width: "%",
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
