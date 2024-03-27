import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated"


export default function ListOfExercises({ data }) {
  const router = useRouter();

  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <ExerciseCard router={router} index={index} item={item} />
        )}
      />
    </View>
  );
}

const ExerciseCard = ({ item, router, index }) => {
  return (
    <Animated.View entering={FadeInDown.duration(400).delay(index*200).springify().damping(3)}>
      <TouchableOpacity
        onPress={() => router.push({ pathname: "/exerciseDetails", params: item })}
        // style={{ width: wp(44), height: wp(52) }}
        className="flex py-3 space-y-2"
      >
        <View className="bg-neutral-200 shadow rounded-[25px]">
          <Image
            source={{ uri: item.gifUrl }}
            contentFit="cover"
            style={{ width: wp(44), height: wp(52) }}
            className="rounded-[25px]"
          />
        </View>

        <Text
          style={{ fontSize: hp(1.5) }}
          className="text-neutral-700 font-bold ml-1 tracking-wide"
        >
          {item?.name?.length>20? item.name.slice(0,24)+"..." : item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
