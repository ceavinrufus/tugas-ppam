import { Text, View, Image } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { user as loggedInUser } from "../../mocks/user";

const RankingCard = ({ rank, user }) => {
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
    <LinearGradient
      className={`flex flex-row mb-2 rounded-xl border ${rankBorder} overflow-hidden`}
      colors={
        user.name == loggedInUser.name
          ? ["#C2D9FF", "#DFEBFF", "#FFFFFF"]
          : ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
      }
      locations={[0, 1, 1]}
    >
      {/* Rank */}
      <LinearGradient
        className={`flex justify-center px-4`}
        colors={rankGradientColors}
        locations={[0, 1, 1]}
      >
        <Text className="text-md font-bold">{rank}</Text>
      </LinearGradient>

      {/* Foto */}
      <View className={`overflow-hidden ${rankBorder} border-x`}>
        <Image
          resizeMode="cover"
          source={{ uri: user.image }}
          className="w-20 h-20"
        />
      </View>

      {/* Info */}
      <View className="justify-center ml-4">
        <Text className="text-sm font-bold mb-1">{user.name}</Text>
        <View className="flex flex-row items-center">
          <Foundation size={12} name="sheriff-badge" color="black" />
          <Text className="ml-1 text-xs">
            {user.badges} {user.badges > 1 ? "badges" : "badge"}
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <FontAwesome6 size={10} name="bolt" color="black" />
          <Text className="ml-1 text-xs">
            {user.sessions} {user.sessions > 1 ? "sessions" : "session"}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default RankingCard;
