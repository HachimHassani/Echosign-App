import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ToastPopup({ isVisible, type, message, onClose }) {
  const backgroundColor = type === 'success' ? 'green' : 'red';
  const icon = type === 'success' ? 'check-circle' : 'error-outline';
  const iconColor = type === 'success' ? 'white' : 'white';
  const title = type === 'success' ? 'Success' : 'Error';

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={[styles.modalContent, { backgroundColor }]}>
        <View style={styles.titleContainer}>
          <MaterialIcons name={icon} color={iconColor} size={22} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
        <Pressable onPress={onClose}>
          <MaterialIcons name="close" color={iconColor} size={22} />
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  message: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
  },
});
