import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import SpaceInfoModal from "../Space/SpaceInfoModal";
import { useAuth } from "../../context/AuthContext";
import { MaterialIcons } from "react-native-vector-icons";
import SpaceModal from "../Space/SpaceModal";

const SpaceRankCard = ({ rank, space, score }) => {
  const { user: loggedInUser } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <View
      className={`flex-row mb-2 rounded-xl border ${rankBorder} overflow-hidden`}
    >
      {/* Rank */}
      <LinearGradient
        className={`flex-row justify-center items-center`}
        colors={rankGradientColors}
        locations={[0, 1, 1]}
      >
        <Text className="text-md font-bold px-4">{rank}</Text>
        {/* Image */}
        <View className={`${rankBorder} border-r rounded-l-xl`}>
          {space.image ? (
            <Image
              resizeMode="cover"
              source={{ uri: space.image }}
              className="w-20 h-20"
            />
          ) : (
            <Image
              resizeMode="cover"
              source={require("../../assets/icon.png")}
              className="w-20 h-20"
            />
          )}
        </View>
      </LinearGradient>

      {/* Info */}
      <View className="justify-center ml-4 flex-1">
        <Text className="text-sm font-ProximaNovaBold mb-1">{space.name}</Text>

        <View className="flex-row items-center">
          <FontAwesome5 name="user-friends" size={10} color="black" />
          <Text className="ml-1 text-xs font-ProximaNovaMedium">
            {space.members && space.members.length}
          </Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome5 size={11} name="trophy" color="black" />
          <Text className="ml-1 text-xs font-ProximaNovaMedium">{score}</Text>
        </View>
      </View>

      {/* Modal */}
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
    </View>
  );
};

export default SpaceRankCard;
