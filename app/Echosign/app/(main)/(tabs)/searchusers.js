import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet ,SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Auth, API } from 'aws-amplify';    
import { Tab, TabView } from '@rneui/themed';
import UserSearchScreen from '../searchusers';
import FriendRequestsScreen from '../friendrequests';
import { useUser } from '../../../context/auth';


const UserScreen = () => {

  const [index, setIndex] = React.useState(0);

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
          setUsers([]);
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
            setIsSuccessVisible(true); // Show the success message
            setTimeout(() => {
              setIsSuccessVisible(false); // Hide the success message after a timeout
            }, 3000); // Adjust the timeout as needed
          } 
        } catch (error) {
          setErrorModalVisible(true); // Show the error modal

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
    <SafeAreaView style={styles.userCard}>
      <Image
        style={styles.avatar}
        source={{ uri: "https://i.pravatar.cc/300" }} // Replace with your avatar image URL
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <TouchableOpacity
          style={styles.sendRequestButton}
          onPress={() => sendFriendRequest(user.username, item.username)}
        >
          <Text style={styles.sendRequestButtonText}>Send Friend Request</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "#1AA6B7",
          height: 6,
          marginTop: 100,
        }}
      >
        <Tab.Item
          title="recieved Requests"
          titleStyle={{ fontSize: 14, color: "#1AA6B7" }}
          icon={{
            name: "person-add",
            type: "ionicon",
            color: "#1AA6B7",
            marginTop: 40,
            
          }}
        />
        <Tab.Item
          title="Search users"
          titleStyle={{ fontSize: 14, color: "#1AA6B7" }}
          icon={{
            name: "search",
            type: "ionicon",
            color: "#1AA6B7",
            marginTop: 40,
          }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
          <FriendRequestsScreen />
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <UserSearchScreen />
        </TabView.Item>
      </TabView>
    </>
  );
  };

export default UserScreen;