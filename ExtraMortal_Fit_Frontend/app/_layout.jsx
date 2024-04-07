import { Stack } from "expo-router";
import React from "react";
import { LogBox, Text, View } from "react-native";


// const Stack = createNativeStackNavigator();

export default function _layout() {
  LogBox.ignoreLogs(["Warning:Failed prop type:"]);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="exerciseList"
        options={{
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen
        name="ListOfUsers"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="exerciseDetails"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="CreateUser"
        // options={{
        //   presentation: "modal",
        // }}
      />
    </Stack>
    
  );
}
