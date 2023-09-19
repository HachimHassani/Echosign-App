import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const LocalImageGrid = () => {
  const images = [
    { name: "Hachim Hssinui", source: require("../assets/Mascot5.png") },
    { name: "Akram Talibi", source: require("../assets/Mascot5.png") },
    { name: "Wail Belbacha", source: require("../assets/Mascot5.png") },
    { name: "Mohammed Zouagiya", source: require("../assets/Mascot5.png") },
    { name: "Oumaima chabat", source: require("../assets/Mascot5.png") },
    { name: "Nouhaila Boumachour", source: require("../assets/Mascot5.png") },
  ];

  const renderImageRow = (startIndex) => {
    return (
      <View style={styles.row}>
        {images.slice(startIndex, startIndex + 3).map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={image.source} style={styles.image} />
            <Text style={styles.name}>{image.name}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderImageRow(0)}
      {renderImageRow(3)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
    textAlign: "center",
  },
});

export default LocalImageGrid;
