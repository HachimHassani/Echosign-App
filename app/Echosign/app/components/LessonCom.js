import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import LongCard from "../components/LongCard";
import HandSvg from "./HandSvg";


export default function LessonCom() {
  return (
    <View>
      <View className="h-[20%] mx-[3%] flex-row">
        <View className=" ml-[23] w-[55%] justify-center mt-6">
          <Text className="text-3xl text-left font-semibold  pb-2 text-[#1AA6B7]">
        Let’s Learn it the right way !
          </Text>
          <Text className="text-sm text-left  text-[#1AA6B7] opacity-50">
        Alphabet is the building block of any language.
          </Text>
        </View>
        <View className=" w-[35%] items-center justify-center ">
          <HandSvg />
        </View>
      </View>
      <ScrollView className="h-[77%] m-[3%] bg-red-200 ">
        
      </ScrollView>
    </View>
  );
}
