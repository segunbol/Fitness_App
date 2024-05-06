import React, { useContext, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../Context/store/AuthGlobal";
import axios from "axios";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
// {
//     userName
//     firstName
//     lastName
//     gender
//     userImg
//     password
//     isAdmin
//     verified
//     email
//     phoneNo
//     state
//     city
//   },

const CreateUser = () => {
  const [userName, setUserName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState();
  const [userImg, setUserImg] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [token, setToken] = useState("");
  const context = useContext(AuthGlobal);
  const gymId = context.stateUser.user._id;
  const router = useRouter();
  console.log(gymId);

  AsyncStorage.getItem("jwt")
    .then((token) => {
      setToken(token); // Log the token value to the console
    })
    .catch((error) => {
      console.error("Error retrieving token from AsyncStorage:", error);
    });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${baseURL}users/create`,
        {
          userName,
          firstName,
          lastName,
          gender,
          userImg,
          password,
          email,
          phoneNo,
          state,
          city,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      router.push("/admin");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
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
        <ScrollView style={{ width: wp(90), height: hp(80) }} className="pt-10">
          <View>
            <Text className="text-2xl text-white mb-4">Create User</Text>
            <TextInput
              className="border border-white rounded-md px-2 py-2 h-16 mb-4 text-white"
              placeholder="Enter Username"
              value={userName}
              onChangeText={setUserName}
            />
            <TextInput
              className="border border-white rounded-md px-4 h-16 py-2  mb-4 text-white"
              placeholder="Enter First name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              className="border border-white rounded-md px-4 py-2 h-16 mb-4 text-white"
              placeholder="Enter Last name"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              className="border border-white rounded-md px-4 py-2 h-16 mb-4 text-white"
              placeholder="Gender"
              value={gender}
              onChangeText={setGender}
            />
            {/* <TextInput
          className="border rounded-md px-4 py-2 mb-4"
          placeholder="Enter your profile picture URL (optional)"
          value={userImg}
          onChangeText={setUserImg}
        /> */}
            <TextInput
              className="border border-white rounded-md px-4 py-2 mb-4 h-16 text-white"
              placeholder="Enter OTP"
              value={password}
              onChangeText={setPassword}
              secureTextEntry // Make password field hidden
            />
            {/* Add similar TextInput components for email, phone number, state, and city */}
            <TextInput
              className="border border-white rounded-md px-4 py-2 mb-4 h-16 text-white"
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              className="border border-white rounded-md px-4 py-2 mb-4 h-16 text-white"
              placeholder="Enter Phone Number"
              value={phoneNo}
              onChangeText={setPhoneNo}
            />
            <TextInput
              className="border border-white rounded-md px-4 py-2 mb-4 h-16 text-white"
              placeholder="Enter City"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              className="border border-white rounded-md px-4 py-2 mb-4 h-16 text-white"
              placeholder="Enter State"
              value={state}
              onChangeText={setState}
            />
            {/* ... add similar fields for phoneNo, state, and city */}
            
            <Animated.View entering={FadeInDown.delay(800).springify()}>
              <TouchableOpacity
                onPress={submitHandler}
                style={{ height: hp(7), width: wp(80) }}
                className="bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
              >
                <Text
                  syle={{ fontSize: hp(3) }}
                  className="text-white font-bold text-3xl tracking-widest"
                >
                  Create User
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateUser;
