import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import menuIcon from "../assets/icons/menu.png"; // Replace with your menu icon

const HamburgerButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 10 }}>
      <Image
        source={menuIcon}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );
};

export default HamburgerButton;
