import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import Slider from "@react-native-community/slider";
import { supabase } from "../../lib/supabase";
import { useSpace } from "../../context/SpaceContext";
import TextProximaNovaReg from "../TextProximaNovaReg";

export default function SpaceModal({ space, modalVisible, setModalVisible }) {
  const [spaceName, setSpaceName] = useState(space ? space.name : "");
  const [sessionGoal, setEstimatedPomodoro] = useState(
    space ? space.sessions : 1
  );
  const [description, setDescription] = useState(
    space ? space.description : ""
  );
  const { addSpace, updateSpace } = useSpace();
  const [errors, setErrors] = useState({
    name: "",
    session_goal: "",
  });

  const isInputNotValid = () => {
    const errorOccured = {
      name: "",
      session_goal: "",
    };

    if (!spaceName) {
      errorOccured.name = spaceName ? "" : "Name is required";
    }

    if (sessionGoal <= 0) {
      errorOccured.session_goal = "Minimum 1";
    }
    setErrors(errorOccured);

    return errorOccured.name || errorOccured.session_goal;
  };

  const handleUpdateSpace = async () => {
    if (isInputNotValid()) return;

    const { data, error } = await supabase
      .from("spaces")
      .update({
        name: spaceName,
        sessions: sessionGoal,
        description,
      })
      .eq("id", space.id)
      .select();

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Space updated!");
      updateSpace(space.id, data[0]);

      setModalVisible(false);
    }
  };

  const handleCreateSpace = async () => {
    if (isInputNotValid()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("spaces")
      .insert([
        {
          name: spaceName,
          sessions: sessionGoal,
          description,
          members: [user.id],
          created_by: user.id,
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
            placeholder={"Ex: Math Project"}
            value={spaceName}
            onChangeText={setSpaceName}
          />
          {errors.name ? (
            <TextProximaNovaReg className="text-red-500">
              {errors.name}
            </TextProximaNovaReg>
          ) : null}
          {/* Estimated Pomodoro */}
          <Text className="text-base font-ProximaNovaMedium mt-4">
            Session Goal
          </Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={16}
            step={1}
            value={sessionGoal}
            onValueChange={setEstimatedPomodoro}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#d3d3d3"
          />
          <Text className="self-center">
            {sessionGoal} pomodoro session/day
          </Text>
          {errors.session_goal ? (
            <TextProximaNovaReg className="text-red-500">
              {errors.session_goal}
            </TextProximaNovaReg>
          ) : null}

          <FormField
            title={"Description"}
            required={false}
            otherStyles="mt-4"
            placeholder={"Add description about the space"}
            value={description}
            onChangeText={setDescription}
          />
          <CustomButton
            containerStyles={"mt-6 border-primary border"}
            title={space ? "Save Changes" : "Create Space"}
            handlePress={space ? handleUpdateSpace : handleCreateSpace}
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
