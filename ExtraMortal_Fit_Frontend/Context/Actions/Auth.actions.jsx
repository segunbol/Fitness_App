import jwt_decode from 'jwt-decode'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import baseURL from "../../constants/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
  console.log(dispatch);
  fetch(`${baseURL}auth/signin`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (data.token) {
        // console.log(data.info)
        const token = data.token;
        try {
          await AsyncStorage.setItem("jwt", token);
          if (typeof token !== "string") {
            throw new Error("Invalid token format");
          }
          const decoded = data.info;
          // console.log(decoded);
          dispatch(setCurrentUser(decoded, user));
        } catch (error) {
          console.error("Error saving token to AsyncStorage:", error);
          // Handle other errors gracefully, e.g., display an error message to the user
        }
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please provide correct credentials",
        text2: "",
      });
      logoutUser(dispatch);
    });
};

export const loginGym = (user, dispatch) => {
  console.log(dispatch);
  fetch(`${baseURL}gymauth/gymsignin`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (data.token) {
        // console.log(data.info)
        const token = data.token;
        try {
          await AsyncStorage.setItem("jwt", token);
          if (typeof token !== "string") {
            throw new Error("Invalid token format");
          }
          const decoded = data.info;
          // console.log(decoded);
          dispatch(setCurrentUser(decoded, user));
        } catch (error) {
          console.error("Error saving token to AsyncStorage:", error);
          // Handle other errors gracefully, e.g., display an error message to the user
        }
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please provide correct credentials",
        text2: "",
      });
      logoutUser(dispatch);
    });
};

export const getUserProfile = (_id, user) => {
  fetch(`${baseURL}users/${_id}`, {
    method: "GET",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  // console.log(decoded);
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
