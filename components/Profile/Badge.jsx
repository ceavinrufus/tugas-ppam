import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { badges as b } from "../../mocks/badges";

export default function Badge({ badge, stats }) {
  const criteria = b[badge.badge_id].criteria;

  return (
    <LinearGradient
      className="mt-2 rounded-lg border-secondary border"
      colors={["#C2D9FF", "#DFEBFF", "#FFF"]}
      locations={[0, 1, 1]}
      style={{ flex: 1, padding: 15 }}
    >
      <View className="flex-row gap-3 flex-1">
        <LinearGradient
          className="rounded-lg border-yellow border-2 justify-center items-center px-4"
          colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
          locations={[0, 0, 0, 1]}
          style={{ padding: 10 }}
        >
          <MaterialCommunityIcons name="police-badge" size={40} color="black" />
          <Text className="text-black font-ProximaNovaBold mt-2">
            Level {badge.level}
          </Text>
        </LinearGradient>
        <View className="justify-center items-start flex-1">
          <Text className="text-black font-ProximaNovaBold text-xl">
            {b[badge.badge_id].name}
          </Text>
          <Text className="text-black font-ProximaNova text-xs mt-1">
            {b[badge.badge_id].level[badge.level].description}
          </Text>
          <View className="mt-2 w-full">
            <View className="h-2 flex-1 mb-1 bg-gray-300 rounded-full">
              <View
                style={{
                  width: `${
                    b[badge.badge_id].level[badge.level].maxCriteria != 0
                      ? (stats[criteria] /
                          b[badge.badge_id].level[badge.level].maxCriteria) *
                        100
                      : 0
                  }%`,
                }}
                className="h-full bg-primary rounded-full"
              />
            </View>
            <Text className="text-xs font-ProximaNovaBold text-grey">
              {stats[criteria]}/
              {b[badge.badge_id].level[badge.level].maxCriteria}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
