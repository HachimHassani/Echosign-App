import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Auth, API } from 'aws-amplify';
import FriendRequestItem from '../components/friendrequest';

const FriendRequestsScreen = () => {
  const [requests, setRequests] = useState([]);
  const fetchFriendRequests = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      const apiName = 'apiEchsign'; // Replace with your REST API name
      const path = '/users/r-request/'; // Replace with your REST API endpoint for fetching friend requests

      const request = {
        headers: {
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        },
      };

      const response = await API.get(apiName, path+user.username,request);
   

      setRequests(response); 
    } catch (error) {
      console.error('Error fetching friend requests', error);
    }
  };
  useEffect(() => {
    

    fetchFriendRequests();
  }, []);

  const handleAcceptRequest = async (userID,friendID) => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      const apiName = 'apiEchsign'; // Replace with your REST API name
      const path = `/users/accept/${userID}/${friendID}`; // Replace with your REST API endpoint for accepting friend requests

      const request = {
        headers: {
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        },
      };

      const res = await API.post(apiName, path, request);
      console.log(res);
      // Refresh the list of friend requests
      fetchFriendRequests();
    } catch (error) {
      console.error('Error accepting friend request', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      const apiName = 'apiEchsign'; // Replace with your REST API name
      const path = `/users/r-requests/reject/${requestId}`; // Replace with your REST API endpoint for rejecting friend requests

      const request = {
        headers: {
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        },
      };

      await API.post(apiName, path, request);
      // Refresh the list of friend requests
      fetchFriendRequests();
    } catch (error) {
      console.error('Error rejecting friend request', error);
    }
  };

  return (
    <View>
      <Text>Friend Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.USER}
        renderItem={({ item }) => (
          <FriendRequestItem
            request={item}
            onAccept={() => handleAcceptRequest(item.USER,item.FRIEND)}
            onReject={() => handleRejectRequest(item.FRIEND)}
          />
        )}
      />
    </View>
  );
};

export default FriendRequestsScreen;
