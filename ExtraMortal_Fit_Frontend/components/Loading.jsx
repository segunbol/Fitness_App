import React from "react";
import { Image, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";

const Loading = () => {
  return (
    <Animated.View
      entering={FadeInDown.duration(400).delay(200).springify().damping(3)}
    >
      <Image
        source={require("../assets/images/female_running.gif")}
        resizeMode="cover"
        style={{ width: wp(20), height: wp(22) }}
        className="rounded-[35px]"
      />
    </Animated.View>
  );
};

export default Loading;
