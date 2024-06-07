import { View, Text, Modal, StyleSheet, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import TextProximaNovaReg from "../TextProximaNovaReg";
import { supabase } from "../../lib/supabase"; // Import Supabase client
import { Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useSpace } from "../../context/SpaceContext";

export default function SpaceInfoModal({
  space,
  modalVisible,
  setModalVisible,
}) {
  const [isJoined, setIsJoined] = useState(false);
  const { user } = useAuth();
  const { updateSpace } = useSpace();

  const handleJoinSpace = async () => {
    const { data, error } = await supabase
      .from("spaces")
      .update({ members: [...space.members, user.id] })
      .eq("id", space.id)
      .select();

    if (error) {
      Alert.alert(
        "Failed to join the space",
        error.message,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
    } else {
      setModalVisible(false);
      updateSpace(space.id, data[0]);
    }
  };

  const handleLeaveSpace = async () => {
    if (space.created_by === user.id) {
      Alert.alert("Failed to leave the space", "You created this space");
      setModalVisible(false);
      return;
    }

    const { data, error } = await supabase
      .from("spaces")
      .update({
        members: space.members.filter((member) => member !== user.id),
      })
      .eq("id", space.id)
      .select();

    if (error) {
      Alert.alert(
        "Failed to leave the space",
        error.message,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
      setModalVisible(false);
    } else {
      setModalVisible(false);
      updateSpace(space.id, data[0]);
    }
  };

  useEffect(() => {
    if (space.members.includes(user.id)) {
      setIsJoined(true);
    }
  }, [space, user.id]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => setModalVisible(false)}
      >
        <LinearGradient
          colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFFFFF"]}
          locations={[0, 0, 0, 1]}
          style={styles.modalView}
          className="bg-white rounded-xl border-yellow border-2 mx-[30px] px-5 py-4"
        >
          <View className="flex-row">
            {/* Image */}
            <View className={`border-yellow border rounded-xl overflow-hidden`}>
              <Image
                resizeMode="cover"
                source={{ uri: space.image }}
                className="w-20 h-20"
              />
            </View>

            {/* Info */}
            <View className="justify-center ml-4 flex-1">
              <Text className="text-sm font-ProximaNovaBold mb-1 text-primary">
                {space.name}
              </Text>

              <View className="flex-row items-center">
                <FontAwesome5 name="user-friends" size={10} color="black" />
                <Text className="ml-1 text-xs font-ProximaNovaMedium">
                  {space.members && space.members.length}{" "}
                  {space.members && space.members.length > 1
                    ? "members"
                    : "member"}
                </Text>
              </View>
              <View className="flex-row items-center">
                <FontAwesome6 size={10} name="bolt" color="black" />
                <Text className="ml-2 text-xs font-ProximaNovaMedium">
                  {space.sessions}{" "}
                  {space.sessions != 1 ? "sessions" : "session"}
                </Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <TextProximaNovaReg className="text-justify my-2 text-xs">
            {space.description}
          </TextProximaNovaReg>

          <View className="flex-row justify-between items-center">
            <CustomButton
              containerStyles={"bg-white w-[49%] mt-2 border-primary border"}
              textStyles={"text-primary"}
              title={"Cancel"}
              handlePress={() => setModalVisible(!modalVisible)}
            />
            <CustomButton
              containerStyles={`mt-2 w-[49%] border-primary border ${
                isJoined ? "bg-[#CC0000] border-0" : ""
              }`}
              title={isJoined ? "Leave" : "Join"}
              handlePress={isJoined ? handleLeaveSpace : handleJoinSpace}
            />
          </View>
        </LinearGradient>
      </Pressable>
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
});
