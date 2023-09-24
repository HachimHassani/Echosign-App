import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { router } from "expo-router"; 
import HeaderLearning from "../components/HeaderLearning";
import { SafeAreaView } from "react-native-safe-area-context";

const lessonAnimals = () => {
  const screenWidth = Dimensions.get("window").width;

  // Calculate the width for each flex item based on screen width and number of items per row
  const itemsPerRow = 2; // Vous pouvez ajuster cela en fonction de votre conception
  const flexItemWidth = (screenWidth - 20) / itemsPerRow; // Soustrayez les marges ou les rembourrages éventuels

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
          <Text style={styles.title}>Animals ASL</Text>
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
          <Image
            source={require("../assets/Animals/cow-webp.webp")}
            style={styles.image}
          />
          <Text style={styles.description}>Cow</Text>

          <Image
            source={require("../assets/Animals/horse-webp.webp")}
            style={styles.image}
          />
          <Text style={styles.description}>Horse</Text>

          <Image
            source={require("../assets/Animals/lion-webp.webp")}
            style={styles.image}
          />
          <Text style={styles.description}>Lion</Text>

          <Image
            source={require("../assets/Animals/goat-webp.webp")}
            style={styles.image}
          />
          <Text style={styles.description}>Goat</Text>
          <Image
            source={require("../assets/Animals/horse-webp.webp")}
            style={styles.image}
          />
          <Text style={styles.description}>Horse</Text>

          <Image
            source={require("../assets/Animals/lion-webp.webp")}
            style={styles.image}
          />
          <Text style={styles.description}>Lion</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
  flexContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  title: {
    fontSize: 19,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 7,
    width: "100%",
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 5,

  },
  description: {
    fontSize: 24,
    marginBottom:60,
    textAlign: "center",
  },
});

export default lessonAnimals;
