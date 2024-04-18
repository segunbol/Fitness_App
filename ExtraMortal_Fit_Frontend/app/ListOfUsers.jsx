import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import Checkbox from "expo-checkbox";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useLocalSearchParams, useRouter } from "expo-router";
import baseURL from "../constants/baseUrl";
import axios from "axios";
import Animated, { FadeInDown } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../Context/store/AuthGlobal";

const RenderItem = ({ item, isChecked, onToggle }) => {
  return (
    <View key={item.userName} style={styles.row}>
      <TouchableOpacity onPress={onToggle} style={styles.select}>
        <Checkbox
          value={isChecked}
          color={isChecked ? "#00FF00" : undefined}
          onValueChange={onToggle}
        />
      </TouchableOpacity>
      <Text style={styles.cell}> {item.customerUsername} </Text>
      <Text style={styles.cell}> {item.subscriptionType} </Text>
      <Text style={styles.cell}> {item.endDate.toString().slice(0, 10)}</Text>
    </View>
  );
};

export function ListOfUsers() {
  const item = useLocalSearchParams();
  const router = useRouter();
  console.log(item.name);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedList, setSelectedList] = useState([]);
  const [datas, setDAtas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(AuthGlobal);
  // console.log(context.stateUser.user)
  AsyncStorage.getItem("jwt")
    .then((token) => {
      console.log(token); // Log the token value to the console
    })
    .catch((error) => {
      console.error("Error retrieving token from AsyncStorage:", error);
    });

  useEffect(() => {
    const datas = async () => {
      const data = await axios.get(
        `${baseURL}subscriptions/summary/66058439dc04eea2eec9bafe?${item.name}=true`
      );
      console.log(data.data.list);
      setDAtas(data.data.list);
      setIsLoading(false);
    };
    datas();
  }, []);

  const toggleItem = (index) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [index]: !prevCheckedItems[index],
    }));
  };

  const renderItem = ({ item, index }) => (
    <RenderItem
      item={item}
      isChecked={checkedItems[index] || false}
      onToggle={() => toggleItem(index)}
    />
  );

  const printSelectedItems = () => {
    const selectedItems = datas.filter((_, index) => checkedItems[index]);
    setSelectedList(selectedItems);
    console.log(selectedItems);
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.select}>
            <Checkbox
            // value={isChecked}
            // color={isChecked ? "#00FF00" : undefined}
            // // onValueChange={onToggle}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}> USERNAME </Text>
          <Text style={styles.headerText}> SUB TYPE </Text>
          <Text style={styles.headerText}>
            {" "}
            {item.name === "inactive" ? "LAST ACTIVE" : "END DATE"}{" "}
          </Text>
        </View>
        {isLoading ? (
          <Text style={styles.headerText}> Loading </Text>
        ) : (
          <FlatList
            data={datas}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.userName}
            showsVerticalScrollIndicator={false}
          />
        )}
        <Animated.View entering={FadeInDown.delay(800).springify()}>
          <TouchableOpacity
            onPress={printSelectedItems}
            style={{ height: hp(7), width: wp(80) }}
            className="bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
          >
            <Text
              syle={{ fontSize: hp(3) }}
              className="text-white font-bold text-3xl tracking-widest"
            >
              Reach Out
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.selectedItemsLabel}>Reach Out</Text>
        {selectedList.map((item, index) => (
          <Text key={index} style={styles.selectedItemText}>
            {item.customerUsername}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default ListOfUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  listContainer: {
    flex: 1,
    borderBottomColor: "rgb(244 63 94)",
  },
  header: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F43F5E",
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 1,
    marginVertical: 8,
    elevation: 1,
    borderRadius: 3,
    paddingVertical: 10,
    backgroundColor: "#fff",
    border: "black",
    paddingHorizontal: 2,
    borderBottomColor: "#F43F5E",
    borderBottomWidth: 1,
  },
  cell: {
    fontSize: 14,
    flex: 1,
    borderBottomColor: "rgb(244 63 94)",
  },
  select: {
    width: wp(10),
    borderColor: "#F43F5E",
  },
  selectedItemsLabel: {
    fontSize: 18,
    marginTop: 10,
  },
  selectedItemText: {
    fontSize: 16,
    marginTop: 5,
  },
});
