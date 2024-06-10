import { Text, View, Image, TouchableOpacity, Modal, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import SpaceInfoModal from "./SpaceInfoModal";
import { useAuth } from "../../context/AuthContext";
import { useSpace } from "../../context/SpaceContext";
import { supabase } from "../../lib/supabase";
import { MaterialIcons } from "react-native-vector-icons";
import SpaceModal from "./SpaceModal";

const SpaceRank = ({ rank, space, canEdit = false }) => {
  const { user: loggedInUser } = useAuth();
  const { removeSpace } = useSpace();
  const [modalVisible, setModalVisible] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  let rankBorder = "border-[#C2D9FF]";
  let rankGradientColors = ["#C2D9FF", "#DFEBFF", "#FFFFFF"];
  if (rank == 1) {
    rankBorder = "border-[#FACC2D]";
    rankGradientColors = ["#FACC2D", "#FCE07F", "#FFFFFF"];
  } else if (rank == 2) {
    rankBorder = "border-[#D9D9D9]";
    rankGradientColors = ["#D9D9D9", "#D9D9D9", "#D9D9D9"];
  } else if (rank == 3) {
    rankBorder = "border-[#FBA034]";
    rankGradientColors = ["#FA9C2D", "#FCD388", "#FDECB2"];
  }

  const handleDeleteSpace = async () => {
    const { data, error } = await supabase
      .from("spaces")
      .delete()
      .eq("id", space.id)
      .select();

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Space deleted!");
      removeSpace(data[0].id);
      setMenuOpened(null);
    }
  };

  return (
    <LinearGradient
      className={`flex-row mb-2 rounded-xl border ${rankBorder} overflow-hidden`}
      colors={rankGradientColors}
      locations={[0, 1, 1]}
    >
      {/* Rank */}
      <View className="flex-row justify-center items-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
        <Text className="text-md font-bold px-4">{rank}</Text>
        {/* Image */}
        <View className="h-20 w-20 overflow-hidden my-1 mr-2 rounded-full">
          {space.image ? (
            <Image
              source={{ uri: space.image }}
              resizeMode="cover"
              className="h-20 w-20"
            />
          ) : (
            <Image
              source={require("../../assets/icon.png")}
              resizeMode="cover"
              className="h-20 w-20"
            />
          )}
        </View>
      </View>

      {/* Info */}
      <View className="justify-center ml-4 flex-1">
        <Text className="text-sm font-ProximaNovaBold mb-1">{space.name}</Text>
        <View className="flex-row items-center">
          <FontAwesome6 size={10} name="bolt" color="black" />
          <Text className="ml-2 text-xs font-ProximaNovaMedium">
            {space.sessions} {space.sessions != 1 ? "sessions" : "session"}
          </Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome6 name="user-friends" size={10} color="black" />
          <Text className="ml-2 text-xs font-ProximaNovaMedium">
            {space.members && space.members.length}{" "}
            {space.members && space.members.length != 1 ? "members" : "member"}
          </Text>
        </View>
      </View>

      {/* Modal */}
      {!canEdit ? (
        <>
          <View className="justify-center">
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <ChevronRightIcon color="black" size={24} />
            </TouchableOpacity>
          </View>
          <SpaceInfoModal
            space={space}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </>
      ) : (
        <View className="flex-row items-center mr-[10px]">
          {/* More button */}
          <View className="bg-black mr-1 relative rounded-sm flex items-center justify-center h-[30px] w-[30px]">
            <TouchableOpacity onPress={() => setMenuOpened(true)}>
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Modal transparent={true} visible={menuOpened} animationType="fade">
            <Pressable
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setMenuOpened(false)}
            >
              <View
                style={{
                  width: "80%",
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <TouchableOpacity
                  className="flex-row items-center px-2 py-1"
                  onPress={() => setModalVisible(true)}
                >
                  <View className="p-2 bg-secondary rounded-md">
                    <FontAwesome6 name="edit" size={14} color="black" />
                  </View>
                  <Text className="ml-2">Edit space</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row items-center px-2 py-1"
                  onPress={handleDeleteSpace}
                >
                  <View className="p-2 bg-secondary rounded-md">
                    <FontAwesome6 name="trash-can" size={16} color="black" />
                  </View>
                  <Text className="ml-2">Delete space</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
          <SpaceModal
            space={space}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      )}
    </LinearGradient>
  );
};

export default SpaceRank;
