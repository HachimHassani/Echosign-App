import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import HeaderLearning from "../components/HeaderLearning";
import { SafeAreaView } from "react-native-safe-area-context";

const lessonNum = () => {
  const screenWidth = Dimensions.get("window").width;

  // Calculer la largeur de chaque élément flex en fonction de la largeur de l'écran et du nombre d'éléments par ligne
  const itemsParLigne = 2; // Vous pouvez ajuster cela en fonction de votre conception
  const largeurElementFlex = (screenWidth - 20) / itemsParLigne; // Soustrayez les marges ou les rembourrages éventuels

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
          <Text style={styles.title}>Numbers ASL</Text>
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
      <ScrollView style={styles.scrollVue}>
        <View style={styles.conteneurFlex}>
          <Image source={require("../assets/1to5.jpeg")} style={styles.image} />

          <Image
            source={require("../assets/5to9.jpeg")}
            style={styles.image1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  enTête: {
    height: "16%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  scrollVue: {
    flex: 1,
  },
  conteneurFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    flexDirection: "col",
    marginBottom: 20, // Pour aligner les images horizontalement
  },
  titre: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
  },
  title: {
    fontSize: 19,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 7,
    width: "100%",
  },
  image1: {
    width: 300,
    height: 300,
    marginBottom: 50,
  },
  description: {
    fontSize: 24,
    marginBottom: 60,
    textAlign: "center",
  },
});

export default lessonNum;
