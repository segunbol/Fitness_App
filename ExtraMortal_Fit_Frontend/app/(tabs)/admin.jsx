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

export default function BodyParts() {
  const router = useRouter();
  const [activeSubscribers, setActiveSubscribers] = useState();
  const [inactiveSubscribers, setInactiveSubscribers] = useState();
  const [totalSubscribers, setTotalSusbribers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(AuthGlobal);
  const gymId = context.stateUser.user._id;
  const gymName = context.stateUser.user.gymName;
  console.log(gymName);

  useEffect(() => {
    // Check if user is logged in
    AsyncStorage.getItem("jwt")
      .then((token) => {
        if (!gymName) {
          // If token doesn't exist, navigate user to sign-in screen
          console.log(token);
          router.push("/Home");
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
      const data = await axios.get(`${baseURL}subscriptions/summary/${gymId}`);
      console.log(data.data);
      setActiveSubscribers(data.data.activeSubscribers);
      setInactiveSubscribers(data.data.inactiveSubscribers);
      setTotalSusbribers(data.data.totalSubscribers);
      setIsLoading(false);
    };
    datas();
  }, [gymId]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-200 space-y-5" edges={["top"]}>
      <StatusBar style="dark" />

      <View className="pt-4 flex-row justify-between items-center mx-5">
        <View className="space-y-2">
          <Text style={{ fontSize: hp(3.5) }} className=" font-bold">
            Welcome,
          </Text>
          <Text style={{ fontSize: hp(4) }} className="text-rose-500 font-bold">
            {gymName}
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
          <View className="mx-4">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-semibold text-neutral-700"
            >
              Customer Summary{" "}
            </Text>
            {/* <FlatList
            data={data}
            numColumns={2}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item, index }) => (
              <BodyPartCard router={router} index={index} item={item} />
            )}
          /> */}
            <View className="pt-4 flex-row justify-between space-x-5 items-center ">
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
                    width: wp(44),
                    height: wp(48),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                  className="flex justify-end mb-4 bg-black rounded-[35px]"
                >
                  <Image
                    source={require("../../assets/images/slide2.jpeg")}
                    resizeMode="cover"
                    style={{ width: wp(44), height: wp(48) }}
                    className="rounded-[35px] absolute"
                  />
                  <Text className="text-neutral-300"></Text>

                  <Text
                    style={{ fontSize: hp(6) }}
                    className="text-white  font-semibold text-center tracking-wide"
                  >
                    {activeSubscribers.count}
                  </Text>
                  <Text
                    style={{ fontSize: hp(2.4) }}
                    className="text-white  font-semibold text-center tracking-wide"
                  >
                    Active
                  </Text>
                </TouchableOpacity>
              </Animated.View>
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
                      params: { name: "inactive" },
                    })
                  }
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
                  <Image
                    source={require("../../assets/images/slide2.jpeg")}
                    resizeMode="cover"
                    style={{ width: wp(44), height: wp(48) }}
                    className="rounded-[35px] absolute"
                  />
                  <Text className="text-neutral-300"></Text>

                  <Text
                    style={{ fontSize: hp(6) }}
                    className="text-white  font-semibold text-center tracking-wide"
                  >
                    {inactiveSubscribers.count}
                  </Text>
                  <Text
                    style={{ fontSize: hp(2.4) }}
                    className="text-white  font-semibold text-center tracking-wide"
                  >
                    Inactive
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
            {/* <View className="flex-row justify-between items-center ">
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
                      params: { name: "total" },
                    })
                  }
                  style={{
                    width: wp(93),
                    height: wp(48),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                  className="flex justify-end mb-4 bg-neutral-200 rounded-[35px]"
                >
                  <Image
                    source={require("../../assets/images/slide2.jpeg")}
                    resizeMode="cover"
                    style={{ width: wp(44), height: wp(48) }}
                    className="rounded-[35px] absolute"
                  />
                  <Text className="text-neutral-300"></Text>
                 
                  <Text
                    style={{ fontSize: hp(6) }}
                    className="text-white  font-semibold text-center tracking-wide"
                  >
                    {totalSubscribers.count}
                  </Text>
                  <Text
                    style={{ fontSize: hp(2.4) }}
                    className="text-white  font-semibold text-center tracking-wide"
                  >
                    Total Subscribers
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View> */}
          </View>
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
                    Max Strenght
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
                    Full Body
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
                    className="text-black  font-semibold text-center tracking-wide"
                  >
                    Max Strenght
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
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
