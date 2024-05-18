import { View, Text } from "react-native";
import React from "react";

const TextProximaNovaReg = ({ children, otherStyles, ...props }) => {
  return (
    <Text {...props} className={`font-ProximaNovaReg ${otherStyles}`}>
      {children}
    </Text>
  );
};

export default TextProximaNovaReg;
