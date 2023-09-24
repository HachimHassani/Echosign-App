import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet , TouchableOpacity, Image } from 'react-native';
import { Auth, API } from 'aws-amplify';    
import { SearchBar,Tab, TabView } from '@rneui/themed';

import { useUser } from '../../context/auth';
import ToastPopup from '../components/Toastpopup';

const UserSearchScreen = () => {
  const [isSuccessVisible, setIsSuccessVisible] = useState(false); // State to control visibility
  const successMessage = 'Friend request sent successfully'; // Message content
  const [errorModalVisible, setErrorModalVisible] = useState(false); // State for error modal


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
    <View style={styles.userCard}>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://i.pravatar.cc/300' }} // Replace with your avatar image URL
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
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Search</Text>
      </View>

      {/* Horizontal container for search bar and button */}
      <View style={styles.searchContainer}>
        <SearchBar
          platform="default"
          containerStyle={{ flex: 1, marginRight: 8 }} // Adjust marginRight for spacing
          inputContainerStyle={{}}
          inputStyle={{}}
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          lightTheme
          loadingProps={{}}
          onChangeText={setSearchQuery}
          onClearText={() => console.log(onClearText())}
          placeholder="Type query here..."
          placeholderTextColor="#888"
          round
          cancelButtonTitle="Cancel"
          cancelButtonProps={{}}
          onCancel={() => console.log(onCancel())}
          value={searchQuery}
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.username.toString()}
        renderItem={renderUserCard}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {isSuccessVisible && (
        <ToastPopup isVisible={true} type="success" message={successMessage} onClose={() => setIsSuccessVisible(false)} />
      )}
      {errorModalVisible && (
        <ToastPopup isVisible={true} type="error" message={"Error sending friend request. friend request already sent!!"} onClose={() => setErrorModalVisible(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row", // Horizontal layout
    alignItems: "center", // Vertically align items
    marginBottom: 8,
  },
  searchInput: {
    flex: 1, // Allow the input to expand to fill available space
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8, // Add spacing between search bar and button
  },
  searchButton: {
    backgroundColor: "#1AA6B7",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80, // Set a minimum width to prevent squeezing
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
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
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#666",
  },
  sendRequestButton: {
    backgroundColor: "green", // Customize the button's appearance
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  sendRequestButtonText: {
    color: "white", // Customize the text color
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },
});

export default UserSearchScreen;