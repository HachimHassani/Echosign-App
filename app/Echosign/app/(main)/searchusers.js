// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet , TouchableOpacity} from 'react-native';
import { Auth, API } from 'aws-amplify';    
import { useUser } from '../../context/auth';

const UserSearchScreen = () => {
  const user =  useUser(); // this is the user object from cognito

    async function postData(query) {
        const apiName = 'apiEchsign';
        const path = '/users/search';
        const myInit = {
          headers: {
            Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`
          }
        };

        API.get(apiName, path+'?query='+query, myInit)
        .then((response) => {
          console.log('success 1', response);
          setUsers(response.users);
          return response;
        })
        .catch((error) => {
          console.log('error', error);
          console.log(myInit,path+'?query='+query);
        });
        }
      async function sendFriendRequest(senderUsername, receiverUsername) {
        try {
          // Data to be sent in the request body
          
            const requestData = {
              sender: senderUsername,
              receiver: receiverUsername,
            };
       
      
          // Construct the request object with the body
          const request = {
            headers: {
              Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`
            },
            body: requestData, // Serialize the data as JSON
            response: true, // This ensures the response is parsed as JSON
          };
      
          // Make the POST request using Amplify API
          const response = await API.post('apiEchsign', '/users/request', request);
      
          if (response.status === 200) {
            console.log('Friend request sent successfully');
          } else {
            console.error('Error sending friend request1:', response);
          }
        } catch (error) {
          console.error('Error sending friend request:', error);
        }
      }
        
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const res =  postData(searchQuery);
      console.log('success', res);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const renderUserCard = ({ item }) => (
    <View style={styles.userCard}>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      <TouchableOpacity
  style={styles.sendRequestButton}
  onPress={() => sendFriendRequest( user.username,item.username)} // Assuming user.username represents the current user's Cognito username
>
  <Text>Send Friend Request</Text>
</TouchableOpacity>
      {/* Add more user info as needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={users}
        keyExtractor={item => item.username.toString()}
        renderItem={renderUserCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  userCard: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
  },
  sendRequestButton: {
    backgroundColor: 'blue', // Customize the button's appearance
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  sendRequestButtonText: {
    color: 'white', // Customize the text color
  },
});

export default UserSearchScreen;
