import React, { Component, useContext, useEffect, useState } from "react";
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
import axios from "axios";
import baseURL from "../../constants/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../../Context/store/AuthGlobal";
import Loading from "../../components/Loading";
import { logoutUser } from "../../Context/Actions/Auth.actions";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function UserProfile() {
  const router = useRouter();
  const [activeSubscribers, setActiveSubscribers] = useState();
  const [inactiveSubscribers, setInactiveSubscribers] = useState();
  const [totalSubscribers, setTotalSusbribers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(AuthGlobal);
  const userId = context.stateUser.user._id;
  const userName = context.stateUser.user.userName;
  const user = context.stateUser.user
  console.log(user);

  useEffect(() => {
    // Check if user is logged in
    if (!userName) {
      router.push("/SignInScreen");
    }
    AsyncStorage.getItem("jwt")
      .then((token) => {
        if (token) {
          console.log(token);
        }
      })
      .catch((error) => {
        console.error("Error retrieving token from AsyncStorage:", error);
      });
  }, []);

  const handleLogout = () => {
    logoutUser(context.dispatch);
    router.replace("/");
  };

  useEffect(() => {
    const datas = async () => {
      const data = await axios.get(`${baseURL}subscriptions/summary/${userId}`);
      // console.log(data.data);
      setActiveSubscribers(data.data.activeSubscribers);
      setInactiveSubscribers(data.data.inactiveSubscribers);
      setTotalSusbribers(data.data.totalSubscribers);
      setIsLoading(false);
    };
    datas();
  }, [userId]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-200 space-y-5 " edges={["top"]}>
      <StatusBar style="dark" />

      <View className="pt-4 flex-row justify-between items-center mx-5 ">
        <View className="space-y-2">
          <Text style={{ fontSize: hp(3.5) }} className=" font-bold">
            Welcome,
          </Text>
          <Text style={{ fontSize: hp(4) }} className="text-rose-500 font-bold">
            {userName}
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
                Update Details
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/ListOfGymsScreen" })}
          >
            <View
              style={{ height: hp(5), width: hp(14), fontSize: hp(4.5) }}
              className="bg-green-200 rounded-[35px] flex justify-center items-center"
            >
              <Text style={{ fontSize: hp(1.7) }} className="font-bold">
                Update Details
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View
              style={{ height: hp(5), width: hp(14), fontSize: hp(4.5) }}
              className="bg-neutral-300 rounded-[35px] flex justify-center items-center"
            >
              <Text style={{ fontSize: hp(1.7) }} className="font-bold">
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <ImageCarousel />
      </View>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          className=" "
        >
          <Loading />
          {/* Loading indicator here */}
          <Text>Loading data...</Text>
        </View>
      ) : (
        <ScrollView>
          <View className="mx-4 bg-gray-200 rounded-[10px]">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-semibold text-neutral-700"
            >
              My Profile{" "}
            </Text>
            {/* WORKOUT PLAN */}
            <View className="pt-4 flex-column justify-between items-center ">
              <Animated.View
                entering={FadeInDown.duration(400)
                  .delay(1 * 200)
                  .springify()
                  .damping(3)}
              >
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/ListOfUsers",
                      params: { name: "active" },
                    })
                  }
                  style={{
                    width: wp(93),
                    height: wp(20),
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                  }}
                  className="flex justify-end mb-4 bg-white rounded-[10px]"
                >
                  <View className="flex flex-column mb-3 p-3 bg-white rounded-[10px]">
                    <Text
                      style={{ fontSize: hp(2) }}
                      className="text-neutral-700 text-left"
                    >
                      Goal
                    </Text>

                    <Text
                      style={{ fontSize: hp(2.4) }}
                      className="text-black  font-semibold text-center tracking-wide"
                    >
                      {user.goals}
                    </Text>
                  </View>
                  <View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={24}
                      color="#e0e0e0"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/ListOfUsers",
                      params: { name: "active" },
                    })
                  }
                  style={{
                    width: wp(93),
                    height: wp(20),
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                  }}
                  className="flex justify-end mb-4 bg-white rounded-[10px]"
                >
                  <View className="flex flex-column mb-3 p-3 bg-white rounded-[10px]">
                    <Text
                      style={{ fontSize: hp(2) }}
                      className="text-neutral-700 text-left"
                    >
                      Focus Area
                    </Text>

                    <Text
                      style={{ fontSize: hp(2.4) }}
                      className="text-black  font-semibold text-center tracking-wide"
                    >
                    {user.focusArea}
                    </Text>
                  </View>
                  <View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={24}
                      color="#e0e0e0"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/ListOfUsers",
                      params: { name: "active" },
                    })
                  }
                  style={{
                    width: wp(93),
                    height: wp(20),
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                  }}
                  className="flex justify-end mb-3 bg-white rounded-[10px]"
                >
                  <View className="flex flex-column mb-3 p-3 bg-white rounded-[10px]">
                    <Text
                      style={{ fontSize: hp(2) }}
                      className="text-neutral-700 text-left"
                    >
                      Available Equipment
                    </Text>

                    <Text
                      style={{ fontSize: hp(2.4) }}
                      className="text-black  font-semibold tracking-wide"
                    >
                      18 Selected
                    </Text>
                  </View>
                  <View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={24}
                      color="#e0e0e0"
                    />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
            {/* BASIC INFO */}
            <View className="pb-6 flex ">
              <Text
                style={{ fontSize: hp(2) }}
                className="flex font-semibold text-neutral-700 justify-end pb-3"
              >
                Basic Info{" "}
              </Text>
              <Animated.View
                entering={FadeInDown.duration(400)
                  .delay(1 * 200)
                  .springify()
                  .damping(3)}
              >
                <View
                  className="flex justify-center flex-column items-center bg-white rounded-[10px]"
                  style={{
                    width: wp(93),
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/ListOfUsers",
                        params: { name: "total" },
                      })
                    }
                    style={{
                      width: wp(90),
                      height: wp(15),
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row", // Set flexDirection to row
                      justifyContent: "space-between",
                      alignItems: "center",
                      position: "relative",
                    }}
                    className="flex-row justify-between bg-white border-b border-neutral-300 "
                  >
                    <Text
                      className="text-neutral-700 font-bold text-bold p-3"
                      style={{ fontSize: hp(2) }}
                    >
                      Gender
                    </Text>

                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: hp(2.4),
                        }}
                        className="text-black font-bold tracking-wide px-3"
                      >
                        {user.gender}
                      </Text>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={24}
                        color="#e0e0e0"
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/ListOfUsers",
                        params: { name: "total" },
                      })
                    }
                    style={{
                      width: wp(90),
                      height: wp(15),
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row", // Set flexDirection to row
                      justifyContent: "space-between",
                      alignItems: "center",
                      position: "relative",
                    }}
                    className="flex-row justify-between bg-white border-b border-neutral-300 "
                  >
                    <Text
                      className="text-neutral-700 font-bold text-bold p-3"
                      style={{ fontSize: hp(2) }}
                    >
                      Current Weight
                    </Text>

                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: hp(2.4),
                        }}
                        className="text-black font-bold tracking-wide px-3"
                      >
                        {user.currentWeight}kg
                      </Text>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={24}
                        color="#e0e0e0"
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/ListOfUsers",
                        params: { name: "total" },
                      })
                    }
                    style={{
                      width: wp(90),
                      height: wp(15),
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row", // Set flexDirection to row
                      justifyContent: "space-between",
                      alignItems: "center",
                      position: "relative",
                    }}
                    className="flex-row justify-between bg-white border-b border-neutral-300 "
                  >
                    <Text
                      className="text-neutral-700 font-bold text-bold p-3"
                      style={{ fontSize: hp(2) }}
                    >
                      Target Weight
                    </Text>

                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: hp(2.4),
                        }}
                        className="text-black font-bold tracking-wide px-3"
                      >
                        {user.targetWeight}kg
                      </Text>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={24}
                        color="#e0e0e0"
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/ListOfUsers",
                        params: { name: "total" },
                      })
                    }
                    style={{
                      width: wp(90),
                      height: wp(15),
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row", // Set flexDirection to row
                      justifyContent: "space-between",
                      alignItems: "center",
                      position: "relative",
                    }}
                    className="flex-row justify-between bg-white border-b border-neutral-300 "
                  >
                    <Text
                      className="text-neutral-700 font-bold text-bold p-3 "
                      style={{ fontSize: hp(2) }}
                    >
                      Height
                    </Text>

                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: hp(2.4),
                        }}
                        className="text-black font-bold tracking-wide px-3"
                      >
                        {user.height}
                      </Text>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={24}
                        color="#e0e0e0"
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/ListOfUsers",
                        params: { name: "total" },
                      })
                    }
                    style={{
                      width: wp(90),
                      height: wp(15),
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row", // Set flexDirection to row
                      justifyContent: "space-between",
                      alignItems: "center",
                      position: "relative",
                    }}
                    className="flex-row justify-between bg-white border-b border-neutral-300 "
                  >
                    <Text
                      className="text-neutral-700 font-bold text-bold p-3"
                      style={{ fontSize: hp(2) }}
                    >
                      Gym Subscribed
                    </Text>

                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: hp(2.4),
                        }}
                        className="text-black font-bold tracking-wide px-3"
                      >
                        Sweathub
                      </Text>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={24}
                        color="#e0e0e0"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
