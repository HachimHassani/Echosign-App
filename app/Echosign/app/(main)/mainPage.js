import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import ButtomBar from '../components/ButtomBar';
import MainHeader from '../components/MainHeader';
import {router} from 'expo-router';
import { Auth, API } from 'aws-amplify';
import { useUser } from '../../context/auth';

export default function mainPage() {
  const user = useUser(); // this is the user object from cognito
  console.log(user);

  async function postData() {
  const apiName = 'echosignapi';
  const path = '/user-search';
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


 
  

  const onSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error logging out: ', error);
    }
  };

  const fetchUser = async () => {
 
      API.get(apiName, path, myInit).then((response) => {
        console.log('succes',response);
      })
      .catch((error) => {
        console.log('error', error);
        console.log(myInit);
      });
  }

  

  return (
    <View className="flex-1 w-full h-full">
      <View className="h-[15%] mx-[4%]">
        <MainHeader userName={user ? user.attributes.name : 'Guest'} />
      </View>
      <ScrollView className="h-[75%] bg-red-200">
        <TouchableOpacity className="bg-blue-500" onPress={onSignOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
        {user ? ( // Conditional rendering based on user authentication
          <TouchableOpacity
            className="bg-red-500"
            onPress={() => router.push(href = '/chat',params = {user})}
          >
            <Text>Chats</Text>
          </TouchableOpacity>
        ) : (
          <Text>Please sign in to access chats.</Text>
        )}
        <TouchableOpacity className="bg-green-500" onPress={()=>{router.push('/searchusers')}}>
          <Text>Fetch User</Text>
        </TouchableOpacity>
      </ScrollView>
      <View className="h-[10%] mx-[6%]">
        <ButtomBar />
      </View>
    </View>
  );
}
