import React, { Component } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { bodyParts } from "../../constants/CarouselImages";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import ImageCarousel from "../../components/ImageCarousel";
import { ScrollView } from "react-native-virtualized-view";
import ListOfUsers from "../ListOfUsers";

const data = [
  { name: "Total Customers", result: 200 },
  { name: "Active Customers", result: 60 },
  { name: "Inactive Customers", result: 140 },
  { name: "Financial Stand", result: 350000 },
];

export default function BodyParts() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white space-y-5" edges={["top"]}>
      <StatusBar style="dark" />
      <View className="pt-4 flex-row justify-between items-center mx-5">
        <View className="space-y-2">
          <Text style={{ fontSize: hp(3.5) }} className=" font-bold">
            Welcome,
          </Text>
          <Text style={{ fontSize: hp(4) }} className="text-rose-500 font-bold">
            SweatHub Gym
          </Text>
        </View>
        <View className="flex justify-center items-center space-y-2">
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/CreateUser" })}
          >
            <View
              style={{ height: hp(5), width: hp(14), fontSize: hp(4.5) }}
              className="bg-green-200 rounded-[35px] flex justify-center items-center"
            >
              <Text style={{ fontSize: hp(1.7) }} className="font-bold">
                Create Customer
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{ height: hp(5), width: hp(14), fontSize: hp(4.5) }}
              className="bg-neutral-200 rounded-[35px] flex justify-center items-center"
            >
              <Text style={{ fontSize: hp(1.7) }} className="font-bold">
                Update DashBoard
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <ImageCarousel />
      </View>
      <ScrollView>
        <View className="mx-4">
          <Text
            style={{ fontSize: hp(3) }}
            className="font-semibold text-neutral-700"
          >
            Customer Summary{" "}
          </Text>
          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item, index }) => (
              <BodyPartCard router={router} index={index} item={item} />
            )}
          />
        </View>
        {/* <ListOfUsers /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const BodyPartCard = ({ item, router, index }) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(400)
        .delay(1 * 200)
        .springify()
        .damping(3)}
    >
      <TouchableOpacity
        onPress={() => router.push({ pathname: "/ListOfUsers" })}
        style={{
          width: wp(44),
          height: wp(48),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
        className="flex justify-end mb-4 bg-black rounded-[35px]"
      >
        {/* <Image
          source={require("../../assets/images/slide2.jpeg")}
          resizeMode="cover"
          style={{ width: wp(44), height: wp(48) }}
          className="rounded-[35px] absolute"
        /> */}
        <Text className="text-neutral-300"></Text>
        {/* <LinearGradient
              colors={["transparent", "black"]}
              style={{ width: wp(44), height: hp(5) }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0, y: 1 }}
              className="absolute bottom-0 rounded-b-[35px]"
            /> */}
        <Text
          style={{ fontSize: hp(6) }}
          className="text-white  font-semibold text-center tracking-wide"
        >
          {item.result}
        </Text>
        <Text
          style={{ fontSize: hp(2.4) }}
          className="text-white  font-semibold text-center tracking-wide"
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
