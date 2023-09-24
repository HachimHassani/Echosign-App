import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Auth, API } from "aws-amplify";
import { Tab, TabView } from "@rneui/themed";
import CameraPage from "../cameraa";
import Ttspage from "../tts";
import { useUser } from "../../../context/auth";
import { useLocalSearchParams } from "expo-router";

const UserScreen = () => {
  const { id } = useLocalSearchParams();

  const [index, setIndex] = React.useState(0);
  if(id == 1)
  {setIndex(id);}

  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "#1AA6B7",
          height: 6,
        }}
      >
        <Tab.Item
          title="sign translations"
          titleStyle={{ fontSize: 14, color: "#1AA6B7" }}
          icon={{
            name: "medical",
            type: "ionicon",
            color: "#1AA6B7",
            marginTop: 40,
          }}
        />
        <Tab.Item
          title="text to speech"
          titleStyle={{ fontSize: 14, color: "#1AA6B7" }}
          icon={{
            name: "text",
            type: "ionicon",
            color: "#1AA6B7",
            marginTop: 40,
          }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
          <CameraPage />
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <Ttspage />
        </TabView.Item>
      </TabView>
    </>
  );
};

export default UserScreen;
