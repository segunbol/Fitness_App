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

import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginGym } from "../../Context/Actions/Auth.actions";

const Gymsignin = () => {
  const [userName, setUserName] = useState();
  const [gymName, setGymName] = useState();
  const [password, setPassword] = useState();
  const context = useContext(AuthGlobal);
  const [error, setError] = useState("");
  const router = useRouter();
  //   console.log(context);
  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      router.push("/admin");
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
          source={require("../../assets/images/anasta.jpg")}
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
          <Button
            title="Submit"
            onPress={handleSubmit}
            className="bg-rose-500 h-16"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Gymsignin;
