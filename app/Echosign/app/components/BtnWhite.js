import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
  const { onPress, title = '', paddingHorizontal = 20 } = props; 
  return (
    <Pressable style={[styles.button, { paddingHorizontal }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'white',
    borderWidth: 3, 
    borderColor: '#1AA6B7',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#1AA6B7',
  },
});
