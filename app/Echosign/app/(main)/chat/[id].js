import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const FriendListItem = ({ user, friend, onPressChat, onPressRemove }) => {
  const opposingUserName = friend.USER === user ? friend.SenderName : friend.ReceiverName;

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://i.pravatar.cc/300' }} // Replace with your avatar image URL
      />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{opposingUserName}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.chatButton} onPress={onPressChat}>
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={onPressRemove}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#E1E1E1',
    backgroundColor: '#FFFFFF', // Background color for the item
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Text color
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  chatButton: {
    backgroundColor: '#2979FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: '#F44336',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default FriendListItem;
