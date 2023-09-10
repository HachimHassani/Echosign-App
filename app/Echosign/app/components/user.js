// User.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const User = ({ user, onAddFriend }) => {
  return (
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Text style={{ fontSize: 18 }}>{user.name}</Text>
      <TouchableOpacity onPress={() => onAddFriend(user.id)}>
        <Text style={{ color: 'blue' }}>Add Friend</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;
