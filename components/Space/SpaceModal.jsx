import { View, Text, Modal, StyleSheet, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import TextProximaNovaReg from "../TextProximaNovaReg";
import { supabase } from "../../lib/supabase"; // Import Supabase client
import { Alert } from "react-native";

export default function SpaceModal({ space, modalVisible, setModalVisible }) {
  const [isJoined, setIsJoined] = useState(false);
  const [userId, setUserId] = useState("");

  const handleJoinSpace = async () => {
    if (userId) return;

    const { error } = await supabase
      .from("space_members")
      .insert({ space_id: space.id, user_id: userId });

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
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user.id);
    };

    const checkIfJoined = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("space_members")
        .select()
        .eq("space_id", space.id)
        .eq("user_id", userId);

      if (error) {
        console.error("Error checking membership:", error);
      } else {
        setIsJoined(data.length > 0);
      }
    };
    getUserId();
    checkIfJoined();
  }, [space, userId]);

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
                  {space.members} {space.members > 1 ? "members" : "member"}
                </Text>
              </View>
              <View className="flex-row items-center">
                <FontAwesome6 size={10} name="bolt" color="black" />
                <Text className="ml-2 text-xs font-ProximaNovaMedium">
                  {space.sessions} {space.sessions > 1 ? "sessions" : "session"}
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
                isJoined ? "opacity-50" : ""
              }`}
              title={"Join"}
              handlePress={handleJoinSpace}
              disabled={isJoined}
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
