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
      className={`flex-row mb-2 rounded-xl border ${rankBorder} overflow-hidden`}
      colors={
        user.full_name == loggedInUser.full_name
          ? ["#C2D9FF", "#DFEBFF", "#FFFFFF"]
          : ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
      }
      locations={[0, 1, 1]}
    >
      {/* Rank */}
      <LinearGradient
        className={`flex-row justify-center items-center`}
        colors={rankGradientColors}
        locations={[0, 1, 1]}
      >
        <Text className="text-md font-bold px-4">{rank}</Text>
        {/* Foto */}
        <View className="h-20 w-20 overflow-hidden my-1 mr-2 rounded-full">
          {user.avatar || user.gender ? (
            <Image
              source={{
                uri: user.avatar
                  ? user.avatar
                  : `https://avatar.iran.liara.run/public/${user.gender}?username=${user.nickname}`,
              }}
              resizeMode="cover"
              className="h-20 w-20"
            />
          ) : (
            <Image
              source={require("../../assets/img/profpic_placeholder.jpg")}
              resizeMode="cover"
              className="h-full w-full"
            />
          )}
        </View>
      </LinearGradient>

      {/* Info */}
      <View className="justify-center ml-4 flex-1">
        <Text className="text-sm font-ProximaNovaBold mb-1">
          {user.full_name}
        </Text>
        <View className="flex-row items-center">
          <Foundation size={12} name="sheriff-badge" color="black" />
          <Text className="ml-2 text-xs font-ProximaNovaMedium">
            {user.badges && user.badges.length}{" "}
            {user.badges != 1 ? "badges" : "badge"}
          </Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome6 size={10} name="bolt" color="black" />
          <Text className="ml-2 text-xs font-ProximaNovaMedium">
            {user.sessions} {user.sessions != 1 ? "sessions" : "session"}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default RankingCard;
