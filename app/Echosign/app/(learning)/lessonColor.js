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
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const LessonColor = () => {
  const screenWidth = Dimensions.get("window").width;

  // Calculate the width for each flex item based on screen width and number of items per row
  const itemsPerRow = 2; // You can adjust this based on your design
  const flexItemWidth = (screenWidth - 20) / itemsPerRow; // Subtract any margin or padding

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-row h-[10%] w-[100%]">
        <TouchableOpacity
          className="h-[100%] w-[10%] mx-[5%] justify-center items-center  "
          onPress={() => router.back()}
        >
          <Image
            source={require("../assets/flecheG.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View
          className="h-[70%] w-[55%] rounded-3xl mt-[4%] justify-center items-center  bg-[#1AA6B7]"
          style={{
            // Ajoutez des ombres en fonction de la plateforme
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
          <Text style={styles.title}>Colors ASL</Text>
        </View>
        <View className="h-[100%] w-[22%] mx-[2%] ">
          <Image
            style={{
              height: "100%",
              width: "80%",
            }}
            source={require("../assets/Mascot5.png")}
            resizeMode="contain"
          />
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
    </SafeAreaView>
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
  title: {
    fontSize: 19,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 7,
    width: "100%",
  },
});

export default LessonColor;
