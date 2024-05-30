import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function CustomButton({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  leftIcon,
  rightIcon,
}) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary w-full rounded-xl h-[40px] justify-center items-center ${containerStyles} ${
        isLoading && "opacity-50"
      }`}
      disabled={isLoading}
    >
      {leftIcon}
      <Text className={`text-white font-RalewayBold ${textStyles}`}>
        {title}
      </Text>
      {rightIcon}
    </TouchableOpacity>
  );
}
