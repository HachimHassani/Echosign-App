import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Linking,
  Button,

  TouchableOpacity,
} from "react-native";
import ButtomBar from "../../components/ButtomBar";
import MainHeader from "../../components/MainHeader";
import ExploreEC from "../../components/ExploreEC";
import ChoiceCard from "../../components/ChoiceCards"; // Fixed import name
import LearnCard from "../../components/LearnCard";
import LongCard from "../../components/LongCard";
import cardsData from "../../data/data.json";
import { Auth, API } from "aws-amplify";
import { useUser } from "../../../context/auth";
import { router } from "expo-router";
import {  useAuthenticator } from '@aws-amplify/ui-react-native';



export default function MainPage() {
  const user = useUser(); 

  async function postData() {
  const apiName = 'apiEchsign';
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
  const openWebsite = () => {
    const websiteUrl = 'https://echo-sign.net'; // Replace with the URL you want to redirect to
    Linking.openURL(websiteUrl)
      .catch((err) => console.error('An error occurred: ', err));
  };
  

 
  

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
  const userName = user?user.attributes.name:'loading ...';
  const selectedCardData1 = cardsData.find((card) => card.id === 1);
  const selectedCardData2 = cardsData.find((card) => card.id === 2);
  const selectedCardData3 = cardsData.find((card) => card.id === 3);
  const selectedCardData4 = cardsData.find((card) => card.id === 4);

  const selectedLCardData1 = cardsData.find((card) => card.id === 5);
  const selectedLCardData2 = cardsData.find((card) => card.id === 6);
  const selectedLCardData3 = cardsData.find((card) => card.id === 7);
  const selectedLCardData4 = cardsData.find((card) => card.id === 8);

  return (
    <SafeAreaView className="flex-1 w-full h-full bg-white">
      <View className="h-[12%] mx-[4%] mt-[4%]">
        <MainHeader userName={userName} />
      </View>

      <ScrollView className="h-auto px-[2%]">
        <ExploreEC onPress={() => router.push("/echosign")} />

        <TouchableOpacity
          className="mx-[6%] my-[4%]"
          onPress={() => router.push("/courses")}
        >
          <Text className="text-black text-xl font-bold opacity-90 text-left">
            Popular lessons ..
          </Text>
          <Text className="text-black text-xs opacity-70 text-left">
            Learn the most popular lessons
          </Text>
        </TouchableOpacity>

        <ScrollView horizontal={true} className="flex-row pb-[2%]">
          <LearnCard
            data={selectedLCardData1}
            id={selectedLCardData1.id}
            redirect={() => router.push("/lessonABC")}
          />
          <LearnCard
            data={selectedLCardData2}
            id={selectedLCardData2.id}
            redirect={() => router.push("/lessonAnimals")}
          />
          <LearnCard
            data={selectedLCardData3}
            id={selectedLCardData3.id}
            redirect={() => router.push("/lessonNum")}
          />
          <LearnCard
            data={selectedLCardData4}
            id={selectedLCardData4.id}
            redirect={() => router.push("/lessonColor")}
          />
        </ScrollView>

        {/*
        <ChoiceCard data={selectedCardData} id={selectedCardData.id} />
        <LearnCard data={selectedLCardData} id={selectedLCardData.id} />
        */}

        <View className="mx-[8%] my-[4%] flex-row justify-between items-center">
          <Text className="text-black text-xl font-bold opacity-90 text-left">
            Translation
          </Text>
          <Text className="text-black text-xl font-bold opacity-90 text-left ">
            Dictionnary
          </Text>
        </View>
        <View className=" flex-row justify-between items-center ">
          <ChoiceCard
            data={selectedCardData1}
            id={selectedCardData1.id}
            redirect={() => router.push("/translate")}
          />
          <ChoiceCard
            data={selectedCardData2}
            id={selectedCardData2.id}
            redirect={() => router.push("/translate")}
          />
        </View>

        <View className="mx-[8%] my-[4%] flex-row justify-between items-center">
          <Text className="text-black text-xl font-bold opacity-90 text-left">
            Messaging
          </Text>
          <Text className="text-black text-xs opacity-70 ">
            get connected ...
          </Text>
        </View>
        <View className="justify-center items-center">
          <LongCard redirect={() => router.push("/friendlist")} />
        </View>

        <View className="mx-[8%] my-[4%] flex-row justify-between items-center">
          <Text className="text-black text-xl font-bold opacity-90 text-left">
            Practice
          </Text>
          <Text className="text-black text-xl font-bold opacity-90 text-left ">
            Connexion
          </Text>
        </View>
        <View className=" flex-row justify-between items-center ">
          <ChoiceCard
            data={selectedCardData3}
            id={selectedCardData3.id}
            redirect={() => router.push("/mainPage")}
          />
          <ChoiceCard
            data={selectedCardData4}
            id={selectedCardData4.id}
            redirect={() => router.push("/game")}
          />
        </View>

        <View className="mb-[5%]"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
