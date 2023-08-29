import { router } from "expo-router";
import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import HeaderLearning from "../components/HeaderLearning";

export default function LessonABC() {
  return (
    <View className="">
      <View className="m-[1%] h-[16%]">
        <HeaderLearning />
      </View>
      <ScrollView className=" h-[80%] w-full">
        <Image
          resizeMode='contain' 
        style={{ 
            width:450, height: 1050, alignSelf: 'center', marginTop: 10,  
        }}
    
          source={require("../assets/alphabets1.png")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  //...
});
