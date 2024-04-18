import React, { Component } from "react";
import { Text, View } from "react-native";
import Carousel, {ParallaxImage} from "react-native-snap-carousel";
import { sliderImages } from "../constants/CarouselImages";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export default function ImageCarousel() {
  return (
    <Carousel
      data={sliderImages}
      loop={false}
      autoplay={true}
      renderItem={ItemCard}
      hasParallaxImages={true}
      sliderWidth={wp(100)}
      firstItem={1}
      autoplayInterval={5000}
      itemWidth={wp(100)-70}
      slideStyle={{display:'flex', alignItems: 'center'  }}
    ></Carousel>
  );
}

const ItemCard = ({item, index}, parallaxProps) => {
return(
    <View style={{width:wp(100)-70, height:hp(25)}}>
    <ParallaxImage
        source={item}
        containerStyle={{borderRadius: 50, flex:1}}
        style={{resizeMode: 'contain'}}
        parallaxFactor={1}
        {...parallaxProps}
        key={index}
    />
    
    </View>
)
}