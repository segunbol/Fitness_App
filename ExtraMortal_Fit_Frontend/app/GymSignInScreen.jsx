import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-virtualized-view";

// import { Store } from "../context/Store";
import { useRouter } from "expo-router";

import AuthGlobal from "../Context/store/AuthGlobal";
import { loginGym } from "../Context/Actions/Auth.actions";
import Animated, { FadeInDown } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

const Gymsignin = () => {
  const [gymName, setGymName] = useState();
  const [password, setPassword] = useState();
  const context = useContext(AuthGlobal);
  const [error, setError] = useState("");
  const router = useRouter();
  const authe = context.stateUser.isAuthenticated;
  // console.log(authe);
  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      router.replace("/admin");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      gymName,
      password,
    };

    if (gymName === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginGym(user, context.dispatch);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white space-y-7" edges={["top"]}>
      <StatusBar style="light" />
      <View className="flex-1 justify-center items-center">
        <Image
          className="h-full w-full absolute"
          source={require("../assets/images/anasta.jpg")}
        />

        <View style={{ width: wp(90), height: hp(30) }} className="">
          <Text className="text-2xl text-white mb-4">Gym Sign In</Text>
          <TextInput
            className="border border-white rounded-md px-2 py-2 h-16 mb-4 text-white"
            placeholder="Enter Username"
            value={gymName}
            onChangeText={setGymName}
          />
          <TextInput
            className="border border-white rounded-md px-4 py-2 mb-4 h-16 text-white"
            placeholder="Enter OTP"
            value={password}
            onChangeText={setPassword}
            secureTextEntry // Make password field hidden
          />

          {/* ... add similar fields for phoneNo, state, and city */}

          <Animated.View entering={FadeInDown.delay(800).springify()}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{ height: hp(7), width: wp(80) }}
              className="bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
            >
              <Text
                syle={{ fontSize: hp(3) }}
                className="text-white font-bold text-3xl tracking-widest"
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Gymsignin;
