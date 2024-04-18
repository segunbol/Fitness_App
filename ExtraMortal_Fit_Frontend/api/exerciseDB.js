import axios from "axios";
import { rapidApiKey } from "../constants/CarouselImages";
import baseURL from "../constants/baseUrl";

const baseUrl = "https://exercisedb.p.rapidapi.com";
const apiCall = async (url, params) => {
  try {
    const options = {
      method: "GET",
      url,
      params,
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchExercisesByBodypart = async (bodyPart)=>{
    let data = await apiCall(baseUrl+`/exercises/bodyPart/${bodyPart}`)
    return data
}

const apiCaller = async (url, params) => {
  try {
    const options = {
      method: "GET",
      url,
      params,
      headers: {
        Authorization : "999999",  
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const fetchExercisesByBodyparts = async (bodypart)=>{
  let data = await apiCaller(baseURL+`exercises/bodypart/${bodypart}`)
  return data
}