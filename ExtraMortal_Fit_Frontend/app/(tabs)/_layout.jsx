import React, { Component } from "react";
import { Text, View } from "react-native";
import { Tabs } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function _layout() {
  return (
    <Tabs  screenOptions={{
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title:'programs',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              className="flex justify-center items-center ml-3"
              name="weight-lifter"
              size={hp(5)}
              color="#f43f5e"
            />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen name="admin" options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              className="flex justify-center items-center ml-3"
              name="account-details"
              size={hp(5)}
              color="#f43f5e"
            />
          ),
        }}></Tabs.Screen>
      <Tabs.Screen name="profile" options={{
          tabBarIcon: () => (
            <MaterialIcons
              className="flex justify-center items-center ml-3"
              name="person"
              size={hp(5)}
              color="#f43f5e"
            />
          ),
        }}></Tabs.Screen>
    </Tabs>
  );
}