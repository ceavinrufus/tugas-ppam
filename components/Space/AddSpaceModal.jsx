import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import Slider from "@react-native-community/slider";
import { supabase } from "../../lib/supabase";
import { useSchedule } from "../../context/ScheduleContext";

const data = [
  { label: "Low", value: 1 },
  { label: "Medium", value: 2 },
  { label: "High", value: 3 },
];

export default function AddSpaceModal({ modalVisible, setModalVisible }) {
  const [spaceName, setSpaceName] = useState("");
  const [estimatedPomodoro, setEstimatedPomodoro] = useState(1);
  const [priority, setPriority] = useState(null);
  const [description, setDescription] = useState("");
  const { spaces, addSpaces } = useSchedule();

  async function insertOrUpdateSchedule(uid, date) {
    const { error } = await supabase.rpc("insert_schedule", {
      uid,
      d: date,
    });

    if (error) {
      Alert.alert("Error inserting or updating schedule:", error.message);
      return error;
    } else {
      return null;
    }
  }

  const handleCreateSpace = async () => {
    if (!spaceName || !description) {
      Alert.alert("Error", "Space name and description are required.");
      return;
    }

    if (!isError) {
      const { data, error } = await supabase
        .from("spaces")
        .insert([
          {
            name: spaceName,
            description,
          },
        ])
        .select();

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "Space created successfully");
        addSpace(data[0]);

        setModalVisible(false);
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      transparent={true}
      visible={modalVisible}
    >
      <View
        className="flex-1 justify-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={styles.modalView}
          className="bg-white border-2 border-primary mx-[30px] rounded-xl px-5 py-10"
        >
          <FormField
            title={"Space Name"}
            placeholder={"Ex: PT. Valt Akasa Jaya"}
            value={spaceName}
            onChangeText={setSpaceName}
          />

          <FormField
            title={"Space Description"}
            required={false}
            otherStyles="mt-4"
            placeholder={"Add description about the space"}
            value={description}
            onChangeText={setDescription}
          />
          <CustomButton
            containerStyles={"mt-6 border-primary border"}
            title={"Create Space"}
            handlePress={handleCreateSpace}
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
