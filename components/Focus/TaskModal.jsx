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

export default function TaskModal({
  modalVisible,
  setModalVisible,
  positions,
}) {
  const [taskName, setTaskName] = useState("");
  const [estimatedPomodoro, setEstimatedPomodoro] = useState(1);
  const [priority, setPriority] = useState(null);
  const [notes, setNotes] = useState("");
  const { tasks, addTask } = useSchedule();

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

  const handleCreateTask = async () => {
    if (!taskName || !priority) {
      Alert.alert("Error", "Task name and priority are required.");
      return;
    }

    ({
      data: { user },
    } = await supabase.auth.getUser());

    const date = new Date().toISOString().split("T")[0];
    const isError = await insertOrUpdateSchedule(user.id, date);

    if (!isError) {
      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            name: taskName,
            estimated_pomodoro: estimatedPomodoro,
            priority,
            notes,
            date,
            user_id: user.id,
          },
        ])
        .select();

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "Task created successfully");
        addTask(data[0]); // Ensure you are adding the task correctly

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
            title={"Task Name"}
            placeholder={"Ex: Math Project"}
            value={taskName}
            onChangeText={setTaskName}
          />
          {/* Estimated Pomodoro */}
          <Text className="text-base font-ProximaNovaMedium mt-4">
            Estimated Pomodoro
          </Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={16}
            step={1}
            value={estimatedPomodoro}
            onValueChange={setEstimatedPomodoro}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#d3d3d3"
          />
          <Text>{estimatedPomodoro}</Text>
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
              value={priority}
              onChange={(item) => {
                setPriority(item.value);
              }}
            />
          </View>
          <FormField
            title={"Notes"}
            required={false}
            otherStyles="mt-4"
            placeholder={"Add additional notes about the task"}
            value={notes}
            onChangeText={setNotes}
          />
          <CustomButton
            containerStyles={"mt-6 border-primary border"}
            title={"Create Task"}
            handlePress={handleCreateTask}
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
