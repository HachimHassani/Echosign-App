import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth, API } from 'aws-amplify';
import FriendListItem from '../components/friendlistitem';
import { router } from 'expo-router';
import { useUser } from '../../context/auth';

const ContactList = () => {
  const user = useUser();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      try {
        const apiName = 'apiEchsign';
        const path = '/users/friends/'; // Replace with your API endpoint for fetching friends

        const request = {
          headers: {
            Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
          },
        };

        const response = await API.get(apiName, path+user.username, request);

          setFriends(response);
       
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    }

    fetchFriends();
    console.log(friends);
  }, []);

  // Render the list of friends
  const renderFriend = ({ item }) => (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() => initiateChat(item.username)} // Implement initiateChat function
    >
      <Text>{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    {console.log(friends)}
    {friends.length > 0 ?
      (<FlatList
        data={friends}
        keyExtractor={(item) => item.USER.toString()}
        renderItem={({ item }) => (<FriendListItem friend={item} 
                    onPressChat={()=>router.push(href={pathname:'/chat/[id]', params: {id : item.chat_id}})} />
            
        )}
      />):(<Text>no friends</Text>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  friendItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default ContactList;
