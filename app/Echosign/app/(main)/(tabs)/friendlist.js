import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth, API } from 'aws-amplify';
import FriendListItem from '../../components/friendlistitem';
import { useUser } from '../../../context/auth';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContactList = () => {
  const user = useUser();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      try {
        const apiName = 'apiEchsign';
        const path = `/users/friends/${user.username}`;

        const request = {
          headers: {
            Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
          },
        };

        const response = await API.get(apiName, path, request);
        console.log('Friends:', response);
        setFriends(response);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    }

    fetchFriends();
  }, []);

  // Render the list of friends
  const renderFriend = ({ item }) => (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() => initiateChat(item.username)}
    >
      <Text style={styles.friendName}>{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading} className="rounded-3xl">My Friends</Text>
      {friends.length > 0 ? (
        <FlatList
          data={friends}
          keyExtractor={(item) => item.USER.toString()}
          renderItem={({ item }) => (
            <FriendListItem
              user={user.username}
              friend={item}
              onPressChat={() => router.push({ pathname: '/chat/[id].js', params: { id: item.chat_id } })}
            />
          )}
        />
      ) : (
        <Text style={styles.noFriendsText}>You have no friends yet.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // Background color for the entire screen
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 12,
    backgroundColor: "#B6E5EA",
    padding: 13,
  },
  friendItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#E1E1E1",
  },
  friendName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  noFriendsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});

export default ContactList;




















