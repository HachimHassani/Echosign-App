import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Auth, API } from 'aws-amplify';
import { router,useLocalSearchParams } from 'expo-router';
import { useUser } from '../../../context/auth';
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";


export default function chat() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const user = useUser(); // Use Auth.useUser() to access the user object

  const apiName = 'apiEchsign'; // Replace with your REST API name
  const path = '/msgs'; // Replace with your REST API endpoint for messages

  const fetchMessages = async () => {
    try {
      const myInit = {
        headers: {
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        },
      };

      const response = await API.get(apiName, path +'/'+id, myInit);

      if (!response) {
        throw new Error('Failed to fetch messages');
      }
      console.log(response);
      const messageData = response; // Assuming the data contains your messages
      const messages = messageData.map((message) => ({
        _id: message.msg_id,
        createdAt: new Date(message.createdAt),
        text: message.text,
        user: {
          _id: message.user, // Adjust as needed
          avatar: 'https://i.pravatar.cc/300',
        },
      }));
      setMessages(messages);
    } catch (error) {
      console.log('Error fetching messages: ', error);
    }
    setTimeout(() => {
      fetchMessages();
    }, 3500);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const onSend = useCallback(async (newMessages = []) => {
    const newMessage = newMessages[0];
    console.log(newMessage);
    try {
      const myInit = {
        headers: {
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        },
        body: {
          chat_id: id,
          text: newMessage.text,
          user: newMessage.user._id,
          createdAt: new Date().toISOString(),
        },
      };

      const response = await API.post(apiName, path, myInit);

      if (!response) {
        throw new Error('Failed to send message');
      }

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );
    } catch (error) {
      console.log('Error sending message: ', error);
    } 
  }, []);

  return (
   
      
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={(newMessages) => onSend(newMessages)}
        messagesContainerStyle={{
          backgroundColor: "#fff",
        }}
        textInputStyle={{
          backgroundColor: "#fff",
          borderRadius: 20,
        }}
        user={{
          _id: user.username,
          avatar: "https://i.pravatar.cc/300",
        }}
      />
    
  );
}
