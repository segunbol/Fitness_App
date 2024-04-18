import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-virtualized-view";

export default function exerciseDetails() {
  const item = useLocalSearchParams();
  const router = useRouter();

  if (!item || Object.keys(item).length === 0) {
    console.log(item);
    return null; // Return nothing if item is empty
  }

  {
    return (
      <View className="flex flex-1">
        <StatusBar style="dark" />
        <View
          className="shadow-md bg-neutral-200 rounded-b-[40px] rounded-t-[40px]"
          style={{ marginTop: hp(5) }}
        >
          <Image
            source={{ uri: item.gifUrl }}
            contentFit="cover"
            style={{ width: wp(100), height: wp(100) }}
            className="rounded-b-[40px]"
          />
        </View>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mx-2 absolute rounded-full left-0"
          style={{ marginTop: hp(5) }}
        >
          <Ionicons
            className="flex justify-center items-center ml-3"
            name="close-circle"
            size={hp(5)}
            color="#f43f5e"
          />
        </TouchableOpacity>
        <ScrollView
          className="mx-4 space-y-2 mt-3"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          <Text
            style={{ fontSize: hp(2.7) }}
            className="font-semibold text-neutral-800 tracking-wide"
          >
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
          <Text
            style={{ fontSize: hp(2.7) }}
            className=" text-neutral-800 tracking-wide"
          >
            Equipment:{" "}
            <Text className="font-semibold">
              {item?.equipment
                ? item.equipment.charAt(0).toUpperCase() +
                  item.equipment.slice(1)
                : "Not Available"}
            </Text>
          </Text>
          <Text
            style={{ fontSize: hp(2.7) }}
            className=" text-neutral-800 tracking-wide"
          >
            Target Muscle:{" "}
            <Text className="font-semibold">
              {item?.target?.charAt(0).toUpperCase() + item.target.slice(1) ||
                "Not Available"}
            </Text>
          </Text>
          <Text
            style={{ fontSize: hp(2.7) }}
            className=" text-neutral-800 tracking-wide"
          >
            Secondary Muscles:{" "}
            {item?.secondaryMuscles.charAt(0).toUpperCase() +
              item.secondaryMuscles.slice(1)}
          </Text>
          <Text
            style={{ fontSize: hp(2.7) }}
            className=" text-neutral-800 tracking-wide"
          >
            Instructions
          </Text>
          {item?.instructions &&
            item.instructions.split(".").map((instruction, index) => {
              instruction = instruction.replace(/,/g, "");
              return (
                <Text
                  style={{ fontSize: hp(2) }}
                  className="text-neutral-800 tracking-wide"
                  key={index}
                >
                  {instruction}
                </Text>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}
