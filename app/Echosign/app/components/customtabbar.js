import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.iconContainer,
              state.index === index ? styles.selectedIconContainer : null,
            ]}
            onPress={() => navigation.navigate(route.name)}
          >
            <Image
              source={options.tabBarIcon}
              style={[
                styles.iconImage,
                { tintColor: state.index === index ? 'white' : '#1AA6B7' },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#B6E5EA',
    borderRadius: 25,
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

export default CustomTabBar;
