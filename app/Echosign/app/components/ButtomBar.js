import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Svg, { Path } from "react-native-svg";

const ButtomBar = () => {
  const [selectedIcon, setSelectedIcon] = useState(0); // Index of the selected icon

  const icons = [
    require('../assets/home.png'),
    require('../assets/message.png'),
    require('../assets/profile.png'),
    require('../assets/translate.png'),
  ];

  return (
    <View style={styles.container}>
      {icons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.iconContainer,
            selectedIcon === index ? styles.selectedIconContainer : null,
          ]}
          onPress={() => setSelectedIcon(index)}
        >
          <Image
            source={icon}
            style={[
              styles.iconImage,
              { tintColor: selectedIcon === index ? 'white' : '#1AA6B7' },
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#B6E5EA',
    borderRadius:25,
    padding: 10,
    
    
  },
  iconContainer: {
    padding: 8,
    borderRadius: 25,
    backgroundColor: 'transparent',
  },
  selectedIconContainer: {
    backgroundColor: '#1AA6B7',
  },
  iconImage: {
    width: 29,
    height: 29,
  },
});

export default ButtomBar;
