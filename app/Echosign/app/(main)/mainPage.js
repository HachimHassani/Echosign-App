import React from "react";
import { View, Text, ScrollView } from "react-native";
import ButtomBar from "../components/ButtomBar";
import MainHeader from "../components/MainHeader";
import ExploreEC from "../components/ExploreEC";
import ChoiceCard from "../components/ChoiceCards"; // Fixed import name
import LearnCard from "../components/LearnCard";
import LongCard from "../components/LongCard";
import cardsData from "../data/data.json";

export default function MainPage() {
  const userName = "Akram talibi";
  const selectedCardData1 = cardsData.find((card) => card.id === 1);
  const selectedCardData2 = cardsData.find((card) => card.id === 2);
  const selectedCardData3 = cardsData.find((card) => card.id === 3);
  const selectedCardData4 = cardsData.find((card) => card.id === 4);

  const selectedLCardData1 = cardsData.find((card) => card.id === 5);
  const selectedLCardData2 = cardsData.find((card) => card.id === 6);
  const selectedLCardData3 = cardsData.find((card) => card.id === 7);
  const selectedLCardData4 = cardsData.find((card) => card.id === 8);

  return (
    <View className="flex-1 w-full h-full">
      <View className="h-[13%] mx-[4%]">
        <MainHeader userName={userName} />
      </View>

      <ScrollView className="h-[75%] px-[2%]">
        <ExploreEC />

        <View className="m-[5%]">
          <Text className="text-black text-xl font-bold opacity-90 text-left">
            Popular lessons ..
          </Text>
          <Text className="text-black text-xs opacity-70 text-left">
            Learn the most popular lessons
          </Text>
        </View>

        <ScrollView horizontal={true} className="flex-row ">
          <LearnCard data={selectedLCardData1} id={selectedLCardData1.id} />
          <LearnCard data={selectedLCardData2} id={selectedLCardData2.id} />
          <LearnCard data={selectedLCardData3} id={selectedLCardData3.id} />
          <LearnCard data={selectedLCardData4} id={selectedLCardData4.id} />
        </ScrollView>
        {/*
        <ChoiceCard data={selectedCardData} id={selectedCardData.id} />
        <LearnCard data={selectedLCardData} id={selectedLCardData.id} />
        
        */}

        <View className="m-[5%] flex-row justify-between items-center">
          <Text className="text-black text-xl font-bold opacity-90 text-left">
            Translation
          </Text>
          <Text className="text-black text-xl font-bold opacity-90 text-left ">
            Dictionnary
          </Text>
        </View>
        <View className=" flex-row justify-between items-center ">
          <ChoiceCard data={selectedCardData1} id={selectedCardData1.id} />
          <ChoiceCard data={selectedCardData2} id={selectedCardData2.id} />
        </View>

        <View className="m-[5%] flex-row justify-between items-center">
          <Text className="text-black text-xl font-bold opacity-90 text-left">
            Messaging
          </Text>
          <Text className="text-black text-xs opacity-70 ">
            get connected ...
          </Text>
        </View>
        <View className="justify-center items-center">
          <LongCard />
        </View>

        <View className="m-[5%] flex-row justify-between items-center">
          <Text className="text-black text-xl font-bold opacity-90 text-left">
            Practice
          </Text>
          <Text className="text-black text-xl font-bold opacity-90 text-left ">
            Connexion
          </Text>
        </View>
        <View className=" flex-row justify-between items-center ">
          <ChoiceCard data={selectedCardData3} id={selectedCardData3.id} />
          <ChoiceCard data={selectedCardData4} id={selectedCardData4.id} />
        </View>

        <View className="m-[5%]"></View>
      </ScrollView>

      <View className="h-[10%] mx-[6%] justify-center ">
        <ButtomBar />
      </View>
    </View>
  );
}
