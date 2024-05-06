import React from "react";
import { StatusBar, Text, View, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { useRouter } from "expo-router";

export default function index() {
  const router = useRouter()

  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require("../assets/images/anasta.jpg")}
      />
      <LinearGradient
        colors={["transparent", "#18181b"]}
        style={{ width: wp(100), height: hp(70) }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        className="flex justify-end pb-12 space-y-8"
      >
        <Animated.View
          entering={FadeInDown.delay(600).springify()}
          className="flex items-center"
        >
          <Text
            syle={{ fontSize: hp(5) }}
            className="text-white font-bold text-3xl tracking-wide"
          >
            <Text className="text-rose-500 text-3xl">ExtraMortal</Text> Workouts
          </Text>
          <Text
            syle={{ fontSize: hp(5) }}
            className="text-white text-3xl font-bold tracking-wide"
          >
            For You
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(800).springify()}>
          <TouchableOpacity
            onPress={()=> router.push('/SignInScreen')}
            style={{ height: hp(7), width: wp(80)}}
            className="bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
          >
            <Text
              syle={{ fontSize: hp(3) }}
              className="text-white font-bold text-3xl tracking-widest"
            >
              User Sign In
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(800).springify()}>
          <TouchableOpacity
            onPress={()=> router.push('/GymSignInScreen')}
            style={{ height: hp(7), width: wp(80)}}
            className="bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
          >
            <Text
              syle={{ fontSize: hp(3) }}
              className="text-white font-bold text-3xl tracking-widest"
            >
              Gym Sign In
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}
