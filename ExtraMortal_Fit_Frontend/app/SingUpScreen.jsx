import React, { useState } from "react";
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

const SignUp = () => {
  const [userName, setUserName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState();
  const [userImg, setUserImg] = useState();
  const [password, setPassword] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [verified, setVerified] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Name:", firstName);
    console.log("Email:", email);

    // ... Your form submission logic hereanasta.jpg
  };

  return (
    <SafeAreaView className="flex-1 bg-white space-y-7" edges={["top"]}>
      <StatusBar style="light" />
      <View className="flex-1 justify-center items-center">
        <Image
          className="h-full w-full absolute"
          source={require("../assets/images/anasta.jpg")}
        />
        <View style={{ width: wp(90), height: hp(90) }} className="">
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
          <Button title="Submit" onPress={handleSubmit} className="bg-rose-500 h-16" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
