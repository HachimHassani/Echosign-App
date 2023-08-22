import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MainHeader = ({ userName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/pdppic.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.settingsButton}>
        <Image
          source={require('../assets/setting.png')}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 900,
    opacity:0.6,
  },
  userName: {
    fontSize: 30,
    color: '#1AA6B7',
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 10,
  },
  settingsIcon: {
    width: 30,
    height: 30,
  },
});

export default MainHeader;
