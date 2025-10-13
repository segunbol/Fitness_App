import React, { Component } from "react";
import { Text, View } from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { sliderItems } from "../constants/CarouselImages";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ImageCarousel() {
  return (
    <View>
      <View className="mx-4">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-700"
        >
          Transaction Summary{" "}
        </Text>
      </View>

      <Carousel
        data={sliderItems}
        loop={false}
        autoplay={false}
        renderItem={ItemCard}
        sliderWidth={wp(100)}
        firstItem={0}
        autoplayInterval={5000}
        itemWidth={wp(100) - 70}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
      <View>
        <Text>Current Month</Text>
      </View>
    </View>
  );
}

// Updated ItemCard
const ItemCard = ({ item }) => {
  return (
    <View
      style={{
        width: wp(100) - 70,
        height: hp(25),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
        padding: 10,
      }}
    >
      {item.component}
    </View>
  );
};
