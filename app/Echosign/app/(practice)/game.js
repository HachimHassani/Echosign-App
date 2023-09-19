import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import GameCom from "../components/GameCom";

export default function echoSign() {
  return (
    <View className="flex-1 w-full h-full justify-center items-center">
      <GameCom />
    </View>
  );
}


