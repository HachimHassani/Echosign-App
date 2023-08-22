import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ButtomBar from '../components/ButtomBar';
import MainHeader from '../components/MainHeader';

export default function mainPage() {
    const userName = "Akram talibi";
  return (
    <View className="flex-1 w-full h-full">
        <View className="h-[15%] mx-[4%]">
            <MainHeader userName={userName}/>
        </View>
      <ScrollView className="h-[75%] bg-red-200">

      </ScrollView >
      <View className="h-[10%] mx-[6%]">
        <ButtomBar/>
      </View>
    </View>
  )
}