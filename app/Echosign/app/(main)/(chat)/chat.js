import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Auth,
API } from 'aws-amplify'; 

import { AntDesign } from '@expo/vector-icons';
import colors from '../../colors';
import { router } from 'expo-router';
import { useUser } from '../../../context/auth';





export default function Chat() {
  const [messages, setMessages] = useState([]);
  const user = useUser(); // this is the user object from cognito

  console.log(params.user);
  const apiName = 'echosignapi';
  const path = '/msgs';
  const myInit = {
    headers: {
      Authorization: `Bearer ${user.signInUserSession.accessToken.jwtT}`,
    }, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    
  };


  const onSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error logging out: ', error);
    }
  };



  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Make a REST API request to fetch messages
        // API.get(apiName, path, myInit)
        // .then((response) => {
        //   console.log('succes',response);
        // })
        // .catch((error) => {
        //   console.log('error', error);
        // });
        async function postData() {
          const apiName = 'echosignapi';
          const path = '/msgs';
          const myInit = {
            headers: {
              Authorization: `Bearer ${(await Auth.currentSession())
                .getIdToken()
                .getJwtToken()}`
            }
          };
        
          API.get(apiName, path, myInit)
        .then((response) => {
          console.log('succes',response);
        })
        .catch((error) => {
          console.log('error', error);
          console.log(myInit);
        });
        }
        
        postData();
        const response = await fetch('YOUR_REST_APIENDPOINT/messages', {
          method: 'GET',
          
        });

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const messageData = await response.json();
        const messages = messageData.map((message) => ({
          _id: message.id,
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
    };

    fetchMessages();
  }, []);

  const onSend = useCallback(async (newMessages = []) => {
    const newMessage = newMessages[0];
    try {
      // Make a REST API request to send a message
      const response = await fetch('YOUR_REST_API_ENDPOINT/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.signInUserSession.accessToken.jwtToken}`,
        },
        body: JSON.stringify({
          text: newMessage.text,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );
    } catch (error) {
      console.log('Error sending message: ', error);
    }
  }, [user]);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(newMessages) => onSend(newMessages)}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      user={{
        _id: user.username,
        avatar: 'https://i.pravatar.cc/300',
      }}
    />
  );
}
