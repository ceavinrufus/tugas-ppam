import { View, Image, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

function StatCard({ otherClassName, children }) {
  return (
    <LinearGradient
      colors={["#FACC2D", "#FCE07F", "#FFFFFF"]}
      locations={[0, 1, 1]}
      className={`flex flex-col py-2 rounded-md items-center ${otherClassName}`}
    >
      {children}
    </LinearGradient>
  );
}

export default function ProfileCard({ user }) {
  return (
    <LinearGradient
      className="rounded-lg border-[#FACC2D] border mb-4"
      colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
      locations={[0, 0, 0, 1]}
      style={"my-5 rounded-md border border-yellow w-full"}
    >
      <View className="flex flex-col border rounded-lg border-[#FACC2D] p-3">
        <View className="flex-row justify-start">
          <View>
            <Image
              source={{ uri: user.image }}
              className="w-12 h-12 rounded-full mr-4"
            />
          </View>
          <View className="flex flex-col">
            <Text className="text-md font-bold text-primary">{user.name}</Text>
            <View className="flex flex-row py-1 justify-start">
              <View className="items-center justify-center rounded-md flex-row bg-[#FACC2D] py-1 px-2 mr-2">
                <Foundation size={12} name="sheriff-badge" color="black" />
                <Text className="ml-1 text-xs">{user.badges} badges</Text>
              </View>
              <View className="items-center justify-center rounded-md flex-row bg-[#FACC2D] py-1 px-2 mr-2">
                <FontAwesome6 size={10} name="bolt" color="black" />
                <Text className="ml-1 text-xs">{user.sessions} sessions</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Todo: Blom dibikin dinamis */}
        <View className="flex flex-row justify-between mt-2">
          <StatCard otherClassName={"px-5"}>
            <Text className="text-xs">Daily Rank</Text>
            <Text className="text-sm font-bold">1</Text>
          </StatCard>
          <StatCard otherClassName={"px-4"}>
            <Text className="text-xs">Weekly Rank</Text>
            <Text className="text-sm font-bold">27</Text>
          </StatCard>
          <StatCard otherClassName={"px-3"}>
            <Text className="text-xs">Monthly Rank</Text>
            <Text className="text-sm font-bold">38</Text>
          </StatCard>
        </View>
      </View>
    </LinearGradient>
  );
}
