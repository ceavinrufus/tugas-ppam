import React from "react";
import CustomButton from "../CustomButton";
import { Text, View, TouchableOpacity } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";

function MenuBox({ title, handlePress }) {
  return (
    <CustomButton
      title={title}
      handlePress={handlePress}
      containerStyles="mt-2 h-[60px] flex-row rounded-xl border border-[#D9D9D9] bg-[#FFFFFF] justify-between px-5"
      textStyles={"font-ProximaNovaMedium text-black"}
      rightIcon={
        <View className="justify-center">
          <TouchableOpacity onPress={handlePress}>
            <ChevronRightIcon color="#190482" size={24} />
          </TouchableOpacity>
        </View>
      }
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 1,
      }}
    />
  );
}

export default function Menu({ children }) {
  return (
    <View className="flex-1 pb-2">
      <MenuBox title={"Subscription"} handlePress={null} />
      <MenuBox title={"Preferences"} handlePress={null} />
      <MenuBox title={"Notifications"} handlePress={null} />
      <MenuBox title={"Privacy Settings"} handlePress={null} />
      <MenuBox title={"Help Center"} handlePress={null} />
    </View>
  );
}
