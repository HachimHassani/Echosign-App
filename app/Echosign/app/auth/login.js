import * as React from "react";
import { StatusBar, StyleSheet, View, Text } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const login = () => {
  return (
    <View className="mt-8 px-2" style={styles.view}>
      <StatusBar style={styles.childLayout} barStyle="default" />
      <View style={[styles.child, styles.childLayout]} />
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        <Text className="text-2xl text-blue-100 dark:text-white">Don’t have an account ? register</Text>
      </View>
      <Text style={[styles.welcomeBack, styles.welcomeBackPosition]}>
        Welcome back ! log in !!
      </Text>
      <Text
        style={[styles.lorenIpsumSdjfcs, styles.welcomeBackPosition]}
      >{`loren ipsum sdjfcs chfhsche chcth cethce cthecet hcetch `}</Text>
      <View style={styles.sliderStarter}>
        <View style={styles.sliderStarterChild} />
        <View style={[styles.sliderStarterItem, styles.sliderLayout]} />
        <View style={[styles.sliderStarterInner, styles.sliderLayout]} />
      </View>
      <View style={[styles.seperator, styles.seperatorPosition]} />
      
      
      <View style={[styles.group3btnConponent, styles.seperatorPosition]}>
        <LinearGradient
          style={[styles.group3btnConponentChild, styles.group3btnLayout]}
          locations={[0.29, 0.98]}
          colors={["#1aa6b7", "#54bd95"]}
        />
        <Text style={[styles.next, styles.nextTypo]}>login</Text>
        <Text style={[styles.back, styles.nextTypo]}>Back</Text>
        <View style={[styles.group3btnConponentItem, styles.group3btnLayout]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  childLayout: {
    width: 430,
    position: "absolute",
  },
  groupChildLayout: {
    width: 224,
    position: "absolute",
  },
  welcomeBackPosition: {
    width: 362,
    color: Color.gray_100,
    left: 31,
    textAlign: "left",
    position: "absolute",
  },
  sliderLayout: {
    width: 12,
    backgroundColor: Color.cadetblue_200,
    borderRadius: Border.br_8xs,
    height: 9,
    top: 0,
    position: "absolute",
  },
  seperatorPosition: {
    left: "50%",
    position: "absolute",
  },
  group3btnLayout: {
    borderRadius: Border.br_19xl,
    bottom: "0%",
    top: "0%",
    width: "46.24%",
    height: "100%",
    position: "absolute",
  },
  nextTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xl,
    top: "17.46%",
    width: "14.74%",
    height: "65.08%",
    textAlign: "left",
    lineHeight: 46,
    position: "absolute",
  },
  child: {
    top: 85,
    left: -3,
    borderRadius: 20,
    backgroundColor: Color.white,
    height: 847,
  },
  groupChild: {
    top: 4,
    borderRadius: 50,
    backgroundColor: "rgba(217, 217, 217, 0)",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    height: 38,
    left: 0,
  },
  dontHaveAn: {
    left: 17,
    fontSize: 12,
    fontWeight: "300",
    fontFamily: FontFamily.poppinsLight,
    color: "#000",
    textAlign: "left",
    lineHeight: 46,
    top: 0,
    position: "absolute",
  },
  rectangleParent: {
    top: 514,
    left: 42,
    height: 46,
  },
  welcomeBack: {
    top: 183,
    fontSize: 24,
    lineHeight: 27,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
  },
  lorenIpsumSdjfcs: {
    top: 254,
    fontSize: 18,
    lineHeight: 20,
    fontFamily: FontFamily.poppinsRegular,
  },
  sliderStarterChild: {
    left: 19,
    width: 35,
    borderRadius: Border.br_8xs,
    height: 9,
    top: 0,
    position: "absolute",
    backgroundColor: Color.cadetblue_100,
  },
  sliderStarterItem: {
    left: 0,
  },
  sliderStarterInner: {
    left: 60,
  },
  sliderStarter: {
    top: 113,
    left: 173,
    width: 72,
    height: 9,
    position: "absolute",
  },
  seperator: {
    marginLeft: -67,
    bottom: 11,
    borderRadius: 100,
    backgroundColor: "#1c1c1e",
    width: 134,
    height: 5,
  },
  vectorIcon: {
    height: "19.15%",
    width: "66.25%",
    top: "60.38%",
    right: "8.28%",
    bottom: "20.47%",
    left: "25.47%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  group3btnConponentChild: {
    right: "0%",
    left: "53.76%",
    backgroundColor: "transparent",
  },
  next: {
    left: "69.65%",
    color: Color.white,
  },
  back: {
    left: "15.9%",
  },
  group3btnConponentItem: {
    right: "53.76%",
    left: "0%",
  },
  group3btnConponent: {
    marginLeft: -173,
    top: 825,
    width: 346,
    height: 63,
  },
  view: {
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
    backgroundColor: Color.cadetblue_100,
  },
});

export default login;
