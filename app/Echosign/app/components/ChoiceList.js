import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Animated, Easing } from 'react-native';

const ListItem = ({ imageSource, text, isSelected, onPress, animateHeartbeat }) => {
  const [mainText, secondaryText] = text.split(' (');
  const secondaryTextFormatted = secondaryText.slice(0, -1);

  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animateHeartbeat) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [animateHeartbeat, scaleValue]);

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedItem]}
      onPress={onPress}
    >
      <Animated.View style={[styles.item, animateHeartbeat && { transform: [{ scale: scaleValue }] }]}>
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>{mainText}</Text>
          <Text style={styles.secondaryText}>({secondaryTextFormatted})</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const Choice = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [animateHeartbeat, setAnimateHeartbeat] = useState(false);

  const handleItemClick = (item) => {
    if (item.text === 'MDSL (Moroccan dialect sign language)' || item.text === 'LSF (Langue des Signes Française)') {
      Alert.alert(
        'Language Not Supported',
        "Sorry, this language isn't supported yet. We're working on it.",
      );
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <View style={styles.appContainer}>
      <ListItem
        imageSource={require('../assets/maroc.jpg')}
        text="MDSL (Moroccan dialect sign language)"
        isSelected={selectedItem && selectedItem.text === 'MDSL (Moroccan dialect sign language)'}
        onPress={() => handleItemClick({ text: 'MDSL (Moroccan dialect sign language)' })}
      />
      <ListItem
        imageSource={require('../assets/france.jpg')}
        text="LSF (Langue des Signes Française)"
        isSelected={selectedItem && selectedItem.text === 'LSF (Langue des Signes Française)'}
        onPress={() => handleItemClick({ text: 'LSF (Langue des Signes Française)' })}
      />
      <ListItem
        imageSource={require('../assets/america.jpg')}
        text="ASL (American sign language)"
        isSelected={selectedItem && selectedItem.text === 'ASL (American sign language)'}
        animateHeartbeat={animateHeartbeat}
        onPress={() => {
          setAnimateHeartbeat(!animateHeartbeat);
          handleItemClick({ text: 'ASL (American sign language)' });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginVertical: 7,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    padding: 16,
    width: '85%',
    backgroundColor: '#EAEAEA',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  mainText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryText: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default Choice;
