import React from "react";
import CustomButton from "../CustomButton";
import { Text, View, TouchableOpacity } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";

function MenuBox({ title, handlePress }) {
  return (
    <CustomButton
      title={title}
      handlePress={handlePress}
      containerStyles="mt-1 h-[60px] flex-row rounded-md bg-[#FFFFFF] border border-[#D9D9D9] justify-between px-5"
      textStyles={"font-ProximaNovaMedium text-2xs color-[#222222]"}
      rightIcon={
        <View className="justify-center">
          <TouchableOpacity onPress={handlePress}>
            <ChevronRightIcon color="#190482" size={24} />
          </TouchableOpacity>
        </View>
      }
    />
  );
}

export default function Menu({ children }) {
  return (
    <>
      <MenuBox title={"Subscription"} handlePress={null} />
      <MenuBox title={"Preferences"} handlePress={null} />
      <MenuBox title={"Notifications"} handlePress={null} />
      <MenuBox title={"Privacy Settings"} handlePress={null} />
      <MenuBox title={"Help Center"} handlePress={null} />
    </>
  );
}
