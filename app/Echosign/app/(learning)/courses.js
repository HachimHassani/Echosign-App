import React from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import LogoImage from "../assets/fleche.png";
import ButtomBar from "../components/ButtomBar";
import MainHeader from "../components/MainHeader";
import ExploreEC from "../components/ExploreEC";
import ChoiceCard from "../components/ChoiceCards"; // Fixed import name
import LearnCard from "../components/LearnCard";
import LongCard from "../components/LongCard";
import cardsData from "../data/data.json";
import { router } from "expo-router";

export default function courses() {

    const windowWidth = Dimensions.get("window").width;

  const selectedLCardData1 = cardsData.find((card) => card.id === 5);
  const selectedLCardData2 = cardsData.find((card) => card.id === 6);
  const selectedLCardData3 = cardsData.find((card) => card.id === 7);
  const selectedLCardData4 = cardsData.find((card) => card.id === 8);
  const selectedLCardData5 = cardsData.find((card) => card.id === 9);

  return (
    <View className="flex-1 w-full h-full">
      <View className="h-[30%] mx-[4%] justify-center items-center">
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "18%",
          }}
        >
          <View
            style={{
              backgroundColor: "#FA8920",
              opacity: 0.3,
              width: windowWidth - 30,
              height: (windowWidth - 145) * 0.5,
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
              width: "60%",
              position: "absolute",
              top: "-12%",
              left: "20%",
            }}
            source={require("../assets/Mascot5.png")}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <View>
            <Text style={styles.buttonText}>Learn with Sinzee !</Text>
            <Text style={styles.buttonSubText}>
              Discover EchoSign’s lessons ...
            </Text>
          </View>
          <Image source={LogoImage} />
        </TouchableOpacity>
      </View>

      <ScrollView className="h-[60%] px-[2%]">
        <View className="m-[5%]">
          <Text className="text-black text-xl font-bold opacity-90 text-left">
            Popular lessons ..
          </Text>
          <Text className="text-black text-xs opacity-70 text-left">
            Learn the most popular lessons
          </Text>
        </View>

        <View className="justify-center items-center space-y-4">
          <View className=" flex-row justify-evenly items-center ">
            <LearnCard data={selectedLCardData2} id={selectedLCardData2.id} redirect={()=>router.push('/lessonABC')}/>
            <LearnCard data={selectedLCardData3} id={selectedLCardData3.id} redirect={()=>router.push('/lessonABC')}/>
          </View>
          <View className=" flex-row justify-evenly items-center ">
            <LearnCard data={selectedLCardData1} id={selectedLCardData1.id} redirect={()=>router.push('/lessonABC')}/>
            <LearnCard data={selectedLCardData4} id={selectedLCardData4.id} redirect={()=>router.push('/lessonABC')}/>
          </View>
          <View>
            <LearnCard data={selectedLCardData5} id={selectedLCardData5.id} redirect={()=>router.push('/lessonABC')}/>
          </View>
        </View>
      </ScrollView>
      <View className="h-[10%] mx-[6%]">
        
      </View>
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
    top: "45%",
    width: "92%",
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
    fontSize: 18,
    opacity: 0.8,
    fontWeight: "500",
    lineHeight: 26,
  },
  buttonSubText: {
    color: "black",
    fontSize: 13,
    opacity: 0.6,
  },
});
