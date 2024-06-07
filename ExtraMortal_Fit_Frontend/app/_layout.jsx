import { Stack } from "expo-router";
import React from "react";
import { LogBox, Text, View } from "react-native";
import Auth from "../Context/store/Auth";

// const Stack = createNativeStackNavigator();

export default function _layout() {
  LogBox.ignoreLogs(["Warning:Failed prop type:"]);
  return (
    <Auth>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen
          name="index"
          options={{
            presentation: "fullScreen",
          }}
        /> */}
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
          name="GymSignInScreen"
          options={{
            presentation: "modal",
          }}
        />
         <Stack.Screen
          name="ListOfGymsScreen"
          
        />
      </Stack>
    </Auth>
  );
}
