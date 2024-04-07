import React, { useState } from "react";
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

const data = [
  { userName: "ExtraMortal", firstName: "Segun", lastActive: "June 2023" },
  { userName: "Mortal", firstName: "Segs", lastActive: "May 2023" },
  { userName: "Extra", firstName: "Segun Bolawole", lastActive: "May 2023" },
  { userName: "Segs", firstName: "Emma", lastActive: "Dec 2023" },
  { userName: "ExtraMortal", firstName: "Segun", lastActive: "June 2023" },
  { userName: "Mortal", firstName: "Segs", lastActive: "May 2023" },
  { userName: "Extra", firstName: "Segun Bolawole", lastActive: "May 2023" },
  { userName: "Segs", firstName: "Emma", lastActive: "Dec 2023" },
  { userName: "ExtraMortal", firstName: "Segun", lastActive: "June 2023" },
  { userName: "Mortal", firstName: "Segs", lastActive: "May 2023" },
  { userName: "Extra", firstName: "Segun Bolawole", lastActive: "May 2023" },
  { userName: "Segs", firstName: "Emma", lastActive: "Dec 2023" },
  { userName: "ExtraMortal", firstName: "Segun", lastActive: "June 2023" },
  { userName: "Mortal", firstName: "Segs", lastActive: "May 2023" },
  { userName: "Extra", firstName: "Segun Bolawole", lastActive: "May 2023" },
  { userName: "Segs", firstName: "Emma", lastActive: "Dec 2023" },
  { userName: "ExtraMortal", firstName: "Segun", lastActive: "June 2023" },
  { userName: "Mortal", firstName: "Segs", lastActive: "May 2023" },
  { userName: "Extra", firstName: "Segun Bolawole", lastActive: "May 2023" },
  { userName: "Segs", firstName: "Emma", lastActive: "Dec 2023" },
];

const RenderItem = ({ item, isChecked, onToggle }) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onToggle} style={styles.select}>
        <Checkbox
          value={isChecked}
          color={isChecked ? "#00FF00" : undefined}
          onValueChange={onToggle}
        />
      </TouchableOpacity>
      <Text style={styles.cell}> {item.userName} </Text>
      <Text style={styles.cell}> {item.firstName} </Text>
      <Text style={styles.cell}> {item.lastActive}</Text>
    </View>
  );
};

export function ListOfUsers() {
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedList, setSelectedList] = useState([]);

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
    const selectedItems = data.filter((_, index) => checkedItems[index]);
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
          <Text style={styles.headerText}> NAME </Text>
          <Text style={styles.headerText}> LAST ACTIVE </Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.userName + index}
          showsVerticalScrollIndicator={false}
        />
        <Button title="Print Selected Items" onPress={printSelectedItems} />
        <Text style={styles.selectedItemsLabel}>Selected Items:</Text>
        {selectedList.map((item, index) => (
          <Text key={index} style={styles.selectedItemText}>
            {item.userName}
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
