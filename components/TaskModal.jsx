import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import FormField from "./FormField";
import CustomButton from "./CustomButton";
// import { ModalContent, ModalTitle, SlideAnimation } from "react-native-modals";

const data = [
  { label: "Low", value: "1" },
  { label: "Medium", value: "2" },
  { label: "High", value: "3" },
];

export default function TaskModal({ modalVisible, setModalVisible }) {
  const [value, setValue] = useState(null);
  return (
    <Modal
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
      transparent={true}
      visible={modalVisible}
    >
      <View className="flex-1 justify-center">
        <View
          style={styles.modalView}
          className="bg-white border border-primary mx-[30px] rounded-xl px-5 py-10"
        >
          <FormField title={"Task Name"} placeholder={"Ex: Math Project"} />
          {/* Numeric input with up and down button on the right */}
          <FormField
            title={"Estimated Pomodoro"}
            placeholder={"0"}
            otherStyles="mt-4"
            keyboardType="numeric"
          />
          {/* Dropdown */}
          <View className="space-y-2 mt-4">
            <Text className="text-base font-ProximaNovaMedium">
              Priority
              <Text className="text-[#FF3528]">*</Text>
            </Text>
            <Dropdown
              containerStyle={styles.container}
              itemTextStyle={styles.itemText}
              itemContainerStyle={styles.itemContainer}
              selectedTextStyle={styles.selectedText}
              className="w-full h-11 px-4 bg-black-100 border border-lightgrey rounded-lg focus:border-yellow"
              data={data}
              placeholderStyle={styles.placeholderStyle}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Low / Medium / High"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>
          <FormField
            title={"Notes"}
            required={false}
            otherStyles="mt-4"
            placeholder={"Add additional notes about the task"}
          />
          <CustomButton
            containerStyles={"mt-6 border-primary border"}
            title={"Create Task"}
            handlePress={() => setModalVisible(!modalVisible)}
          />
          <CustomButton
            containerStyles={"bg-white mt-2 border-primary border"}
            textStyles={"text-primary"}
            title={"Cancel"}
            handlePress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  placeholderStyle: {
    color: "#807E78",
    fontSize: 14,
    fontFamily: "ProximaNovaReg",
  },
  selectedText: {
    fontSize: 14,
    fontFamily: "ProximaNovaReg",
  },
  itemContainer: {
    height: 50,
  },
  itemText: {
    fontSize: 14,
    fontFamily: "ProximaNovaReg",
  },
  container: {
    borderRadius: 8,
  },
});
