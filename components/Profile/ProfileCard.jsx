import { View, Image, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import CustomButton from "../CustomButton";
import { Foundation } from "@expo/vector-icons";
import { user } from "../../mocks/user";
import { router } from "expo-router";
import TextProximaNovaReg from "../TextProximaNovaReg";

export default function ProfileCard() {
  return (
    <LinearGradient
      className="rounded-lg border-[#FACC2D] border mb-4"
      colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
      locations={[0, 0, 0, 1]}
      style={"my-5 rounded-md border border-yellow w-full"}
    >
      <View className="flex flex-col border rounded-lg border-[#FACC2D] p-3">
        <View className="flex-row justify-start">
          <View className="border-primary border overflow-hidden mr-4 rounded-full">
            <Image
              source={{ uri: user.image }}
              resizeMode="cover"
              className="h-[50px] w-[50px]"
            />
          </View>
          <View className="flex flex-col">
            <Text className="text-[14px] font-ProximaNovaBold text-primary">
              {user.name}
            </Text>
            <View className="flex flex-row py-1 justify-start">
              <View className="items-center justify-center rounded-md flex-row bg-[#FACC2D] py-1 px-2 mr-2">
                <Foundation size={12} name="sheriff-badge" color="black" />
                <TextProximaNovaReg className="ml-1 text-xs">
                  {user.badges} badges
                </TextProximaNovaReg>
              </View>
              <View className="items-center justify-center rounded-md flex-row bg-[#FACC2D] py-1 px-2 mr-2">
                <FontAwesome6 size={10} name="bolt" color="black" />
                <TextProximaNovaReg className="ml-1 text-xs">
                  {user.sessions} sessions
                </TextProximaNovaReg>
              </View>
            </View>
          </View>
        </View>

        <TextProximaNovaReg className="text-xs font-ProximaNova mt-1">
          {user.description}
        </TextProximaNovaReg>

        <View className="flex-row justify-between mt-1 flex-1">
          <CustomButton
            title={"Edit Profile"}
            handlePress={() => {
              router.push("/edit");
            }}
            containerStyles="mt-1 h-[30px] w-[49%] rounded-md bg-[#FACC2D]"
            textStyles={"font-ProximaNovaMedium text-xs color-[#222222]"}
          />
          <CustomButton
            title={"See Badges"}
            handlePress={() => {
              router.push("/badges");
            }}
            containerStyles="mt-1 h-[30px] w-[49%] rounded-md bg-[#FACC2D]"
            textStyles={"font-ProximaNovaMedium text-xs color-[#222222]"}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
