import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import HeaderLearning from "../components/HeaderLearning";

const lessonNum = () => {
  const screenWidth = Dimensions.get("window").width;

  // Calculer la largeur de chaque élément flex en fonction de la largeur de l'écran et du nombre d'éléments par ligne
  const itemsParLigne = 2; // Vous pouvez ajuster cela en fonction de votre conception
  const largeurElementFlex = (screenWidth - 20) / itemsParLigne; // Soustrayez les marges ou les rembourrages éventuels

  return (
    <View style={styles.container}>
      <View style={styles.enTête}>
        <View style={styles.conteneurFlex}>
          <Image
            source={require("../assets/flecheG.png")}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            ...styles.conteneurFlex,
            backgroundColor: "#1AA6B7",
            borderRadius: 35,
            // Ajouter des ombres en fonction de la plateforme
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
          <Text style={styles.titre}>Nombres en ASL</Text>
        </View>
        <View style={styles.conteneurFlex}>
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
      <ScrollView style={styles.scrollVue}>
        <View style={styles.conteneurFlex}>
            <Image
              source={require("../assets/1to5.jpeg")}
              style={styles.image}
            />

          <Image source={require("../assets/5to9.jpeg")} style={styles.image1} />
        </View>
      </ScrollView>
    </View>
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
