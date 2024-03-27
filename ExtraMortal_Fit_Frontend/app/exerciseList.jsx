import { useLocalSearchParams, useRouter } from "expo-router";
import React, { Component, useEffect, useState } from "react";
import { Image,  Text, TouchableOpacity, View } from "react-native";
import { fetchExercisesByBodypart } from "../api/exerciseDB";
import { dommyData } from "../constants/CarouselImages";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListOfExercises from "../components/ListOfExercises";
import {ScrollView} from "react-native-virtualized-view"

export default function exerciseList() {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [exercises, setExercises] = useState(dommyData);

  useEffect(() => {
    // if(item) getExercises(item.name)
  }, [item]);

  const getExercises = async (bodypart) => {
    let data = await fetchExercisesByBodypart(bodypart);
    setExercises(data);
  };
  return (
    <ScrollView>
      <StatusBar style="light" />
      <Image
        source={item.image}
        style={{ width: wp(100), height: hp(40) }}
        className="rounded-b-[40px]"
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-rose-500 absolute rounded-full flex justify-center items-center ml-3"
        style={{ height: hp(5), width: hp(5), marginTop: hp(7) }}
      >
        <Ionicons
          className="flex justify-center items-center ml-3"
          name="arrow-back-circle-sharp"
          size={hp(4)}
          color="white"
        />
      </TouchableOpacity>
      {/* exercises list */}
      <View className='mx-4 space-y-3 mt-4'>
      <Text style={{fontSize:hp(3)}} className='font-semibold text-neutral-700'>
        Workout Programs For {item.name.charAt(0).toUpperCase() + item.name.slice(1)} 
      </Text>
        <View>
            <ListOfExercises data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
}
