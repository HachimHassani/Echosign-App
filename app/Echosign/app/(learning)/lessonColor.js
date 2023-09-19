import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import HeaderLearning from "../components/HeaderLearning";

const LessonColor = () => {
  const screenWidth = Dimensions.get("window").width;

  // Calculate the width for each flex item based on screen width and number of items per row
  const itemsPerRow = 2; // You can adjust this based on your design
  const flexItemWidth = (screenWidth - 20) / itemsPerRow; // Subtract any margin or padding

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View className="flex flex-row justify-evenly items-center">
          <TouchableOpacity className="h-[100%] w-[10%] justify-center items-center mx-2">
            <Image
              source={require("../assets/flecheG.png")}
              resizeMode="contain"
            />
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
              Colors ASL
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
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.flexContainer}>
          <View style={[styles.flexItem, { width: flexItemWidth }]}>
            <Image
              source={require("../assets/color/blue.png")}
              style={styles.image}
            />
          </View>

          <View style={[styles.flexItem, { width: flexItemWidth }]}>
            <Image
              source={require("../assets/color/orange.png")}
              style={styles.image}
            />
          </View>

          <View style={[styles.flexItem, { width: flexItemWidth }]}>
            <Image
              source={require("../assets/color/purple.png")}
              style={styles.image}
            />
          </View>
          <View style={[styles.flexItem, { width: flexItemWidth }]}>
            <Image
              source={require("../assets/color/red.png")}
              style={styles.image}
            />
          </View>
          <View style={[styles.flexItem, { width: flexItemWidth }]}>
            <Image
              source={require("../assets/color/piink2.png")}
              style={styles.image}
            />
          </View>
          <View style={[styles.flexItem, { width: flexItemWidth }]}>
            <Image
              source={require("../assets/color/white.png")}
              style={styles.image}
            />
          </View>
          <View style={[styles.flexItem, { width: flexItemWidth }]}>
            <Image
              source={require("../assets/color/yellow.png")}
              style={styles.image}
            />
          </View>
          <View style={[styles.flexItem, { width: flexItemWidth }]}>
            <Image
              source={require("../assets/color/blue.png")}
              style={styles.image}
            />
          </View>

          <View style={[styles.flexItem, { width: flexItemWidth }]}>
            <Image
              source={require("../assets/color/orange.png")}
              style={styles.image}
            />
          </View>

          <View style={[styles.flexItem, { width: flexItemWidth }]}>
            <Image
              source={require("../assets/color/purple.png")}
              style={styles.image}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: "16%",
  },
  scrollView: {
    flex: 1,
  },
  flexContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10, // Add some padding to space out the items
  },
  flexItem: {
    marginVertical: 10,
  },
  image: {
    flex: 1,
    width: "100%",
    height: undefined,
    aspectRatio: 1, // Maintain aspect ratio
    resizeMode: "contain",
  },
});

export default LessonColor;
