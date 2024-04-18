import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageCarousel from "../components/ImageCarousel";
import BodyParts from "../components/BodyParts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../Context/store/AuthGlobal";

export default function Home() {
  const context = useContext(AuthGlobal);
  // console.log(context.stateUser.user)
  AsyncStorage.getItem("jwt")
    .then((token) => {
      console.log(token); // Log the token value to the console
    })
    .catch((error) => {
      console.error("Error retrieving token from AsyncStorage:", error);
    });

  return (
    <SafeAreaView className="flex-1 bg-white space-y-5" edges={["top"]}>
      <StatusBar style="dark" />

      {/* punch line Avatar */}
      <View className="flex-row justify-between items-center mx-5">
        <View className="space-y-2">
          <Text style={{ fontSize: hp(4) }} className=" font-bold">
            Ready To
          </Text>
          <Text
            style={{ fontSize: hp(4.5) }}
            className="text-rose-500 font-bold"
          >
            Workout?
          </Text>
        </View>

        {/* Image Slider Carousel */}
        <View className="flex justify-center items-center space-y-2">
          <Image
            source={require("../assets/images/Smiling-bg.png")}
            className="rounded-full"
            style={{ height: hp(8), width: hp(8) }}
          />
          <View
            style={{ height: hp(5), width: hp(5) }}
            className="bg-neutral-200 rounded-full flex justify-center items-center border-[3px] border-neutral-500"
          >
            <Ionicons name="notifications-sharp" size={hp(3)} color="gray" />
          </View>
        </View>
      </View>
      <View>
        <ImageCarousel />
      </View>

      {/* body parts list */}
      <View className="flex-1">
        <BodyParts />
      </View>
    </SafeAreaView>
  );
}
