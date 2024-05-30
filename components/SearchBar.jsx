import { TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export default function SearchBar({ searchText, placeholder, onChangeText }) {
  return (
    <View className="w-full h-11 px-4 bg-[#E8E8E8] border border-lightgrey rounded-lg focus:border-yellow flex-row items-center">
      <FontAwesome name="search" size={16} color="black" />
      <TextInput
        className="flex-1 font-ProximaNovaReg ml-2"
        value={searchText}
        selectionColor={"black"}
        placeholder={placeholder}
        placeholderTextColor={"#807E78"}
        onChangeText={onChangeText}
      />
    </View>
  );
}
